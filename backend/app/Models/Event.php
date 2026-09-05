<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model {
  protected $fillable = [
    'name', 
    'date', 
    'time', 
    'capacity', 
    'street', 
    'city', 
    'price', 
    'description', 
    'banner', 
    'cover', 
    'status',
    'public_id', 
    'user_id' 
  ];

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }

  public function subscribers() {
    return $this->belongsToMany(User::class, 'event_user')->withTimestamps();
  }

  public function getIsSubscribedAttribute(): bool {
    if (!auth('sanctum')->check()) return false;
    
    return $this->subscribers()->where('user_id', auth('sanctum')->id())->exists();
  }
}