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
                'name' => 'Leadership',
                'order_no' => 2,
            ],
            [
                'code' => '1.3',
                'name' => 'Human Resources Learning and Development',
                'order_no' => 3,
            ],
            [
                'code' => '1.4',
                'name' => 'Communication',
                'order_no' => 4,
            ],
            [
                'code' => '1.5',
                'name' => 'Physical Plant and Facilities',
                'order_no' => 5,
            ],
            [
                'code' => '1.6',
                'name' => 'ICT',
                'order_no' => 6,
            ],
            [
                'code' => '1.7',
                'name' => 'Finance',
                'order_no' => 7,
            ],
            [
                'code' => '1.8',
                'name' => 'Accreditation & Certification',
                'order_no' => 8,
            ],
            [
                'code' => '2.1',
                'name' => 'Research Production, Dissemination, Utilization',
                'order_no' => 9,
            ],
            [
                'code' => '2.2',
                'name' => 'Knowledge Management',
                'order_no' => 10,
            ],
            [
                'code' => '2.3',
                'name' => 'Library',
                'order_no' => 11,
            ],
            [
                'code' => '3.1',
                'name' => 'Faculty',
                'order_no' => 12,
            ],
            [
                'code' => '3.2',
                'name' => 'Instruction',
                'order_no' => 13,
            ],
            [
                'code' => '3.3',
                'name' => 'Innovative Education',
                'order_no' => 14,
            ],
            [
                'code' => '3.4',
                'name' => 'Employability',
                'order_no' => 15,
            ],
            [
                'code' => '4.1',
                'name' => 'Community Extension',
                'order_no' => 16,
            ],
            [
                'code' => '4.2',
                'name' => 'Philippine Linkages',
                'order_no' => 17,
            ],
            [
                'code' => '4.3',
                'name' => 'International Linkages',
                'order_no' => 18,
            ],
            [
                'code' => '5.1',
                'name' => 'PR and Marketing',
                'order_no' => 19,
            ],
            [
                'code' => '5.2',
                'name' => 'Customer Feedback',
                'order_no' => 20,
            ],
            [
                'code' => '5.3',
                'name' => 'Guidance & Counseling',
                'order_no' => 21,
            ],
            [
                'code' => '5.4',
                'name' => 'Student Development & Discipline',
                'order_no' => 22,
            ],
            [
                'code' => '5.5',
                'name' => 'Gender and Development Program',
                'order_no' => 23,
            ],
            [
                'code' => '5.6',
                'name' => 'Sports Development',
                'order_no' => 24,
            ],
            [
                'code' => '5.7',
                'name' => 'Arts & Culture Development',
                'order_no' => 25,
            ],
            [
                'code' => '5.8',
                'name' => 'Alumni Relations',
                'order_no' => 26,
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