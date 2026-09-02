<?php
namespace App\Services\Event;

use App\Repositories\Event\EventRepository;
use App\DTOs\Event\CreateEventDTO;
use App\Models\Event;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class EventService {
    public function __construct(private EventRepository $eventRepository) {}

    public function createEvent(CreateEventDTO $dto): Event {
      $event = $this->eventRepository->create($dto);

      if ($dto->banner) {
        $filename = Str::random(30) . '.' . $dto->banner->getClientOriginalExtension();
        $path = "uploads/eventos/{$event->id}/img";
        
        $dto->banner->storeAs($path, $filename, 'public');
        
        $this->eventRepository->updateBanner($event->id, $filename);
        $event->banner = $filename;
      }

      return $event;
    }

    public function updateEvent(int $id, array $data, $bannerFile): Event {
      $event = Event::findOrFail($id);

      if ($event->user_id !== auth()->id()) {
        abort(403, 'Você não tem permissão para editar este evento.');
      }

      $event->update($data);

      if ($bannerFile) {
        $path = "uploads/eventos/{$event->id}/img";

        // Exclui o arquivo antigo
        if ($event->banner) {
          Storage::disk('public')->delete("{$path}/{$event->banner}");
        }

        $filename = Str::random(30) . '.' . $bannerFile->getClientOriginalExtension();
        
        $bannerFile->storeAs($path, $filename, 'public');
        $event->update(['banner' => $filename]);
      }

      return $event;
    }


    public function deleteEvent(int $id): bool {
      $event = Event::findOrFail($id);

      if ($event->user_id !== auth()->id()) {
        abort(403, 'Você não tem permissão para excluir este evento.');
      }

      if ($event->banner) {
        \Illuminate\Support\Facades\Storage::disk('public')->delete("uploads/eventos/{$event->id}/img/{$event->banner}");
      }

      return $event->delete();
    }
}