<?php

namespace App\GraphQL\Mutations\Event;

use App\DTOs\Event\SubscribeEventDTO;
use App\Services\Event\EventService;
use Exception;

readonly class SubscribeToEvent {
  public function __construct(
    private EventService $eventService
  ) {}

  public function __invoke(null $_, array $args): bool {
    $userId = auth()->id();
    
    if (!$userId) {
      throw new Exception('Usuário não autenticado.');
    }

    $dto = new SubscribeEventDTO(
      eventId: (int) $args['event_id'],
      userId: $userId
    );

    return $this->eventService->subscribeToEvent($dto);
  }
}