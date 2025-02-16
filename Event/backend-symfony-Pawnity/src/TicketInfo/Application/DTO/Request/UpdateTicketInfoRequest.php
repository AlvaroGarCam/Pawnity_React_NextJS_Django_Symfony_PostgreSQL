<?php

namespace App\TicketInfo\Application\DTO\Request;

class UpdateTicketInfoRequest
{
    private ?string $eventSlug;
    private string $type;
    private float $price;
    private ?int $capacity;
    private ?int $remaining;
    private ?string $descripcion;

    public function __construct(
        ?string $eventSlug,
        string $type,
        float $price,
        ?int $capacity,
        ?int $remaining,
        ?string $descripcion
    ) {
        $this->eventSlug   = $eventSlug;
        $this->type        = $type;
        $this->price       = $price;
        $this->capacity    = $capacity;
        $this->remaining   = $remaining;
        $this->descripcion = $descripcion;
    }

    public function getEventSlug(): ?string
    {
        return $this->eventSlug;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function getRemaining(): ?int
    {
        return $this->remaining;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }
}