<?php
namespace App\GraphQL\Mutations\Event;

use App\Services\Event\EventService;
use App\DTOs\Event\CreateEventDTO;

class CreateEventMutation {
  public function __construct(private EventService $eventService) {}

  public function __invoke($_, array $args): \App\Models\Event {
    $dto = new CreateEventDTO(
      userId: auth()->id(),
      name: $args['name'],
      date: $args['date'],
      time: $args['time'],
      capacity: $args['capacity'],
      location: $args['location'],
      price: $args['price'] ?? null,
      description: $args['description'] ?? null,
      banner: $args['banner'] ?? null,
      cover: $args['cover'] ?? null
    );

    return $this->eventService->createEvent($dto);
  }
}