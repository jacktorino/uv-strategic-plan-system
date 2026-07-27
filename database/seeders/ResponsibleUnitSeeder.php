<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ResponsibleUnit\Units;

class ResponsibleUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = [

            // Academic Colleges
            [
                'code' => 'CAHS',
                'name' => 'College of Allied Health Sciences',
                'category' => 'Academic College',
                'order_no' => 1,
            ],
            [
                'code' => 'CAS',
                'name' => 'College of Arts and Sciences',
                'category' => 'Academic College',
                'order_no' => 2,
            ],
            [
                'code' => 'CBA',
                'name' => 'College of Business Administration',
                'category' => 'Academic College',
                'order_no' => 3,
            ],
            [
                'code' => 'CCJE',
                'name' => 'College of Criminal Justice Education',
                'category' => 'Academic College',
                'order_no' => 4,
            ],
            [
                'code' => 'COED',
                'name' => 'College of Education',
                'category' => 'Academic College',
                'order_no' => 5,
            ],
            [
                'code' => 'CETA',
                'name' => 'College of Engineering, Technology and Architecture',
                'category' => 'Academic College',
                'order_no' => 6,
            ],
            [
                'code' => 'COME',
                'name' => 'College of Maritime Education',
                'category' => 'Academic College',
                'order_no' => 7,
            ],
            [
                'code' => 'GLS',
                'name' => 'Graduate and Law School',
                'category' => 'Academic College',
                'order_no' => 8,
            ],

            // Administrative & Support Offices
            [
                'code' => 'CPAD',
                'name' => 'Center for Planning and Development',
                'category' => 'Administrative Office',
                'order_no' => 9,
            ],
            [
                'code' => 'QMSO',
                'name' => 'Quality Management Systems Office',
                'category' => 'Administrative Office',
                'order_no' => 10,
            ],
            [
                'code' => 'FMD',
                'name' => 'Facilities Management Department',
                'category' => 'Administrative Office',
                'order_no' => 11,
            ],
            [
                'code' => 'ICTD',
                'name' => 'Information and Communications Technology Department',
                'category' => 'Administrative Office',
                'order_no' => 12,
            ],
            [
                'code' => 'FAD',
                'name' => 'Finance and Accounting Department',
                'category' => 'Administrative Office',
                'order_no' => 13,
            ],
            [
                'code' => 'HRD',
                'name' => 'Human Resource Department',
                'category' => 'Administrative Office',
                'order_no' => 14,
            ],
            [
                'code' => 'CRI',
                'name' => 'Center for Research and Innovation',
                'category' => 'Administrative Office',
                'order_no' => 15,
            ],
            [
                'code' => 'COMEX',
                'name' => 'Community Extension Office',
                'category' => 'Administrative Office',
                'order_no' => 16,
            ],
            [
                'code' => 'IAD',
                'name' => 'Internal Audit Department',
                'category' => 'Administrative Office',
                'order_no' => 17,
            ],
            [
                'code' => 'SASC',
                'name' => 'Student Affairs and Services Center',
                'category' => 'Administrative Office',
                'order_no' => 18,
            ],
            [
                'code' => 'ARC',
                'name' => 'Alumni Relations Center',
                'category' => 'Administrative Office',
                'order_no' => 19,
            ],
            [
                'code' => 'ACD',
                'name' => 'Academic Curriculum Development',
                'category' => 'Administrative Office',
                'order_no' => 20,
            ],
            [
                'code' => 'DPIA',
                'name' => 'Data Privacy and Information Assurance',
                'category' => 'Administrative Office',
                'order_no' => 21,
            ],
            [
                'code' => 'IQA',
                'name' => 'Institutional Quality Assurance',
                'category' => 'Administrative Office',
                'order_no' => 22,
            ],
            [
                'code' => 'CPARC',
                'name' => 'Center for Planning, Assessment and Research Coordination',
                'category' => 'Administrative Office',
                'order_no' => 23,
            ],

            // Academic Support Units
            [
                'code' => 'SRMD',
                'name' => 'Student Records Management Division',
                'category' => 'Academic Support Unit',
                'order_no' => 24,
            ],
            [
                'code' => 'SSD',
                'name' => 'Student Services Division',
                'category' => 'Academic Support Unit',
                'order_no' => 25,
            ],
            [
                'code' => 'CTESD',
                'name' => 'Center for Teaching Excellence and Staff Development',
                'category' => 'Academic Support Unit',
                'order_no' => 26,
            ],

            // Satellite Campuses
            [
                'code' => 'PARDO',
                'name' => 'Pardo Campus',
                'category' => 'Satellite Campus',
                'order_no' => 27,
            ],
            [
                'code' => 'COMPOSTELA',
                'name' => 'Compostela Campus',
                'category' => 'Satellite Campus',
                'order_no' => 28,
            ],
            [
                'code' => 'MINGLANILLA',
                'name' => 'Minglanilla Campus',
                'category' => 'Satellite Campus',
                'order_no' => 29,
            ],
            [
                'code' => 'TOLEDO',
                'name' => 'Toledo Campus',
                'category' => 'Satellite Campus',
                'order_no' => 30,
            ],
            [
                'code' => 'DALAGUETE',
                'name' => 'Dalaguete Campus',
                'category' => 'Satellite Campus',
                'order_no' => 31,
            ],
        ];

        foreach ($units as $unit) {
            Units::updateOrCreate(
                ['code' => $unit['code']],
                $unit
            );
        }
    }
}