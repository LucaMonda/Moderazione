<?php

namespace App\Controller;

use App\Entity\Moderator;
use App\Entity\Sentence;
use App\Entity\SentenceModerator;
use App\Repository\SentenceModeratorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NoResultException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ModeratorController extends Controller
{
    public function __construct()
    {
    }

    /**
     * @Route("/sentence", name="post-moderator", methods={"POST"})
     * @param EntityManagerInterface $em
     * @param Request $request
     * @return JsonResponse
     */
    public function setSentence(EntityManagerInterface $em,Request $request): JsonResponse
    {
        $parametersAsArray = json_decode($request->getContent(), true);
        $idSentence = $parametersAsArray['id'];
        $emailModerator = $parametersAsArray['moderator'];
        $votes = $parametersAsArray['categories'];

        $repositoryModerator = $em->getRepository(Moderator::class);
        $moderator = $repositoryModerator->findOneBy(['email'=> $emailModerator]);

        $repositoryModerator = $em->getRepository(Sentence::class);
        $sentence = $repositoryModerator->findOneBy(['id'=> $idSentence]);

        $repository = $em->getRepository(SentenceModerator::class);
        $repository->insertVote($sentence, $votes, $moderator);

        return new JsonResponse([
            'result' => 'OK'
        ]);
    }


    /**
     * @Route("/sentence", name="get-moderator", methods={"GET"})
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    public function getSentence(EntityManagerInterface $em): JsonResponse
    {
        $emailModerator = 'moderator0@gmail.com';

        $repositoryModerator = $em->getRepository(Moderator::class);
        $moderator = $repositoryModerator->findOneBy(['email'=> $emailModerator ]);

        $repository = $em->getRepository(SentenceModerator::class);
        try {
            $sentence = $repository->findNextSentence($moderator->getId());
        }catch(NoResultException $e){
            return new JsonResponse([]);
        }

        return new JsonResponse([
            'id' => $sentence->getId(),
            'author' => $sentence->getAuthor(),
            'content' => $sentence->getContent(),
            'indicators' => $sentence->getIndicators()
        ]);
    }


}
