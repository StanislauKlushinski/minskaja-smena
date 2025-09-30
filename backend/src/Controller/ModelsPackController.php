<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ModelsPackService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ModelsPackController extends AbstractController
{

    #[Route('/api/v1/add-models-pack', name: 'app_add_models_pack', methods: ['POST'])]
    #[IsGranted("ROLE_ROOT")]
    public function addModelsPack(
        Request $request,
        ModelsPackService $modelsPackService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $modelsPackService->checkAddModelsPackData($data);
        $modelsPack = $modelsPackService->addModelsPack($data);

        return new JsonResponse([
            'id' => $modelsPack->getId(),
            'name' => $modelsPack->getName(),
            'models' => [],
        ]);
    }

    #[Route('/api/v1/get-models-packs-short', name: 'app_get_models_packs_short', methods: ['GET'])]
    public function getModelsPacksShort(
        ModelsPackService $modelsPackService
    ): JsonResponse {
        return new JsonResponse($modelsPackService->getAllModelsPacksJsonShort());
    }

    #[Route('/api/v1/del-models-pack', name: 'app_del_models_pack', methods: [
        'POST',
    ])]
    #[IsGranted("ROLE_ROOT")]
    public function delModelsPack(
        Request $request,
        ModelsPackService $modelsPackService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $modelsPackService->checkDelModelPostData($data);

        $modelsPack = $modelsPackService->getModelsPackById($data["id"]);
        $modelsPackService->delModelsPack($modelsPack);

        return new JsonResponse([
            'success' => true,
        ]);
    }

}
