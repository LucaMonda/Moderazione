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
     * @ORM\OneToMany(targetEntity="App\Entity\SentenceModerator", mappedBy="sentence")
     */
    private $sentenceModerators;

    public function __construct($content,$author, $indicators)
    {
        $this->setContent($content);
        $this->setAuthor($author);
        $this->setIndicators($indicators);
        $this->sentenceModerators = new ArrayCollection();
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
            $sentenceModerator->setSentence($this);
        }

        return $this;
    }

    public function removeSentenceModerator(SentenceModerator $sentenceModerator): self
    {
        if ($this->sentenceModerators->contains($sentenceModerator)) {
            $this->sentenceModerators->removeElement($sentenceModerator);
            // set the owning side to null (unless already changed)
            if ($sentenceModerator->getSentence() === $this) {
                $sentenceModerator->setSentence(null);
            }
        }

        return $this;
    }
}
