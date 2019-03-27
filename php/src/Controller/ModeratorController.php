<?php

namespace App\Controller;

use App\Repository\ModerationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ModeratorController extends Controller
{
    private $sentenceRepository;

    public function __construct(ModerationRepository $sentenceRepository)
    {
       $this->sentenceRepository = $sentenceRepository;
    }

    /**
     * @Route("/sentence", name="post-moderator", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function setSentence(Request $request)
    {
        $parametersAsArray = json_decode($request->getContent(), true);
        $id = $parametersAsArray['id'];
        $moderator = $parametersAsArray['moderator'];
        $categories = $parametersAsArray['categories'];

        $this->sentenceRepository->saveInfo($id,$moderator,$categories);

        return new JsonResponse([
            'result' => 'OK'
        ]);
    }


    /**
     * @Route("/sentence", name="get-moderator", methods={"GET"})
     * @return JsonResponse
     */
    public function getSentence(){

        $foundSentence = $this->sentenceRepository->getNextSentence();
        return new JsonResponse($foundSentence);

    }


}
