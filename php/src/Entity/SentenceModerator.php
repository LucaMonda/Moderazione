<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SentenceModeratorRepository")
 */
class SentenceModerator
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Sentence", inversedBy="sentenceModerators")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sentence;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Moderator", inversedBy="sentenceModerators")
     * @ORM\JoinColumn(nullable=false, referencedColumnName="email", name="moderator_email")
     */
    private $moderator;

    /**
     * @ORM\Column(type="array")
     */
    private $votes = [];

    public function __construct($sentence,$votes,$moderator)
    {
        $this->setSentence($sentence);
        $this->setVotes($votes);
        $this->setModerator($moderator);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSentence(): ?Sentence
    {
        return $this->sentence;
    }

    public function setSentence(?Sentence $sentence): self
    {
        $this->sentence = $sentence;

        return $this;
    }

    public function getModerator(): ?Moderator
    {
        return $this->moderator;
    }

    public function setModerator(?Moderator $moderator): self
    {
        $this->moderator = $moderator;

        return $this;
    }

    public function getVotes(): ?array
    {
        return $this->votes;
    }

    public function setVotes(array $votes): self
    {
        $this->votes = $votes;

        return $this;
    }
}
