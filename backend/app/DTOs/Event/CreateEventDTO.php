<?php
namespace App\DTOs\Event;
use Illuminate\Http\UploadedFile;

readonly class CreateEventDTO {
  public function __construct(
    public int $userId,
    public string $name,
    public string $date,
    public string $time,
    public int $capacity,
    public string $location,
    public ?string $price = null,
    public ?string $description = null,
    public ?UploadedFile $banner = null,
    public ?UploadedFile $cover = null
  ) {}
}