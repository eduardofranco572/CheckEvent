<?php

namespace App\DTOs\Event;

readonly class SubscribeEventDTO {
  public function __construct(
    public int $eventId,
    public int $userId
  ) {}
}