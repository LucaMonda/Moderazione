<?php

namespace App\Repository;

class SentenceRepository
{

    private $path;

    public function __construct($path)
    {
        $this->path = $path;
    }

    public function saveInfo($id, $moderator, $categories){
        $obj = (object) array('moderator' => $moderator, 'categories' => $categories);
        //TODO Problem UTF in file_get_contents.
        $fileJson = json_decode(file_get_contents($this->path),true);
        for ($i=0, $iMax = count($fileJson['sentences']); $i< $iMax; $i++) {
            if ($fileJson['sentences'][$i]['id'] == $id ) {
                $fileJson['sentences'][$i]['votes'][] = $obj;
            }
        }
        $newJsonString = json_encode($fileJson, JSON_PRETTY_PRINT);
        file_put_contents($this->path, $newJsonString);
        return $newJsonString;
    }

    public function getNextSentence(){
        $email = 'stringa-fissa@da-cambiare.it';
        $fileJson = json_decode(file_get_contents($this->path),true);
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