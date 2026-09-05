<?php

namespace App\Actions\Event;

use App\Models\Event;
use App\DTOs\Event\CreateEventDTO;
use App\Repositories\Event\EventRepository;
use Illuminate\Support\Str;

class CreateEventAction {
  public function __construct(
    private EventRepository $eventRepository
  ) {}

  public function execute(CreateEventDTO $dto): Event {
    $eventData = [
      'user_id' => $dto->userId,
      'public_id' => Str::random(12),
      'name' => $dto->name,
      'date' => $dto->date,
      'time' => $dto->time,
      'capacity' => $dto->capacity,
      'street' => $dto->street,
      'city' => $dto->city,
      'price' => $dto->price,
      'description' => $dto->description,
      'status' => 'aberto'
    ];

    $event = $this->eventRepository->create($eventData);
    
    $path = "uploads/eventos/{$event->id}/img";
    
    if ($dto->banner) {
      $filename = Str::random(30) . '.' . $dto->banner->getClientOriginalExtension();
      $dto->banner->storeAs($path, $filename, 'public');

      $this->eventRepository->updateBanner($event->id, $filename);
      $event->banner = $filename;
    }

    if ($dto->cover) {
      $coverName = Str::random(30) . '_cover.' . $dto->cover->getClientOriginalExtension();
      $dto->cover->storeAs($path, $coverName, 'public');
      
      Event::where('id', $event->id)->update(['cover' => $coverName]);
      $event->cover = $coverName;
    }

    return $event;
  }
}