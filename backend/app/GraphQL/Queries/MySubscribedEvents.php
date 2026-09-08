<?php

namespace App\GraphQL\Queries;

use App\Services\Event\EventService;

final readonly class MySubscribedEvents {
  public function __construct(private EventService $eventService) {}

  public function __invoke(mixed $root, array $args) {
    return $this->eventService->getUserSubscribedEvents(auth()->id());
  }
}