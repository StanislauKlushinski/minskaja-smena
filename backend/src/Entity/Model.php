<?php

namespace App\Entity;

use App\Repository\ModelRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

#[ORM\Entity(repositoryClass: ModelRepository::class)]
class Model
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
     * @var ModelsPack
     */
    #[ORM\ManyToOne(inversedBy: 'models')]
    #[ORM\JoinColumn(nullable: false)]
    private ModelsPack $modelsPack;

    /**
     * @var Collection<int, ModelElement>
     */
    #[ORM\OneToMany(targetEntity: ModelElement::class, mappedBy: 'model')]
    private Collection $modelElements;

    /**
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    #[ORM\Column(type: "datetime")]
    #[Gedmo\Timestampable(on: 'create')]
    private DateTimeInterface $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    #[ORM\Column(type: "datetime")]
    #[Gedmo\Timestampable(on: "update")]
    private DateTimeInterface $updatedAt;

    /**
     * @var string
     */
    #[ORM\Column(type: 'string', unique: true)]
    #[Gedmo\Slug(fields: ['name'], separator: '-', prefix: 'model-')]
    private string $slug;

    /**
     * @var string|null
     */
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    public function __construct()
    {
        $this->modelElements = new ArrayCollection();
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
     * @return ModelsPack
     */
    public function getModelsPack(): ModelsPack
    {
        return $this->modelsPack;
    }

    /**
     * @param ModelsPack $modelsPack
     *
     * @return $this
     */
    public function setModelsPack(ModelsPack $modelsPack): static
    {
        $this->modelsPack = $modelsPack;

        return $this;
    }

    /**
     * @return Collection<int, ModelElement>
     */
    public function getModelElements(): Collection
    {
        return $this->modelElements;
    }

    /**
     * @param ModelElement $modelElement
     *
     * @return $this
     */
    public function addModelElement(ModelElement $modelElement): static
    {
        if (!$this->modelElements->contains($modelElement)) {
            $this->modelElements->add($modelElement);
            $modelElement->setModel($this);
        }

        return $this;
    }

    /**
     * @param ModelElement $modelElement
     *
     * @return $this
     */
    public function removeModelElement(ModelElement $modelElement): static
    {
        $this->modelElements->removeElement($modelElement);

        return $this;
    }

    /**
     * @return DateTimeInterface
     */
    public function getUpdatedAt(): DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @param DateTimeInterface $updatedAt
     *
     * @return void
     */
    public function setUpdatedAt(DateTimeInterface $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return DateTimeInterface
     */
    public function getCreatedAt(): DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @param DateTimeInterface $createdAt
     *
     * @return void
     */
    public function setCreatedAt(DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     *
     * @return $this
     */
    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

}
