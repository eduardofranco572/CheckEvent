<?php

namespace App\Actions\Event;

use App\Models\Event;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UpdateEventAction {
  public function execute(int $id, array $data, $bannerFile = null, $coverFile = null): Event {
    $event = Event::findOrFail($id);

    if ($event->user_id !== auth()->id()) {
      abort(403, 'Você não tem permissão para editar este evento.');
    }

    $event->update($data);
    
    $path = "uploads/eventos/{$event->id}/img";

    //Banner
    if ($bannerFile) {
      if ($event->banner) {
        Storage::disk('public')->delete("{$path}/{$event->banner}");
      }
      
      $filename = Str::random(30) . '.' . $bannerFile->getClientOriginalExtension();
      $bannerFile->storeAs($path, $filename, 'public');
      $event->update(['banner' => $filename]);
    }

    // Cover
    if ($coverFile) {
      if ($event->cover) {
        Storage::disk('public')->delete("{$path}/{$event->cover}");
      }
      
      $coverName = Str::random(30) . '_cover.' . $coverFile->getClientOriginalExtension();
      $coverFile->storeAs($path, $coverName, 'public');
      $event->update(['cover' => $coverName]);
    }

    return $event;
  }
}