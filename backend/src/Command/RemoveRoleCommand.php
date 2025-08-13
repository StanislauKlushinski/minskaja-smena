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
    name: 'app:remove-role',
    description: /** @lang text */
    'Remove role from user from database',
)]
class RemoveRoleCommand extends Command
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
            ->addArgument('username', InputArgument::REQUIRED, 'Username')
            ->addArgument('role', InputArgument::REQUIRED, 'Role');
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $io = new SymfonyStyle($input, $output);
        $role = $input->getArgument('role');
        $username = $input->getArgument('username');

        $user = $this->em->getRepository(User::class)
            ->findOneBy(['email' => $username]);
        if (!$user) {
            $io->error('User not found');

            return Command::FAILURE;
        }

        $user->removeRole($role);

        $this->em->persist($user);

        $this->em->flush();

        $io->success('Role added successfully');

        return Command::SUCCESS;
    }

}
