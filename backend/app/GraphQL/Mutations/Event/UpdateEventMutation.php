<?php
namespace App\GraphQL\Mutations\Event;

use App\Services\Event\EventService;

class UpdateEventMutation {
    public function __construct(private EventService $eventService) {}

    public function __invoke($_, array $args): \App\Models\Event {
      $id = $args['id'];
      $banner = $args['banner'] ?? null;

      unset($args['id'], $args['banner']);

      return $this->eventService->updateEvent($id, $args, $banner);
    }
}