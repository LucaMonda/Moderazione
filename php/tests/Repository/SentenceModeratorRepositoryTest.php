<?php

namespace App\php\tests\Repository;

use App\Entity\Moderator;
use App\Entity\Sentence;
use App\Entity\SentenceModerator;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class SentenceModeratorRepositoryTest extends KernelTestCase
{
    private $entityManager;
    private $emailModerator = 'moderator0@gmail.com';
    private $moderatorRepository;
    private $sentenceRepository;
    private $sentenceModeratorRepository;

    public function setUp()
    {
        shell_exec('php bin/console doctrine:fixtures:load');
        $kernel = self::bootKernel();
        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        $this->moderatorRepository = $this->entityManager->getRepository(Moderator::class);
        $this->sentenceRepository = $this->entityManager->getRepository(Sentence::class);
        $this->sentenceModeratorRepository = $this->entityManager->getRepository(SentenceModerator::class);
    }

    public function testFindNextSentence(): void
    {
        $moderator = $this->moderatorRepository->findOneBy(['email' => $this->emailModerator]);
        $sentence = $this->sentenceModeratorRepository->findNextSentence($moderator->getId());

        $this->assertEquals('author 0', $sentence->getAuthor());
        $this->assertEquals([0], $sentence->getIndicators());
        $this->assertEquals('Se parli così è perchè non capisci un cazzo come tutti quelli che fanno lavoro 0 !', $sentence->getContent());
    }

    public function testInsertVote()
    {
        $author = 'author 0';
        $votes = [0,1];

        $sentence = $this->sentenceRepository->findOneBy(['author' => $author]);
        $moderator = $this->moderatorRepository->findOneBy(['email' => $this->emailModerator]);
        $this->sentenceModeratorRepository->insertVote($sentence,$votes,$moderator);
        $sentenceModerator = $this->sentenceModeratorRepository->findAll();

        $this->assertEquals([0,1], $sentenceModerator[0]->getVotes());
        $this->assertEquals($moderator->getId(), $sentenceModerator[0]->getModerator()->getId());
        $this->assertEquals($sentence->getId(), $sentenceModerator[0]->getSentence()->getId());
        shell_exec('php bin/console doctrine:fixtures:load');
    }
}