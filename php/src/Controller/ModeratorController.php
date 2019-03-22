<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ModeratorController extends Controller
{
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

        $this->saveInfo($id,$moderator,$categories);

        return new JsonResponse([
            'result' => 'OK'
        ]);
    }

    private function saveInfo($id,$moderator,$categories){
        $obj = (object) array('moderator' => $moderator, 'categories' => $categories);
        $fileJson = json_decode(file_get_contents('../public/sentences.json'),true);
        for ($i=0, $iMax = count($fileJson['sentences']); $i< $iMax; $i++) {
            if ($fileJson['sentences'][$i]['id'] == $id ) {
                $fileJson['sentences'][$i]['votes'][] = $obj;
            }
        }
        $newJsonString = json_encode($fileJson, JSON_PRETTY_PRINT);
        file_put_contents('../public/sentences.json', $newJsonString);
        return $fileJson;
    }

    /**
     * @Route("/sentence", name="get-moderator", methods={"GET"})
     * @return JsonResponse
     */
    public function getSentence(){
        $email = 'stringa-fissa@da-cambiare.it';
        $fileJson = json_decode(file_get_contents('../public/sentences.json'),true);

        /*array_map
        array_filter
        array_reduce
        array_walk*/

        $foundSentence = $this->getNextSentence($fileJson,$email);
        return new JsonResponse($foundSentence);

    }

    private function getNextSentence($fileJson,$email){
        $foundSentence = [];
        foreach($fileJson['sentences'] as $sentence){
            $finded = false;
            foreach($sentence['votes'] as $moderatorVote){
                if($moderatorVote['moderator']===$email){
                    $finded = true;
                    break;
                }
            }
            if(!$finded){
                $foundSentence = $sentence;
                break;
            }
        }
        return $foundSentence;
    }


}
