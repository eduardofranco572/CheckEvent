<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Event;
use Carbon\Carbon;

class UpcomingEventsQuery {
  public function __invoke(mixed $root, array $args): Builder {
    $query = Event::query()->where('status', 'aberto');

    if (!empty($args['name'])) {
      $query->where('name', 'like', "%{$args['name']}%");
    }

    if (!empty($args['city'])) {
      $query->where('city', 'like', "%{$args['city']}%");
    }

    if (isset($args['price']) && $args['price'] !== '') {
      if ($args['price'] === 'gratuito') {
        $query->where(function($q) {
          $q->where('price', '0')
            ->orWhere('price', '0.00')
            ->orWhereNull('price');
        });

      } elseif ($args['price'] === 'pago') {
        $query->where('price', '!=', '0')
              ->where('price', '!=', '0.00')
              ->whereNotNull('price');
      }
    }

    if (!empty($args['date_filter'])) {
      $now = Carbon::now();

      if ($args['date_filter'] === 'week') {
        $query->whereBetween('date', [$now->startOfWeek()->toDateString(), $now->endOfWeek()->toDateString()]);
        
      } elseif ($args['date_filter'] === 'month') {
        $query->whereMonth('date', $now->month)->whereYear('date', $now->year);
      }
    }

    return $query->orderBy('date', 'asc');
  }
}