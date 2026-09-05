<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Event;
use Illuminate\Support\Str;

return new class extends Migration {
  public function up(): void {
    Schema::table('events', function (Blueprint $table) {
      $table->string('public_id', 15)->nullable()->unique()->after('id');
    });

    foreach (Event::all() as $event) {
      $event->public_id = Str::random(12);
      $event->save();
    }
  }

  public function down(): void {
    Schema::table('events', function (Blueprint $table) {
      $table->dropColumn('public_id');
    });
  }
};