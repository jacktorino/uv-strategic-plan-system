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
        Schema::create('kras', function (Blueprint $table) {
            $table->id();
            
            // Connects the KRA Champion to a user record
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete(); // Sets to null if the user is deleted

            $table->string('code')->unique();   // Kra 1
            $table->string('name');             // EFFICIENT AND EFFECTIVE GOVERNANCE, MANAGEMENT AND LEADERSHIP
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kras');
    }
};