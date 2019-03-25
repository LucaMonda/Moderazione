<?php

namespace App\php\tests\Repository;

use App\Repository\SentenceRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Filesystem\Filesystem;

class SentenceRepositoryTest extends KernelTestCase
{
    private $sentenceRepository;
    private $fileSystem;
    private $num;

    public function setUp()
    {
        $this->fileSystem = new FileSystem();
        $this->num = mt_rand(1,1000);
        $this->fileSystem->copy('tests/Repository/sentencesTest.json','tests/Repository/sentencesTest'.$this->num.'.json');
        $this->sentenceRepository = new SentenceRepository('tests/Repository/sentencesTest'.$this->num.'.json');
    }

    public function testSaveInfo()
    {
        $email = 'io@email.it';

        $fileJson = json_decode($this->sentenceRepository->saveInfo('1', $email ,[0,1]),true);

        $this->assertEquals($fileJson['sentences'][0]['votes'][0]['moderator'], $email);
        $this->fileSystem->remove('tests/Repository/sentencesTest'.$this->num.'.json');
    }

    public function testGetNextSentence()
    {
        $sentence = $this->sentenceRepository->getNextSentence();

        $this->assertEquals($sentence['content'], 'Se parli così è perchè non capisci un cazzo come tutti i ginecologi!');
        $this->assertEquals($sentence['id'],1);
        $this->assertEquals($sentence['author'],'rado');
        $this->assertEquals(count($sentence['votes']),0);
        $this->assertEquals($sentence['indicators'],[0,1]);
        $this->fileSystem->remove('tests/Repository/sentencesTest'.$this->num.'.json');
    }
}