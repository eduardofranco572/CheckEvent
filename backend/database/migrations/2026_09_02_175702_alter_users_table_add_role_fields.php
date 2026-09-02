<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
      Schema::table('users', function (Blueprint $table) {
        $table->boolean('is_pro')->default(false);
        $table->boolean('is_adm')->default(false);
        $table->integer('usage_limit')->default(2);
      });
    }

    public function down(): void {
      Schema::table('users', function (Blueprint $table) {
        $table->dropColumn(['is_pro', 'is_adm', 'usage_limit']);
      });
    }
};