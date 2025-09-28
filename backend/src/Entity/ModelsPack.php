<?php

namespace App\Entity;

use App\Repository\ModelsPackRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModelsPackRepository::class)]
class ModelsPack
{

    /**
     * @var int
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    /**
     * @var string
     */
    #[ORM\Column(length: 255)]
    private string $name;

    /**
     * @var Collection<int, Model>
     */
    #[ORM\OneToMany(targetEntity: Model::class, mappedBy: 'modelsPack')]
    private Collection $models;

    public function __construct()
    {
        $this->models = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     * @return $this
     */
    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Model>
     */
    public function getModels(): Collection
    {
        return $this->models;
    }

    /**
     * @param Model $model
     *
     * @return $this
     */
    public function addModel(Model $model): static
    {
        if (!$this->models->contains($model)) {
            $this->models->add($model);
            $model->setModelsPack($this);
        }

        return $this;
    }

    /**
     * @param Model $model
     *
     * @return $this
     */
    public function removeModel(Model $model): static
    {
        $this->models->removeElement($model);

        return $this;
    }

}
