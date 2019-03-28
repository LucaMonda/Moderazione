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
     * @ORM\OneToMany(targetEntity="App\Entity\SentenceModerator", mappedBy="moderator")
     */
    private $sentenceModerators;

    public function __construct($email)
    {
        $this->setEmail($email);
        $this->sentenceModerators = new ArrayCollection();
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
     * @return Collection|SentenceModerator[]
     */
    public function getSentenceModerators(): Collection
    {
        return $this->sentenceModerators;
    }

    public function addSentenceModerator(SentenceModerator $sentenceModerator): self
    {
        if (!$this->sentenceModerators->contains($sentenceModerator)) {
            $this->sentenceModerators[] = $sentenceModerator;
            $sentenceModerator->setModerator($this);
        }

        return $this;
    }

    public function removeSentenceModerator(SentenceModerator $sentenceModerator): self
    {
        if ($this->sentenceModerators->contains($sentenceModerator)) {
            $this->sentenceModerators->removeElement($sentenceModerator);
            // set the owning side to null (unless already changed)
            if ($sentenceModerator->getModerator() === $this) {
                $sentenceModerator->setModerator(null);
            }
        }

        return $this;
    }
}
