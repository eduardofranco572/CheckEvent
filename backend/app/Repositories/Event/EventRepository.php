<?php

namespace App\Repositories\Event;

use App\Models\Event;
use App\DTOs\Event\CreateEventDTO;
use Illuminate\Support\Facades\DB;

class EventRepository {
  public function create(array $data): Event {
    return Event::create($data);
  }

  public function updateBanner(int $eventId, string $bannerName): void {
    Event::where('id', $eventId)->update(['banner' => $bannerName]);
  }

  public function findById(int $id): ?Event {
    return Event::find($id);
  }

  public function isUserSubscribed(int $eventId, int $userId): bool {
    $event = Event::find($eventId);
    
    return $event ? $event->subscribers()->where('user_id', $userId)->exists() : false;
  }

  public function attachUserToEvent(int $eventId, int $userId): void {
    DB::transaction(function () use ($eventId, $userId) {
      $event = Event::find($eventId);
      
      $event->subscribers()->attach($userId);
    });
  }
}