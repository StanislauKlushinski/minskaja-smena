<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
class TokenController extends AbstractController
{

    /**
     * @return JsonResponse
     */
    #[Route("/api/v1/check_token", name: "check_token_app", methods: "GET")]
    public function checkToken(): JsonResponse {
        /** @var User $user */
        $user = $this->getUser();

        return new JsonResponse([
            'user' => $user->getId(),
            'name' => $user->getEmail(),
            'message' => 'token valid',
            'success' => true,
        ]);
    }

}
