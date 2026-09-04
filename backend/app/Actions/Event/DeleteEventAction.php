<?php

namespace App\Actions\Event;

use App\Models\Event;
use Illuminate\Support\Facades\Storage;

class DeleteEventAction {
  public function execute(int $id): bool {
    $event = Event::findOrFail($id);

    if ($event->user_id !== auth()->id()) {
      abort(403, 'Você não tem permissão para excluir este evento.');
    }

    $path = "uploads/eventos/{$event->id}/img";

    if ($event->banner) {
      Storage::disk('public')->delete("{$path}/{$event->banner}");
    }
    if ($event->cover) {
      Storage::disk('public')->delete("{$path}/{$event->cover}");
    }

    return $event->delete();
  }
}