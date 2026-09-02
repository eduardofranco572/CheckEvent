<?php
namespace App\Repositories\Event;

use App\Models\Event;
use App\DTOs\Event\CreateEventDTO;

class EventRepository {
  public function create(CreateEventDTO $dto): Event {
    return Event::create([
      'user_id' => $dto->userId,
      'name' => $dto->name,
      'date' => $dto->date,
      'time' => $dto->time,
      'capacity' => $dto->capacity,
      'location' => $dto->location,
      'price' => $dto->price,
      'description' => $dto->description,
    ]);
  }

  public function updateBanner(int $eventId, string $bannerName): void {
    Event::where('id', $eventId)->update(['banner' => $bannerName]);
  }
}