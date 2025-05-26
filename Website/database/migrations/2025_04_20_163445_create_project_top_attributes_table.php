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
        Schema::create('project_top_attributes', function (Blueprint $table) {
            $table->unsignedBigInteger('project_id');
            $table->text('criteria');
            $table->decimal('avg_similarity_score', 12, 3)->nullable();
            $table->json('issue_ids');  // JSON field
            $table->decimal('diff_from_mean', 12, 6)->nullable();

            // You can add a primary key or index if needed
            $table->index(['project_id', 'criteria']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_top_attributes');
    }
};
