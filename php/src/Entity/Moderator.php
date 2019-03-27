<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModeratorRepository")
 */
class Moderator
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Sentence", mappedBy="votes")
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Sentence[]
     */
    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function addVote(Sentence $vote): self
    {
        if (!$this->votes->contains($vote)) {
            $this->votes[] = $vote;
            $vote->addVote($this);
        }

        return $this;
    }

    public function removeVote(Sentence $vote): self
    {
        if ($this->votes->contains($vote)) {
            $this->votes->removeElement($vote);
            $vote->removeVote($this);
        }

        return $this;
    }
}
