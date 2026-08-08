<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ResponsibleUnitSeeder::class,
            UserSeeder::class,
            KraSeeder::class,
            SubKraSeeder::class,
            KpiSeeder::class,
            ActionPlanSeeder::class,
     
        ]);
    }
}