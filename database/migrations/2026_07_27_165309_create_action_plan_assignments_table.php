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
        Schema::create('action_plan_assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('action_plan_id')
                ->constrained()
                ->cascadeOnDelete();

            // Explicitly point 'responsible_unit_id' to the 'units' table
            $table->foreignId('responsible_unit_id')
                ->constrained('units')
                ->cascadeOnDelete();

            // Missing progress column added here
            $table->unsignedInteger('progress_percentage')->default(0);

            $table->enum('status', [
                'Not Submitted',
                'Submitted',
                'Approved',
                'Rejected',
            ])->default('Not Submitted');

            // Submission Information
            $table->timestamp('submitted_at')->nullable();
            $table->text('submission_remarks')->nullable();

            // Review Information
            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_remarks')->nullable();

            $table->timestamps();

            // One responsible unit can only be assigned once per action plan
            $table->unique(
                ['action_plan_id', 'responsible_unit_id'],
                'apa_plan_unit_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_plan_assignments');
    }
};