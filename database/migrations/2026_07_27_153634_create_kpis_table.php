<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kpis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('subkra_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('code')->unique();      // e.g. 1.1.1
            $table->text('name');

            $table->unsignedInteger('order_no')->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kpis');
    }
};