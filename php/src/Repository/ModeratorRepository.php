<?php

namespace App\Repository;

class ModeratorRepository
{

    public function saveInfo($id, $moderator, $categories){
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

    public function getNextSentence(){
        /*array_map
        array_filter
        array_reduce
        array_walk*/

        $email = 'stringa-fissa@da-cambiare.it';
        $fileJson = json_decode(file_get_contents('../public/sentences.json'),true);
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