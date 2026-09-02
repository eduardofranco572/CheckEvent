<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model {
  protected $fillable = [
    'user_id', 
    'name', 
    'date', 
    'time', 
    'capacity', 
    'location', 
    'price', 
    'description', 
    'banner'
  ];

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}