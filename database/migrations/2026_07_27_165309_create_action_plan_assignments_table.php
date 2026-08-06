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

            // Permanent Action Plan
            $table->foreignId('action_plan_id')
                ->constrained()
                ->cascadeOnDelete();

            // Monthly Reporting Period
            $table->foreignId('action_plan_period_id')
                ->constrained()
                ->cascadeOnDelete();

            // Responsible Unit
            $table->foreignId('responsible_unit_id')
                ->constrained('units')
                ->cascadeOnDelete();

            // Progress
            $table->unsignedTinyInteger('progress_percentage')
                ->default(0);

            $table->enum('status', [
                'Not Yet Submitted',
                'Submitted',
                'Under Review',
                'Approved',
                'Rejected',
            ])->default('Not Yet Submitted');

            // Submission
            $table->timestamp('submitted_at')->nullable();
            $table->text('submission_remarks')->nullable();
            $table->string('attachment_path')->nullable();

            // Review
            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_remarks')->nullable();

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | One responsible unit can only have ONE assignment
            | for ONE Action Plan during ONE reporting month.
            |--------------------------------------------------------------------------
            */

            $table->unique([
                'action_plan_period_id',
                'action_plan_id',
                'responsible_unit_id',
            ], 'apa_period_plan_unit_unique');
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