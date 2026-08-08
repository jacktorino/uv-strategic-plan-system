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
        Schema::create('subkras', function (Blueprint $table) {
            $table->id();
            
            // Foreign key to connect to the kras table
            $table->foreignId('kra_id')
                  ->constrained('kras')
                  ->onDelete('cascade'); 

            // Foreign key for Sub-KRA In-Charge
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            $table->string('code')->unique();   // e.g. 1.1, 1.2, 2.1
            $table->string('name');
            $table->unsignedInteger('order_no')->default(1); // display order
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subkras');
    }
};