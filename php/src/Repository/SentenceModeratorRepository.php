<?php

namespace App\Repository;

use App\Entity\SentenceModerator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SentenceModerator|null find($id, $lockMode = null, $lockVersion = null)
 * @method SentenceModerator|null findOneBy(array $criteria, array $orderBy = null)
 * @method SentenceModerator[]    findAll()
 * @method SentenceModerator[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SentenceModeratorRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SentenceModerator::class);
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
