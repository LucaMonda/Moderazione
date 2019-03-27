<?php

namespace App\Repository;

class ModerationRepository
{

    private $path;
    private $foundSentence = [];

    public function __construct($path)
    {
        $this->path = $path;
    }

    public function saveInfo($id, $moderator, $categories){
        $data = (object) array('moderator' => $moderator, 'categories' => $categories);
        $file = json_decode(file_get_contents($this->path),true);
        $file = $this->overwriteFile($file, $id, $data);
        $newFile = $this->encodeAndSaveFile($file);
        return $newFile;
    }

    public function getNextSentence(){
        $email = 'stringa-fissa@da-cambiare.it';
        $fileJson = json_decode(file_get_contents($this->path),true);
        $this->findNextSentence($fileJson, $email);
        return $this->foundSentence;
    }

    private function findNextSentence($file, $email){
        foreach($file['sentences'] as $sentence){
            $finded = false;
            foreach($sentence['votes'] as $moderatorVote){
                if($moderatorVote['moderator']===$email){
                    $finded = true;
                    break;
                }
            }
            if(!$finded){
                $this->foundSentence = $sentence;
                break;
            }
        }
    }

    private function overwriteFile($file, $id, $data){
        for ($i=0, $iMax = count($file['sentences']); $i< $iMax; $i++) {
            if ($file['sentences'][$i]['id'] == $id ) {
                $file['sentences'][$i]['votes'][] = $data;
            }
        }
        return $file;
    }

    private function encodeAndSaveFile($file){
        $newfile = json_encode($file, JSON_PRETTY_PRINT);
        file_put_contents($this->path, $newfile);
        return $newfile;
    }
}