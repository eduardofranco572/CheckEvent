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

    public function updateEvent(int $id, array $data, $bannerFile, $coverFile = null): Event {
        $event = Event::findOrFail($id);
        if ($event->user_id !== auth()->id()) abort(403, 'Você não tem permissão.');

        $event->update($data);
        $path = "uploads/eventos/{$event->id}/img";

        if ($bannerFile) {
            if ($event->banner) Storage::disk('public')->delete("{$path}/{$event->banner}");
            $filename = Str::random(30) . '.' . $bannerFile->getClientOriginalExtension();
            $bannerFile->storeAs($path, $filename, 'public');
            $event->update(['banner' => $filename]);
        }

        if ($coverFile) {
            if ($event->cover) Storage::disk('public')->delete("{$path}/{$event->cover}");
            $coverName = Str::random(30) . '_cover.' . $coverFile->getClientOriginalExtension();
            $coverFile->storeAs($path, $coverName, 'public');
            $event->update(['cover' => $coverName]);
        }

        return $event;
    }

    public function deleteEvent(int $id): bool {
        $event = Event::findOrFail($id);
        if ($event->user_id !== auth()->id()) abort(403, 'Você não tem permissão.');

        $path = "uploads/eventos/{$event->id}/img";
        if ($event->banner) Storage::disk('public')->delete("{$path}/{$event->banner}");
        if ($event->cover) Storage::disk('public')->delete("{$path}/{$event->cover}");

        return $event->delete();
    }
}