<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('platform');
            $table->text('description')->nullable();
            $table->text('homepage')->nullable();
            $table->text('language')->nullable();
            $table->text('repository_url')->nullable();
            $table->text('keywords')->nullable();
            $table->text('normalized_licenses')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
