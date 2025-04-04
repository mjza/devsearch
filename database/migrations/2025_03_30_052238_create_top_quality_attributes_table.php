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
        Schema::create('top_quality_attributes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->string('quality_attribute');
            $table->string('sentiment', 10)->default('-');
            $table->float('similarity_score')->check('similarity_score >= 0 AND similarity_score <= 1');
            $table->unsignedBigInteger('issue_id');
            $table->text('reasoning')->nullable();

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('top_quality_attributes');
    }
};
