<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model {

  protected $attributes = [
    'status' => 'aberto',
  ];

  protected $fillable = [
    'user_id', 
    'name', 
    'date', 
    'time', 
    'capacity', 
    'location', 
    'price', 
    'description', 
    'banner', 
    'cover', 
    'status'
  ];

  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}