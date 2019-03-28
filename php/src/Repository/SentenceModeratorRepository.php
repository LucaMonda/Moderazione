<?php

namespace App\Repository;

use App\Entity\SentenceModerator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SentenceModerator|null find($id, $lockMode = null, $lockVersion = null)
 * @method SentenceModerator|null findOneBy(array $criteria, array $orderBy = null)
 * @method SentenceModerator[]    findAll()
 * @method SentenceModerator[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SentenceModeratorRepository extends ServiceEntityRepository
{
    private $manager;

    public function __construct(RegistryInterface $registry,ObjectManager $manager)
    {
        parent::__construct($registry, SentenceModerator::class);
        $this->manager=$manager;
    }

    public function findNextSentence($id)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT s
                 FROM App\Entity\Sentence s
                 WHERE NOT EXISTS (
                 SELECT IDENTITY(sm.sentence)
                 FROM App\Entity\SentenceModerator sm
                 WHERE IDENTITY(sm.moderator)=:id
                 AND s.id = IDENTITY(sm.sentence))')->setParameter('id',$id) ->setMaxResults(1);
        return $query->getSingleResult();
    }

    public function insertVote($sentence, $votes, $moderator): SentenceModerator
    {
        $sentenceModerator = new SentenceModerator($sentence, $votes, $moderator);
        $this->manager->persist($sentenceModerator);
        $this->manager->flush();
        return $sentenceModerator;
    }

    // /**
    //  * @return SentenceModerator[] Returns an array of SentenceModerator objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SentenceModerator
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
