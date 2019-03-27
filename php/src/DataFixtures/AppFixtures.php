<?php

namespace App\DataFixtures;

use App\Entity\Moderator;
use App\Entity\Sentence;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for($i = 0;$i<5; $i++){
            if($i===0){
                $moderator = $this->createModerator($i);
            }
            $sentence = $this->createSentences($i);
            $manager->persist($sentence);
            $manager->persist($moderator);
        }
        $manager->flush();
    }

    private function createSentences($i){
        $sentence = new Sentence();
        $sentence->setContent('Se parli così è perchè non capisci un cazzo come tutti quelli che fanno lavoro ' . $i . ' !');
        $sentence->setAuthor('author ' .$i);
        $sentence->setIndicators([$i]);
        return $sentence;
    }

    private function createModerator($i){
        $moderator = new Moderator();
        $moderator->setEmail('moderator'.$i. '@gmail.com');
        return $moderator;
    }
}
