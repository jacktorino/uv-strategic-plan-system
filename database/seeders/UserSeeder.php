<?php

namespace Database\Seeders;

use App\Models\ResponsibleUnit\Units;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | System Users
        |--------------------------------------------------------------------------
        */

        User::updateOrCreate(
            ['email' => 'admin@uv.edu.ph'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('Testing123!'),
                'role' => 'admin',
                'responsible_unit_id' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'planning@uv.edu.ph'],
            [
                'name' => 'Planning Officer',
                'password' => Hash::make('Testing123!'),
                'role' => 'planning_officer',
                'responsible_unit_id' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'viewer@uv.edu.ph'],
            [
                'name' => 'System Viewer',
                'password' => Hash::make('Testing123!'),
                'role' => 'viewer',
                'responsible_unit_id' => null,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | Responsible Unit Accounts
        |--------------------------------------------------------------------------
        */

        foreach (Units::orderBy('order_no')->get() as $unit) {

            User::updateOrCreate(
                [
                    'email' => strtolower($unit->code) . '@uv.edu.ph',
                ],
                [
                    'name' => "{$unit->code} Representative",
                    'password' => Hash::make('Testing123!'),
                    'role' => 'responsible_unit',
                    'responsible_unit_id' => $unit->id,
                ]
            );
        }
    }
}