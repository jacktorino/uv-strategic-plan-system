<?php

namespace Database\Seeders;

use App\Models\KeyResultArea\Kra;
use Illuminate\Database\Seeder;

class KraSeeder extends Seeder
{
    public function run(): void
    {
        $kras = [
            [
                'code' => '1.1',
                'name' => 'Governance',
                'order_no' => 1,
            ],
            [
                'code' => '1.2',
                'name' => 'Quality of Teaching and Learning',
                'order_no' => 2,
            ],
            [
                'code' => '1.3',
                'name' => 'Research, Innovation and Creative Works',
                'order_no' => 3,
            ],
        ];

        foreach ($kras as $kra) {
            Kra::updateOrCreate(
                ['code' => $kra['code']],
                $kra
            );
        }
    }
}