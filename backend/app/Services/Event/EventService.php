<?php
namespace App\Services\Event;

use App\DTOs\Event\CreateEventDTO;
use App\Models\Event;
use App\Actions\Event\CreateEventAction;
use App\Actions\Event\UpdateEventAction;
use App\Actions\Event\DeleteEventAction;

class EventService {
    public function __construct(
      private CreateEventAction $createEventAction,
      private UpdateEventAction $updateEventAction,
      private DeleteEventAction $deleteEventAction
    ) {}

    public function createEvent(CreateEventDTO $dto): Event {
      return $this->createEventAction->execute($dto);
    }

    public function updateEvent(int $id, array $data, $bannerFile, $coverFile = null): Event {
      return $this->updateEventAction->execute($id, $data, $bannerFile, $coverFile);
    }

    public function deleteEvent(int $id): bool {
      return $this->deleteEventAction->execute($id);
    }
}