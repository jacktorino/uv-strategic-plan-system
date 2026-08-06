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
        Schema::table('users', function (Blueprint $table) {

            $table->enum('role', [
                'admin',
                'planning_officer',
                'kra_incharge',
                'subkra_incharge',
                'responsible_unit',
                'viewer',
            ])->default('viewer')->after('password');

            $table->foreignId('responsible_unit_id')
                ->nullable()
                ->after('role')
                ->constrained('units')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropForeign(['responsible_unit_id']);

            $table->dropColumn([
                'role',
                'responsible_unit_id',
            ]);
        });
    }
};