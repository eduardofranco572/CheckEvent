<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('location');
            $table->string('street')->after('capacity');
            $table->string('city')->after('street');
        });
    }

    public function down(): void {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['street', 'city']);
            $table->string('location')->nullable();
        });
    }
};