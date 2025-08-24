<?php

namespace App\Service;

use App\Entity\Model;
use App\Entity\ModelElement;
use App\Repository\ModelRepository;
use App\Repository\ModelsPackRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

readonly class ModelService
{

    public function __construct(
        private EntityManagerInterface $em,
        private ModelsPackRepository $packRepository,
        private ModelRepository $modelRepository,
    ) {}

    public function checkAddModelPostData(array $data): void
    {
        if (!isset($data['name'])) {
            throw new BadRequestHttpException('missing field: name');
        }
        if (!isset($data['elements'])) {
            throw new BadRequestHttpException('missing field: data');
        }
        if (!isset($data['modelsPackId'])) {
            throw new BadRequestHttpException('missing field: modelsPackId');
        }

        if (!is_string($data['name'])) {
            throw new BadRequestHttpException('field must be string: name');
        }
        if (!is_numeric($data['modelsPackId'])) {
            throw new BadRequestHttpException('field must be int: modelsPackId');
        }
    }

    public function addModel(array $data): Model
    {
        $model = new Model();

        $modelsPack = $this->packRepository->find($data['modelsPackId']);

        if (!$modelsPack) {
            throw new BadRequestHttpException('modelsPack not found');
        }

        $model
            ->setName($data['name'])
            ->setModelsPack($modelsPack)
            ->setDescription($data['description']);

        foreach ($data['elements'] as $element) {
            if ($element['type'] === 'UNKNOWN') {
                continue;
            }
            $modelElement = new ModelElement();
            $modelElement
                ->setModel($model)
                ->setData($element['data'])
                ->setType($element['type']);
            $this->em->persist($modelElement);
        }
        $this->em->persist($model);
        $this->em->persist($modelsPack);
        $this->em->flush();

        return $model;
    }

    /**
     * @param Model $model
     *
     * @return array
     */
    public function toJsonShort(Model $model): array
    {
        return [
            'id' => $model->getId(),
            'modelsPackId' => $model->getModelsPack()->getId(),
            'name' => $model->getName(),
            'createdAt' => $model->getCreatedAt(),
            'updatedAt' => $model->getUpdatedAt(),
            'description' => $model->getDescription(),
        ];
    }

    /**
     * @param Model $model
     *
     * @return array
     */
    public function toJsonFull(Model $model): array
    {
        return [
            'id' => $model->getId(),
            'modelsPackId' => $model->getModelsPack()->getId(),
            'name' => $model->getName(),
            'createdAt' => $model->getCreatedAt(),
            'updatedAt' => $model->getUpdatedAt(),
            'description' => $model->getDescription(),
            'elements' => $model->getModelElements()->map(function (
                ModelElement $element
            ) {
                return [
                    'data' => $element->getData(),
                    'type' => $element->getType(),
                ];
            })->toArray(),
        ];
    }

    public function checkGetModelPostData(array $data): void
    {
        if (!isset($data['id'])) {
            throw new BadRequestHttpException('missing field: id');
        }
    }

    public function getModelJsonFull(int $id): array
    {
        $model = $this->modelRepository->find($id);
        if (!$model) {
            throw new BadRequestHttpException('model not found');
        }

        return $this->toJsonFull($model);
    }

}
