<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::table('events', function (Blueprint $table) {
      $table->string('status')->default('aberto');
      $table->string('cover')->nullable();
    });
  }

  public function down(): void {
    Schema::table('events', function (Blueprint $table) {
      $table->dropColumn(['status', 'cover']);
    });
  }
};