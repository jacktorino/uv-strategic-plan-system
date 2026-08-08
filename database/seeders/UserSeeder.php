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
        | KRA In-Charge Accounts (KRA 1–5)
        |--------------------------------------------------------------------------
        */

        foreach (range(1, 5) as $num) {
            User::updateOrCreate(
                ['email' => "kra{$num}@uv.edu.ph"],
                [
                    'name' => "KRA {$num} In-Charge",
                    'password' => Hash::make('Testing123!'),
                    'role' => 'kra_incharge',
                    'responsible_unit_id' => null,
                ]
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Sub-KRA In-Charge Accounts (one per Sub-KRA code, e.g. subkra1-1)
        |--------------------------------------------------------------------------
        */

        $subKraCodes = [
            '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
            '2.1', '2.2', '2.3',
            '3.1', '3.2', '3.3', '3.4',
            '4.1', '4.2', '4.3',
            '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8',
        ];

        foreach ($subKraCodes as $code) {
            $slug = str_replace('.', '-', $code); // '1.1' -> '1-1'

            User::updateOrCreate(
                ['email' => "subkra{$slug}@uv.edu.ph"],
                [
                    'name' => "Sub-KRA {$code} In-Charge",
                    'password' => Hash::make('Testing123!'),
                    'role' => 'subkra_incharge',
                    'responsible_unit_id' => null,
                ]
            );
        }

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