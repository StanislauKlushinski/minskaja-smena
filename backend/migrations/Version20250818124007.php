<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250818124007 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE model (id SERIAL NOT NULL, models_pack_id INT NOT NULL, name VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D79572D9C34E733E ON model (models_pack_id)');
        $this->addSql('CREATE TABLE model_element (id SERIAL NOT NULL, model_id INT NOT NULL, data JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_21D337C87975B7E7 ON model_element (model_id)');
        $this->addSql('CREATE TABLE models_pack (id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE model ADD CONSTRAINT FK_D79572D9C34E733E FOREIGN KEY (models_pack_id) REFERENCES models_pack (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE model_element ADD CONSTRAINT FK_21D337C87975B7E7 FOREIGN KEY (model_id) REFERENCES model (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE model DROP CONSTRAINT FK_D79572D9C34E733E');
        $this->addSql('ALTER TABLE model_element DROP CONSTRAINT FK_21D337C87975B7E7');
        $this->addSql('DROP TABLE model');
        $this->addSql('DROP TABLE model_element');
        $this->addSql('DROP TABLE models_pack');
    }
}
