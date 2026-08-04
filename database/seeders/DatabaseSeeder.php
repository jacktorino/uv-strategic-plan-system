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
            KraSeeder::class,
            KpiSeeder::class,
            ActionPlanSeeder::class,
            UserSeeder::class,
        ]);
    }
}