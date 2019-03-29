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
        for($i = 1;$i<6; $i++){
            if($i===1){
                $moderator = $this->createModerator($i);
            }
            $sentence = $this->createSentences($i);
            $manager->persist($sentence);
            $manager->persist($moderator);
        }
        $manager->flush();
    }

    private function createSentences($i): Sentence
    {
        $content = 'Se parli così è perchè non capisci un cazzo come tutti quelli che fanno lavoro ' . $i . ' !';
        $author = 'author ' .$i;
        $indicators = [$i];
        return new Sentence($content,$author,$indicators);
    }

    private function createModerator($i): Moderator
    {
        $email = 'moderator'.$i. '@gmail.com';
        return new Moderator($email);
    }
}
