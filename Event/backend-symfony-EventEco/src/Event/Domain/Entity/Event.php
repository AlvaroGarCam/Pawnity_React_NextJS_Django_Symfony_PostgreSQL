<?php

namespace App\Event\Domain\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Shared\Doctrine\Enums\StatusEventEnumType;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: "e_events")]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "idevent", type: "integer")]
    private ?int $idEvent = null;

    #[ORM\Column(type: "string", length: 100)]
    private string $name;

    #[ORM\Column(name: "startdate", type: "date")]
    private \DateTimeInterface $startDate;

    #[ORM\Column(name: "enddate", type: "date")]
    private \DateTimeInterface $endDate;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $location = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $position = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: "statusEvent", options: ["default" => "Preparing"])]
    private string $status;

    #[ORM\Column(name: "urlimage", type: "simple_array", nullable: true)]
    private ?array $urlImage = null;

    #[ORM\Column(name: "urlposter", type: "string", length: 255, nullable: true)]
    private ?string $urlPoster = null;

    #[ORM\Column(name: "idorg", type: "integer", nullable: true)]
    private ?int $orgId = null;

    #[ORM\Column(name: "idcategory", type: "integer", nullable: true)]
    private ?int $idCategory = null;

    #[ORM\Column(name: "createdat", type: "datetime_immutable")]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(name: "updatedat", type: "datetime_immutable")]
    private \DateTimeImmutable $updatedAt;

    #[ORM\Column(name: "eventslug", type: "string", length: 150)]
    private string $eventSlug;

    #[ORM\Column(name: "isactive", type: "boolean", nullable: false, options: ["default" => true])]
    private bool $isActive = true;

    #[ORM\OneToMany(mappedBy: "event", targetEntity: SubEvent::class, cascade: ["persist", "remove"])]
    private Collection $subEvents;

    public function __construct(
        string $name,
        \DateTimeInterface $startDate,
        \DateTimeInterface $endDate,
        ?string $location,
        ?string $position,
        ?string $description,
        string $status,
        ?array $urlImage,
        ?string $urlPoster,
        ?int $orgId,
        ?int $idCategory
    ) {
        if (!in_array($status, StatusEventEnumType::VALUES, true)) {
            throw new \InvalidArgumentException("Invalid event status: $status");
        }
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->location = $location;
        $this->position = $position;
        $this->description = $description;
        $this->status = $status;
        $this->urlImage = $urlImage;
        $this->urlPoster = $urlPoster;
        $this->orgId = $orgId;
        $this->idCategory = $idCategory;
        $this->eventSlug = $this->generateSlug($name);
        $this->subEvents = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->isActive = true;
    }

    private function generateSlug(string $name): string
    {
        // Convertir el nombre a minúsculas, eliminar caracteres no deseados y reemplazar espacios por guiones
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
    }

    public function disable(): self
    {
        $this->isActive = !$this->isActive;
        return $this;
    }

    // Getters
    public function getIdEvent(): ?int { return $this->idEvent; }
    public function getName(): string { return $this->name; }
    public function getStartDate(): \DateTimeInterface { return $this->startDate; }
    public function getEndDate(): \DateTimeInterface { return $this->endDate; }
    public function getLocation(): ?string { return $this->location; }
    public function getPosition(): ?string { return $this->position; }
    public function getDescription(): ?string { return $this->description; }
    public function getStatus(): string { return $this->status; }
    public function getUrlImage(): ?array { return $this->urlImage; }
    public function getUrlPoster(): ?string { return $this->urlPoster; }
    public function getOrgId(): ?int { return $this->orgId; }
    public function isActive(): bool { return $this->isActive; }
    public function getIdCategory(): ?int { return $this->idCategory; }
    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): \DateTimeImmutable { return $this->updatedAt; }
    public function getSubEvents(): Collection { return $this->subEvents; }
    public function getEventSlug(): string { return $this->eventSlug; }

    // Setters
    public function setName(string $name): void { $this->name = $name; }
    public function setLocation(?string $location): void { $this->location = $location; }
    public function setPosition(?string $position): void { $this->position = $position; }
    public function setDescription(?string $description): void { $this->description = $description; }
    public function setUpdatedAt(\DateTimeImmutable $updatedAt): void { $this->updatedAt = $updatedAt; }
    public function setUrlImage(?array $urlImage): void { $this->urlImage = $urlImage; }
    public function setUrlPoster(?string $urlPoster): void { $this->urlPoster = $urlPoster; }
    public function setIdCategory(?int $idCategory): void { $this->idCategory = $idCategory; }
    public function setStartDate(\DateTimeInterface $startDate): void { $this->startDate = $startDate; }
    public function setEndDate(\DateTimeInterface $endDate): void { $this->endDate = $endDate; }

}