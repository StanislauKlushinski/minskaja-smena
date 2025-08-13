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

#[AsCommand(
    name: 'app:del-user',
    description: /** @lang text */
    'Delete user from database',
)]
class DelUserCommand extends Command
{

    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(
        EntityManagerInterface $em
    ) {
        parent::__construct();
        $this->em = $em;
    }

    protected function configure(): void
    {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'Username');
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $username = $input->getArgument('username');

        $user = $this->em->getRepository(User::class)
            ->findOneBy(['email' => $username]);
        if (!$user) {
            $io->error('User not found');

            return Command::FAILURE;
        }

        $this->em->remove($user);

        $this->em->flush();

        $io->success('User deleted successfully');

        return Command::SUCCESS;
    }

}
