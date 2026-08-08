<?php

namespace Database\Seeders;

use App\Models\KeyResultArea\Kra;
use App\Models\User;
use Illuminate\Database\Seeder;

class KraSeeder extends Seeder
{
    public function run(): void
    {
        $kras = [
            ['code' => 'KRA 1', 'name' => 'EFFICIENT AND EFFECTIVE GOVERNANCE, MANAGEMENT AND LEADERSHIP (Mission #4 and QO #4)'],
            ['code' => 'KRA 2', 'name' => 'QUALITY RESEARCH AND KNOWLEDGE MANAGEMENT (Mission #1 and QO #3)'],
            ['code' => 'KRA 3', 'name' => 'INNOVATIVE AND EXCELLENT TEACHING AND LEARNING (Mission #2 and QO #2)'],
            ['code' => 'KRA 4', 'name' => 'SUSTAINED SOCIAL RESPONSIBILITY, COMMUNITY INVOLVEMENT AND INDUSTRY LINKAGES (Mission #3 and QO #1)'],
            ['code' => 'KRA 5', 'name' => 'HOLISTIC ENGAGEMENT WITH STUDENTS AND OTHER STAKEHOLDERS (Mission #4 and QO #5)'],
        ];

        foreach ($kras as $kra) {
            $num = trim(str_replace('KRA', '', $kra['code'])); // 'KRA 1' -> '1'

            $user = User::where('email', "kra{$num}@uv.edu.ph")
                ->where('role', 'kra_incharge')
                ->first();

            Kra::updateOrCreate(
                ['code' => $kra['code']],
                array_merge($kra, ['user_id' => $user?->id])
            );
        }
    }
}