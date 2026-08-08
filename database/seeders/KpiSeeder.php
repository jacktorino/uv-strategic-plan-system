<?php

namespace Database\Seeders;

use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\Kra;

use Illuminate\Database\Seeder;

class KpiSeeder extends Seeder
{
    /**
     * KPI data grouped by KRA code (matches KraSeeder codes).
     * Each entry: [code, name]
     */
    protected function data(): array
    {
        return [
            '1.1' => [
                ['1.1.1', 'Deployment and dissemination of VMO, Quality Management System in all units'],
                ['1.1.2', 'Alignment and dissemination of 17 UN Sustainable Development Goals in all university operations'],
                ['1.1.3', '100% of Senior Leaders and other stakeholders participate in the Quality Assurance Review and Planning'],
                ['1.1.4', 'Compliance with the National Privacy Commission requirements'],
            ],
            '1.2' => [
                ['1.2.1', '100% involvement of all senior leaders in University Committee Leadership/Memberships'],
                ['1.2.2', '100% involvement in 5S program'],
                ['1.2.3', '100% involvement of all employees in the Quality Circles'],
            ],
            '1.3' => [
                ['1.3.1', '100% participation in university-wide learning and development program'],
                ['1.3.2', '100% academic development participation in unit faculty program'],
            ],
            '1.4' => [
                ['1.4.1', '100% deployment of internal and external communication guidelines/protocols'],
            ],
            '1.5' => [
                ['1.5.1', '100% completion in crafting the 3-year campus development plan'],
                ['1.5.2', 'Implementation of the 3-year campus development plan'],
            ],
            '1.6' => [
                ['1.6.1', '100% up to date, innovative and user friendly, functional website and automation systems'],
                ['1.6.2', '100% improvement of ICT network infrastructure capability'],
            ],
            '1.7' => [
                ['1.7.1', 'Increase accounts Receivable collection efficiency to 98%'],
                ['1.7.2', 'Zero complain from students of late posting or unposted online payments every day'],
                ['1.7.3', 'Utilization of resources based on approved budget for all units'],
            ],
            '1.8' => [
                ['1.8.1', '100% Compliance with Institutional Sustainability Assessment (ISA) Standards'],
                ['1.8.2', '100% Compliance with Autonomous Standards'],
                ['1.8.3', '100% Compliance to PACUCOA Accreditation standards for all programs'],
                ['1.8.4', '100% compliance with CHED COD/COE standard'],
                ['1.8.5', '100% Compliance to International accreditation standards'],
                ['1.8.6', '100% Compliance with ISO 9001:2015 version by AY 2023-2026'],
                ['1.8.7', '100% Compliance to National Competency Certification'],
            ],
            '2.1' => [
                ['2.1.1', 'Full time faculty personnel are engaged in research'],
                ['2.1.2', 'At least one research capacity and capability building per college per semester'],
                ['2.1.3', 'One research journal per college per academic year'],
                ['2.1.4', 'At least two research-based science and technology applied for patent and/or at least four utility models'],
                ['2.1.5', 'At least one (1) research output from Non-Teaching Personnel per unit'],
                ['2.1.6', 'Utilize tracer study results yearly per academic unit'],
                ['2.1.7', 'Thesis/dissertation are IMRAD-ready'],
            ],
            '2.2' => [
                ['2.2.1', '100% deployment of knowledge management system, measurement and analysis'],
            ],
            '2.3' => [
                ['2.3.1', '30% print acquisitions within AY 2023-2026'],
                ['2.3.2', '70% non-print acquisitions within the AY 2023-2026'],
                ['2.3.3', '100% information dissemination and accessibility of academic resources, print & non-print'],
                ['2.3.4', '100% of Full-time faculty accessed and utilized the academic resources per month'],
                ['2.3.5', 'Students accessed and utilized the academic resources per month within the AY 2023-2026'],
                ['2.3.6', 'Non-Teaching personnel should borrow and read at least one book per month'],
                ['2.3.7', 'At least one recipient per department per semester for the top academic resources borrower award (faculty, non-teaching, students)'],
            ],
            '3.1' => [
                ['3.1.1', 'Full Time faculty members will have the required qualifications/minimum academic qualifications'],
                ['3.1.2', '90% of the faculty meets a performance rating of at least 4.51'],
                ['3.1.3', 'Full-time faculty are members of relevant professional organizations'],
                ['3.1.4', 'At least one class section advisership every semester'],
                ['3.1.5', 'Deployment of Ranking, Tenureship & Promotion'],
            ],
            '3.2' => [
                ['3.2.1', 'Compliance with 100% Curriculum Validation every semester'],
                ['3.2.2', '100% compliance with Curriculum Evaluation every four/five years'],
                ['3.2.3', 'Compliance to selective retention guidelines'],
                ['3.2.4', 'Above national passing percentage for all licensure/bar exams for 1st time takers'],
                ['3.2.5', 'Deployment of at least one external certification per program for faculty'],
                ['3.2.6', 'Integration of One NC per program'],
                ['3.2.7', 'Organize student Quality Circles in all year levels'],
                ['3.2.8', '3rd year students should take sub-professional and professional Civil Service examinations'],
                ['3.2.9', 'Faculty Members should acquire score of C1 in the International English Language Certification'],
                ['3.2.10', 'Students should acquire score of B1 in the International English Language Certification'],
            ],
            '3.3' => [
                ['3.3.1', '100% implementation of the E-learning program/roadmap'],
            ],
            '3.4' => [
                ['3.4.1', 'Graduates are engaged in gainful activities and professional development within 12-months after graduation'],
                ['3.4.2', 'Establish at least 2 industry partners per semester/program'],
                ['3.4.3', 'Conduct the annual tracer study'],
            ],
            '4.1' => [
                ['4.1.1', '100% sectoral representation in community extension programs'],
                ['4.1.2', 'Conduct at least 2 full researches per academic unit and at least one from the non-teaching personnel'],
                ['4.1.3', 'Involvement and participation in the environmental protection and preservation'],
                ['4.1.4', 'Sustain the Community Tutorial program; expansion to other 6 sitios by 2nd semester AY 2023-2024'],
                ['4.1.5', '100% implementation, involvement and participation from all colleges/departments during AY 2023-2026'],
            ],
            '4.2' => [
                ['4.2.1', 'At least one active partnership with government, industry or NGO per academic unit every semester'],
            ],
            '4.3' => [
                ['4.3.1', 'At least one active partnership with international university per academic unit per semester'],
                ['4.3.2', 'At least 1 faculty exchange per academic unit for academic year 2024-2025'],
                ['4.3.3', 'At least 2 student exchange programs per academic unit for academic year 2024-2025'],
                ['4.3.4', 'At least 1 collaborative Research Activity/Colloquium Activities (Production, Publication, Presentation, Utilization)'],
                ['4.3.5', 'At least 50 admissions of Foreign Students enrolled in any academic program for academic year 2024-2025'],
            ],
            '5.1' => [
                ['5.1.1a', 'At least 300 freshmen students for colleges with single program offering (CCJE)'],
                ['5.1.1b', 'At least 500 freshmen students for colleges with two to three program offerings, min. 50 students/program (CAHS, COME)'],
                ['5.1.1c', 'At least 600 freshmen students for colleges with more than three program offerings, min. 50 students/program (CAS, CBA, COED, CETA)'],
                ['5.1.1d', 'At least 100 freshmen students for JD'],
                ['5.1.1e', 'At least 600 Grade 11 students with at least 50 students/track'],
                ['5.1.2', "Achieve at least 80% students' retention"],
                ['5.1.3', 'Submission of College Marketing Plan'],
                ['5.1.4', 'Deployment of the university campaign advertisement materials per semester'],
                ['5.1.5', 'Five (5) signed MOA per Academic Year with the feeder school'],
            ],
            '5.2' => [
                ['5.2.1', 'Deployment of the Best Innovative Procedures Award (BIPA) and customer feedback mechanism in all units'],
                ['5.2.2', 'Response to customer feedback within seven days'],
            ],
            '5.3' => [
                ['5.3.1', 'Deployment of counseling program'],
            ],
            '5.4' => [
                ['5.4.1', 'Deployment of student planned extracurricular activities'],
                ['5.4.3', '2% decrease of student violations'],
            ],
            '5.5' => [
                ['5.5.1', 'Deployment of the Gender and Development program'],
            ],
            '5.6' => [
                ['5.6.1', '100% involvement in intramural and extramural activities'],
            ],
            '5.7' => [
                ['5.7.1', 'Organize at least one NTPIF/Faculty/Student arts and culture program per semester'],
            ],
            '5.8' => [
                ['5.8.1', 'Strengthen alumni chapter in all academic units'],
                ['5.8.2', 'Organize university wide Alumni Homecoming/Reunion every year'],
            ],
        ];
    }

   public function run(): void
    {
        foreach ($this->data() as $subKraCode => $kpis) {
            $subkra = \App\Models\SubKeyResultsArea\SubKra::where('code', $subKraCode)->first();

            if (! $subkra) {
                $this->command?->warn("Sub-KRA {$subKraCode} not found, skipping its KPIs.");
                continue;
            }

            foreach ($kpis as $order => [$code, $name]) {
                Kpi::updateOrCreate(
                    ['code' => $code],
                    [
                        'subkra_id' => $subkra->id,
                        'name' => $name,
                        'order_no' => $order + 1,
                    ]
                );
            }
        }
    }
}