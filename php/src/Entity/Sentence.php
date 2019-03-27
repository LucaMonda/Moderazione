<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SentenceRepository")
 */
class Sentence
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $content;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $author;

    /**
     * @ORM\Column(type="array")
     */
    private $indicators = [];

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Moderator", inversedBy="votes")
     */
    private $votes;

    public function __construct()
    {
        $this->votes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getIndicators(): ?array
    {
        return $this->indicators;
    }

    public function setIndicators(array $indicators): self
    {
        $this->indicators = $indicators;

        return $this;
    }

    /**
     * @return Collection|Moderator[]
     */
    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function addVote(Moderator $vote): self
    {
        if (!$this->votes->contains($vote)) {
            $this->votes[] = $vote;
        }

        return $this;
    }

    public function removeVote(Moderator $vote): self
    {
        if ($this->votes->contains($vote)) {
            $this->votes->removeElement($vote);
        }

        return $this;
    }
}
