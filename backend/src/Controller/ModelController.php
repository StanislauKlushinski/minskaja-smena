<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ModelService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ModelController extends AbstractController
{

    #[Route('/api/v1/add-model', name: 'app_add_model', methods: ['POST'])]
    #[IsGranted("ROLE_ROOT")]
    public function addModel(
        Request $request,
        ModelService $modelService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $modelService->checkAddModelPostData($data);

        $model = $modelService->addModel($data);

        return new JsonResponse($modelService->toJsonShort($model));
    }

    #[Route('/api/v1/add-elements', name: 'app_elements_model', methods: ['POST'])]
    #[IsGranted("ROLE_ROOT")]
    public function addElements(
        Request $request,
        ModelService $modelService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $modelService->checkAddElementsPostData($data);

        $modelService->addElements($data);

        return new JsonResponse(["success" => true]);
    }

    #[Route('/api/v1/get-model', name: 'app_get_model', methods: ['POST'])]
    public function getModel(
        Request $request,
        ModelService $modelService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $modelService->checkGetModelPostData($data);

        return new JsonResponse($modelService->getModelJsonFull($data['slug']));
    }

}
