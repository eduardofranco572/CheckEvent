<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessEventSubscription implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public function __construct(
    public readonly int $eventId,
    public readonly int $userId
  ) {}

  public function handle(): void {
    Log::info("RabbitMQ Processando inscrição: Evento {$this->eventId} | Usuário {$this->userId}");
  }
}