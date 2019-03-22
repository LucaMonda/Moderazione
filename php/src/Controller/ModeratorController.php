<?php

namespace App\Controller;

use App\Repository\ModeratorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ModeratorController extends Controller
{
    /**
     * @Route("/sentence", name="post-moderator", methods={"POST"})
     * @param Request $request
     * @param ModeratorRepository $moderatorRepository
     * @return JsonResponse
     */
    public function setSentence(Request $request, ModeratorRepository $moderatorRepository)
    {
        $parametersAsArray = json_decode($request->getContent(), true);
        $id = $parametersAsArray['id'];
        $moderator = $parametersAsArray['moderator'];
        $categories = $parametersAsArray['categories'];

        $moderatorRepository->saveInfo($id,$moderator,$categories);

        return new JsonResponse([
            'result' => 'OK'
        ]);
    }


    /**
     * @Route("/sentence", name="get-moderator", methods={"GET"})
     * @param ModeratorRepository $moderatorRepository
     * @return JsonResponse
     */
    public function getSentence(ModeratorRepository $moderatorRepository){

        $foundSentence = $moderatorRepository->getNextSentence();
        return new JsonResponse($foundSentence);

    }


}
