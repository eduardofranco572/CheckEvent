<?php

namespace App\Actions\Event;

use App\DTOs\Event\SubscribeEventDTO;
use App\Repositories\Event\EventRepository;
use App\Jobs\ProcessEventSubscription;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Exception;

class SubscribeEventAction {
  public function __construct(
    private EventRepository $eventRepository
  ) {}

  public function execute(SubscribeEventDTO $dto): bool {
    $lockKey = "lock_event_subscription_{$dto->eventId}";
    $lock = Cache::lock($lockKey, 5);

    if ($lock->block(3)) {
      try {
        $event = $this->eventRepository->findById($dto->eventId);
        
        if (!$event) {
          throw new Exception('Evento não encontrado.');
        }

        if (Carbon::parse("{$event->date} {$event->time}")->isPast()) {
          throw new Exception('Este evento já foi encerrado.');
        }

        $currentSubscribers = $event->subscribers()->count();

        if ($currentSubscribers >= $event->capacity) {
          throw new Exception('As vagas para este evento estão esgotadas.');
        }

        if ($this->eventRepository->isUserSubscribed($dto->eventId, $dto->userId)) {
          throw new Exception('Você já está inscrito neste evento.');
        }

        $this->eventRepository->attachUserToEvent($dto->eventId, $dto->userId);

        ProcessEventSubscription::dispatch($dto->eventId, $dto->userId);

        return true;

      } finally {
        $lock->release();
      }
    }

    throw new Exception('Muitos acessos simultâneos. Tente novamente em instantes.');
  }
}