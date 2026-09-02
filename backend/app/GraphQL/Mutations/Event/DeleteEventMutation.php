<?php
namespace App\GraphQL\Mutations\Event;

use App\Services\Event\EventService;

class DeleteEventMutation {
    public function __construct(private EventService $eventService) {}

    public function __invoke($_, array $args): bool {
      return $this->eventService->deleteEvent($args['id']);
    }
}