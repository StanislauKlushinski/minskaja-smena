<?php

namespace App\Service;

use App\Entity\Model;
use App\Entity\ModelsPack;
use App\Repository\ModelsPackRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

readonly class ModelsPackService
{

    public function __construct(
        private EntityManagerInterface $em,
        private ModelService $modelService,
        private ModelsPackRepository $packRepository,
        private ModelsPackRepository $modelsPackRepository,
    ) {}

    public function checkAddModelsPackData(array $data): void
    {
        if (!isset($data['name'])) {
            throw new BadRequestHttpException('missing field: name');
        }
    }

    public function checkDelModelPostData(array $data): void
    {
        if (!isset($data['id'])) {
            throw new BadRequestHttpException('missing field: id');
        }
        if (!is_int($data['id'])) {
            throw new BadRequestHttpException('id must be int');
        }
    }

    public function addModelsPack(array $data): ModelsPack
    {
        $modelsPack = new ModelsPack();

        $modelsPack->setName($data['name']);
        $this->em->persist($modelsPack);
        $this->em->flush();

        return $modelsPack;
    }

    public function getAllModelsPacksJsonShort(): array
    {
        $modelsPacks = $this->packRepository->findAll();
        $result = [];

        foreach ($modelsPacks as $modelsPack) {
            $result[] = $this->toJsonShort($modelsPack);
        }

        return $result;
    }

    public function toJsonShort(ModelsPack $modelsPack): array
    {
        return [
            'id' => $modelsPack->getId(),
            'name' => $modelsPack->getName(),
            'models' => $modelsPack->getModels()->map(function (Model $model) {
                return $this->modelService->toJsonShort($model);
            })->toArray(),
        ];
    }

    public function getModelsPackById(int $id): ModelsPack
    {
        $modelsPack = $this->modelsPackRepository->find($id);

        if (!$modelsPack) {
            throw new BadRequestHttpException('modelsPack not found');
        }

        return $modelsPack;
    }

    public function delModelsPack(modelsPack $modelsPack): void
    {
        foreach ($modelsPack->getModels() as $model) {
            $this->modelService->delModel($model);
        }

        $this->em->remove($modelsPack);
        $this->em->flush();
    }

}
