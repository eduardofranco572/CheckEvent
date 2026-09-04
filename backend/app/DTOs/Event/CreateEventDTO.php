<?php
namespace App\DTOs\Event;
use Illuminate\Http\UploadedFile;

class CreateEventDTO {
  public function __construct(
    public int $userId,
    public string $name,
    public string $date,
    public string $time,
    public int $capacity,
    public string $street,
    public string $city,
    public ?string $price = null,
    public ?string $description = null,
    public $banner = null,
    public $cover = null
  ) {}
}