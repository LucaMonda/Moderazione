<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ModeratorController extends Controller
{
    /**
     * @Route("/sentence", name="moderator", methods={"POST"})
     */
    public function index()
    {
        return new JsonResponse([
           'result' => 'OK'
        ]);
    }
}
