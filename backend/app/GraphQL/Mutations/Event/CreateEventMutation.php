<?php

namespace App\GraphQL\Mutations\Event;

use App\Services\Event\EventService;
use App\DTOs\Event\CreateEventDTO;

final class CreateEventMutation {
    public function __construct(
    private EventService $eventService
  ) {}

  public function __invoke(mixed $root, array $args) {
      $dto = new CreateEventDTO(
        userId: auth()->id(),
        name: $args['name'],
        date: $args['date'],
        time: $args['time'],
        capacity: $args['capacity'],
        street: $args['street'], 
        city: $args['city'],     
        price: $args['price'] ?? null,
        description: $args['description'] ?? null,
        banner: $args['banner'] ?? null,
        cover: $args['cover'] ?? null
      );

    return $this->eventService->createEvent($dto);
  }
}