<?php

namespace App\GraphQL\Mutations\Event;

use App\Services\Event\EventService;

final class UpdateEventMutation {
  public function __construct(
    private EventService $eventService
  ) {}

  public function __invoke(mixed $root, array $args) {
    $data = [];
    
    if (isset($args['name'])) { 
      $data['name'] = $args['name'];
    }

    if (isset($args['date'])) {
      $data['date'] = $args['date'];
    }

    if (isset($args['time'])) {
      $data['time'] = $args['time'];
    }

    if (isset($args['capacity'])) {
      $data['capacity'] = $args['capacity'];
    }
    
    if (isset($args['street'])) {
      $data['street'] = $args['street'];
    }

    if (isset($args['city'])) {
      $data['city'] = $args['city'];
    }
    
    if (isset($args['price'])) {
      $data['price'] = $args['price'];
    }

    if (isset($args['description'])) {
      $data['description'] = $args['description'];
    }

    if (isset($args['status'])) {
      $data['status'] = $args['status'];
    }

    return $this->eventService->updateEvent(
        $args['id'],
        $data,
        $args['banner'] ?? null,
        $args['cover'] ?? null
    );
  }
}