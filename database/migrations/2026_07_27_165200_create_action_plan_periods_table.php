<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('action_plan_periods', function (Blueprint $table) {
            $table->id();

            $table->foreignId('action_plan_id')
                ->constrained()
                ->cascadeOnDelete();

            // Reporting Period
            $table->unsignedTinyInteger('month');
            $table->unsignedSmallInteger('year');

            $table->date('period_start');
            $table->date('period_end');

            // Submission Window
            $table->date('submission_start');
            $table->date('submission_deadline');

            // Review Window
            $table->date('review_start');
            $table->date('review_end');

            // Final Approval
            $table->date('approval_date');

            $table->enum('status', [
                'Open',
                'Under Review',
                'Approved',
                'Closed',
            ])->default('Open');

            $table->timestamps();

            $table->unique([
                'action_plan_id',
                'month',
                'year',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('action_plan_periods');
    }
};