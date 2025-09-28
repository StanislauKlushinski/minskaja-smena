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
    ) {}

    public function checkAddModelsPackData(array $data): void
    {
        if (!isset($data['name'])) {
            throw new BadRequestHttpException('missing field: name');
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

}
