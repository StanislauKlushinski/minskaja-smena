<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:add-user',
    description: 'Add root user to database',
)]
class AddUserCommand extends Command
{

    /**
     * @var UserPasswordHasherInterface
     */
    private UserPasswordHasherInterface $passwordEncoder;

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;

    /**
     * @param UserPasswordHasherInterface $passwordEncoder
     * @param EntityManagerInterface      $em
     */
    public function __construct(
        UserPasswordHasherInterface $passwordEncoder,
        EntityManagerInterface $em
    ) {
        parent::__construct();
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'Username')
            ->addArgument('password', InputArgument::REQUIRED, 'Password');
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $username = $input->getArgument('username');
        $password = $input->getArgument('password');

        if ($this->em->getRepository(User::class)
            ->findOneBy(['email' => $username])
        ) {
            $io->error('Username already exists');

            return Command::FAILURE;
        }

        $user = new User();

        $user
            ->setPassword($this->passwordEncoder->hashPassword($user,
                $password))
            ->setEmail($username);

        $this->em->persist($user);

        $this->em->flush();

        $io->success('User created');

        return Command::SUCCESS;
    }

}
