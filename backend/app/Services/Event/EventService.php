<?php

namespace App\Services\Event;

use App\DTOs\Event\CreateEventDTO;
use App\DTOs\Event\SubscribeEventDTO;
use App\Models\Event;
use App\Actions\Event\CreateEventAction;
use App\Actions\Event\UpdateEventAction;
use App\Actions\Event\DeleteEventAction;
use App\Actions\Event\SubscribeEventAction;
use App\Repositories\Event\EventRepository;

class EventService {
  public function __construct(
    private CreateEventAction $createEventAction,
    private UpdateEventAction $updateEventAction,
    private DeleteEventAction $deleteEventAction,
    private SubscribeEventAction $subscribeEventAction,
    private EventRepository $eventRepository
  ) {}

  public function getUserSubscribedEvents(int $userId) {
    return $this->eventRepository->getSubscribedEventsByUser($userId);
  }
  
  public function createEvent(CreateEventDTO $dto): Event {
    return $this->createEventAction->execute($dto);
  }

  public function updateEvent(int $id, array $data, $bannerFile, $coverFile = null): Event {
    return $this->updateEventAction->execute($id, $data, $bannerFile, $coverFile);
  }

  public function deleteEvent(int $id): bool {
    return $this->deleteEventAction->execute($id);
  }

  public function subscribeToEvent(SubscribeEventDTO $dto): bool {
    return $this->subscribeEventAction->execute($dto);
  }
}