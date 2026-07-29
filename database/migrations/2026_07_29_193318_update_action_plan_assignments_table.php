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
        Schema::table('action_plan_assignments', function (Blueprint $table) {
            // 1. Add progress_percentage if it doesn't exist
            if (!Schema::hasColumn('action_plan_assignments', 'progress_percentage')) {
                $table->unsignedInteger('progress_percentage')->default(0)->after('responsible_unit_id');
            }

            // 2. Drop Foreign Key first if column exists
            if (Schema::hasColumn('action_plan_assignments', 'reviewed_by')) {
                $table->dropForeign(['reviewed_by']); // Drop constraint first
                $table->dropColumn('reviewed_by');    // Then drop column
            }

            // 3. Drop remaining review columns if they exist
            if (Schema::hasColumn('action_plan_assignments', 'reviewed_at')) {
                $table->dropColumn('reviewed_at');
            }

            if (Schema::hasColumn('action_plan_assignments', 'review_remarks')) {
                $table->dropColumn('review_remarks');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('action_plan_assignments', function (Blueprint $table) {
            if (Schema::hasColumn('action_plan_assignments', 'progress_percentage')) {
                $table->dropColumn('progress_percentage');
            }

            $table->foreignId('reviewed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('reviewed_at')->nullable();
            $table->text('review_remarks')->nullable();
        });
    }
};