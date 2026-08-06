<?php

namespace Database\Seeders;

 // Adjust namespace to match your actual Kpi model location
 // Adjust namespace to match your actual ActionPlan model location
 // Adjust namespace to match your actual ActionPlanAssignment model location

use App\Models\Assignment\ActionPlanAssignment;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\ResponsibleUnit\Units;
use Illuminate\Database\Seeder;


class ActionPlanSeeder extends Seeder
{
    /**
     * Pseudo-codes used in the raw data below, expanded at runtime against
     * the `units` table (see resolveUnitIds()).
     */
    private const ALL_ACADEMIC = '@ALL_ACADEMIC';   // every 'Academic Units' category unit
    private const ALL_NONACADEMIC = '@ALL_NONACADEMIC'; // every 'Non-Academic Units' category unit

    /**
     * Aliases used in the source document that don't exactly match
     * ResponsibleUnitSeeder codes. Anything not listed here (and not
     * found directly) is skipped, with a warning, rather than failing.
     */
    private const UNIT_ALIASES = [
        'QMS' => 'QMSO',
        'DPO' => 'DPIA',
        'ALUMNI' => 'ARC',
        'ALUMNI AFFAIRS' => 'ARC',
        'UVAAI' => 'ARC',
    ];

    /**
     * Action plan data grouped by KPI code (matches KpiSeeder codes).
     * Each entry: [description, [unit codes / pseudo-codes]]
     */
    protected function data(): array
    {
        $ACAD = self::ALL_ACADEMIC;
        $NONACAD = self::ALL_NONACADEMIC;

        return [
            '1.1.1' => [
                ['Upload the VMO in the website, official social media accounts, and post in conspicuous places/areas in the University Campuses.', ['CPAD', 'QMS', 'FMD']],
                ['Upload the PQF Levels 6-8 Descriptors and the UV Institutional Learning Outcomes in the website, official social media accounts, and post in conspicuous places/areas in the University Campuses.', [$ACAD]],
                ['Integrate in the course syllabi and activities of all programs across campuses, colleges and units.', [$ACAD]],
                ["Integration in all classes' orientation and recitation in all units' regular meetings.", [$ACAD]],
            ],
            '1.1.2' => [
                ['Upload the 17 UNSDG in the website, official social media accounts, and post in conspicuous places/areas in the University Campuses.', ['CPAD', 'QMS', 'FMD']],
                ['Integrate in the course syllabi and activities of all programs across campuses, colleges and units.', [$ACAD]],
                ["Integration in all classes' orientation and recitation in all units' regular meetings.", [$ACAD]],
            ],
            '1.1.3' => [
                ["Senior leaders and stakeholders participate actively in the scheduled Quality Assurance Review and Planning towards continuous improvement and stakeholder's satisfaction.", [$ACAD, $NONACAD]],
                ['Regularly recognize the valuable contribution of the stakeholders.', [$ACAD, $NONACAD]],
            ],
            '1.1.4' => [
                ['Undertake audit procedures on data privacy.', [$ACAD, $NONACAD, 'DPO']],
                ['Implement Awareness Program for employees to improve privacy knowledge, skills, attitude, and behavior.', [$ACAD, $NONACAD, 'DPO']],
                ["Install much-needed security software's to protect data on all devices used in the University and its satellite campuses.", ['ICTD', 'FAD']],
            ],
            '1.2.1' => [
                ['Senior Leaders should chair/vice chair/member of at least one (1) university/college committee.', [$ACAD, $NONACAD]],
                ['Ensure continuity of involvement in university committee leaderships/memberships by assigning assistants or associates to every senior leader occupying chairmanship positions in various committees.', [$ACAD, $NONACAD]],
            ],
            '1.2.2' => [
                ['Conduct periodic implementation audit of 5S in the different units across all campuses.', [$ACAD, $NONACAD]],
                ['Conduct Capacity-Building for 5S Implementers.', [$ACAD, $NONACAD]],
            ],
            '1.2.3' => [
                ['Organize and orient employees on the policies and procedures of the University Quality Circles.', [$ACAD, $NONACAD]],
                ['Deployment of the policies and procedures of the University Quality Circles.', [$ACAD, $NONACAD]],
            ],
            '1.3.1' => [
                ['Conduct training needs assessment as a basis in crafting the learning and development program for non-teaching.', ['HRD']],
                ['Attend and complete at least one online training/webinar aligned to the job function.', [$NONACAD]],
            ],
            '1.3.2' => [
                ['Conduct training assessment as basis for crafting of the development program needs in the faculty.', [$ACAD, 'HRD']],
                ['Attendance to at least one online training or webinar aligned to the field of specialization.', [$ACAD]],
                ['Include Faculty Immersion program and have it implemented during Special Period.', [$ACAD, 'HRD']],
            ],
            '1.4.1' => [
                ['Efficient and regular use of corporate emails and online systems in inter-office communication by customizing Office 365 features and applications for a secured and reliable communication process.', ['CPAD', $ACAD, $NONACAD]],
                ['Establish a contingency communication plan with due consideration on security for unexpected challenges.', ['CPAD', $ACAD, $NONACAD]],
            ],
            '1.5.1' => [
                ['Prepare a campus development plan.', ['FMD']],
            ],
            '1.5.2' => [
                ['Monitoring of the campus development plan implementation.', ['FMD']],
            ],
            '1.6.1' => [
                ['Maintain regularly an updated website and automation system.', ['ICTD', 'CPAD', $ACAD]],
            ],
            '1.6.2' => [
                ['Maintain regularly an upgraded IT infrastructure.', ['ICTD', 'FAD']],
                ["Install much-needed security software's to protect data on all devices used in the University and its satellite campuses.", ['ICTD', 'FAD', $ACAD, $NONACAD]],
                ['Host secured systems over the cloud.', ['ICTD', 'FAD', $ACAD, $NONACAD]],
            ],
            '1.7.1' => [
                ['Efficient deployment of cashless payment scheme.', ['FAD', $ACAD]],
                ["Close monitoring of students' accounts and consistent reminders to students.", ['FAD']],
                ['Strengthen partnership/linkages with financing intermediaries who could offer educational loans to students.', ['FAD']],
                ['Integrate the available payment channels in the Enrolment system.', ['FAD', 'ICTD']],
                ['Create a University Communication System to update students on their school fees.', ['FAD', 'ICTD', $ACAD]],
            ],
            '1.7.2' => [
                ['Monitor daily status report of online collections to ensure on time and accurate posting of student online payments.', ['FAD', 'ICTD']],
            ],
            '1.7.3' => [
                ['Monitoring of the actual expenditures versus approved budget.', ['FAD', $ACAD, $NONACAD]],
                ['Create and integrate the purchasing system to the existing accounting system (Ledgea).', ['FAD', 'ICTD']],
                ['Submission of weekly Purchase monitoring sheet to track status of request.', ['FAD', $ACAD, $NONACAD]],
            ],
            '1.8.1' => [
                ['Regular review of compliance to standards and submit action plan to address gaps.', ['QMSO', $ACAD]],
            ],
            '1.8.2' => [
                ['Regular review of compliance to standards and submit action plan to address gaps.', ['QMSO', $ACAD]],
            ],
            '1.8.3' => [
                ['Compliance to standards and submit action plan to address gaps.', [$ACAD, 'QMSO']],
            ],
            '1.8.4' => [
                ['Regular review of compliance to standards and submit action plan to address gaps.', [$ACAD, 'QMSO']],
            ],
            '1.8.5' => [
                ['All quality circles to review requirements and submit action plans to address gaps.', [$ACAD, 'QMSO']],
            ],
            '1.8.6' => [
                ['Monitoring, review and evaluation on the compliance to ISO 9001:2015 standards.', ['QMSO', $ACAD, $NONACAD]],
            ],
            '1.8.7' => [
                ['Identify, train and capacitate faculty members to take the assessments to TESDA qualify assessors.', [$ACAD]],
            ],
            '2.1.1' => [
                ['Creation of a core team among research coordinators, teaching and non-teaching personnel.', ['CRI', $ACAD, $NONACAD]],
                ['Conduct weekly research didactics for the faculty.', ['CRI', $ACAD]],
            ],
            '2.1.2' => [
                ["Conduct Discipline-Specific Research Capability Trainings and Workshops per Semester for every College/Program including non-teaching staff, based on the results of the needs assessment survey.", ['CRI', $ACAD]],
                ['Produce outputs which use NETNOGRAPHY research design and big data analysis.', ['CRI', $ACAD]],
            ],
            '2.1.3' => [
                ['Publish research outputs in the college research journal.', ['CRI', $ACAD]],
            ],
            '2.1.4' => [
                ['Forge collaboration researches among different disciplines in the university.', ['CRI', $ACAD]],
            ],
            '2.1.5' => [
                ['Conduct a training and workshop on writing a publishable format research.', ['CRI', $NONACAD]],
            ],
            '2.1.6' => [
                ['Innovate curricula and improve learning outcomes and graduate competencies.', [$ACAD]],
            ],
            '2.1.7' => [
                ['Modify thesis/dissertation format to become IMRAD-ready.', ['CRI', $ACAD]],
            ],
            '2.2.1' => [
                ['Prepare a Knowledge Management Manual containing forms and SOPPs based on the listed processes and procedures.', [$ACAD, 'HRD']],
                ['Deployment of Knowledge Management System activities per unit.', [$ACAD, 'HRD']],
                ['Include KM System in the scheduled re-orientation program.', [$ACAD, 'HRD']],
                ['Include KPI of Knowledge Management in the Performance Evaluation per unit.', [$ACAD, 'HRD']],
                ['Introduce knowledge management programs to the Visayanian community through exposure of programs to e-media channels.', [$ACAD, 'HRD']],
            ],
            '2.3.1' => [
                ['Beef up collections of printed resources in collaboration with the academic units.', [$ACAD, 'ARC']],
            ],
            '2.3.2' => [
                ['Improve collections of relevant electronic resources by participating in consortium with other universities.', [$ACAD, 'ARC']],
            ],
            '2.3.3' => [
                ['Integrate the library management system in the university website.', ['ICTD', 'CPAD', 'ARC']],
                ['Create infographics (digital library guides) to encourage all faculty and students to fully maximize the utilization of all library resources and services.', ['ARC']],
            ],
            '2.3.4' => [
                ['Require all full-time faculty to borrow at least two books per month and access the e-learning resources through the library management system.', [$ACAD, 'ARC']],
            ],
            '2.3.5' => [
                ['Require all students to borrow at least two books per month and access the e-learning resources through the library management system.', [$ACAD, 'ARC']],
            ],
            '2.3.6' => [
                ['Require the non-teaching personnel to visit the ARC and/or access the library management system and utilize the available resources.', [$NONACAD, 'ARC']],
            ],
            '2.3.7' => [
                ['Set criteria for the recognition and prepare a monitoring matrix on ARC resources utilization.', ['ARC']],
            ],
            '3.1.1' => [
                ['Strictly comply with the CHED minimum academic qualifications in hiring personnel for academic positions.', ['HRD', $ACAD]],
                ['Encourage the academic personnel to avail of the educational scholarship.', ['HRD', $ACAD]],
                ['Craft a 5-year faculty development plan and monitor its implementation.', ['HRD', $ACAD]],
            ],
            '3.1.2' => [
                ['Regularly evaluate the faculty using the revised/updated performance evaluation tool.', ['HRD', $ACAD]],
                ['Automated Faculty Evaluation System integrated with the Student Portal.', ['HRD', $ACAD]],
            ],
            '3.1.3' => [
                ['Require all full-time faculty to be involved as a member or officer in a professional organization aligned to their discipline.', [$ACAD]],
            ],
            '3.1.4' => [
                ['Homeroom organization in regular classes.', [$ACAD]],
            ],
            '3.1.5' => [
                ['Faculty respond to the call for ranking, send application, and submit required evidence for ranking.', ['HRD', $ACAD]],
            ],
            '3.2.1' => [
                ['Prepare a curriculum validation policy.', [$ACAD]],
                ['Conduct a curriculum validation before the end of each semester.', [$ACAD]],
                ['Develop an automated system embedded in the UV ACCESS LMS as part of course compliance.', [$ACAD]],
            ],
            '3.2.2' => [
                ['Conduct a curriculum evaluation every four or five years.', [$ACAD]],
                ['Conduct seminar/workshop/training for all prospective participants (IAAC members) on the conduct of curriculum review and evaluation.', [$ACAD]],
            ],
            '3.2.3' => [
                ['Prepare selective retention policies for all programs.', [$ACAD]],
                ['Ensure compliance to selective retention policies in all programs.', [$ACAD]],
                ["Integrate the retention policy of each program into the University website.", [$ACAD]],
            ],
            '3.2.4' => [
                ['Deployment of board exam prep policy.', [$ACAD]],
            ],
            '3.2.5' => [
                ['Capacitate and train faculty to deliver external certification programs.', [$ACAD]],
                ['Establish partnerships with agencies/institutions providing certification programs.', [$ACAD]],
            ],
            '3.2.6' => [
                ['Verify with TESDA available NC programs aligned to the programs offered.', [$ACAD]],
            ],
            '3.2.7' => [
                ["Identify students who will compose the quality circle per college/per year level and organize them according to the Students' Quality Circle policy.", [$ACAD]],
            ],
            '3.2.8' => [
                ['Orient students on the types of civil service exam and career advancement in terms of qualification.', [$ACAD]],
                ['Facilitate application for the civil service examination via both Pencil and Paper Test and Computer Based Examination.', [$ACAD]],
            ],
            '3.2.9' => [
                ['Prepare an intervention program across all academic units.', [$ACAD]],
            ],
            '3.2.10' => [
                ['Prepare an intervention program across all year levels.', [$ACAD]],
            ],
            '3.3.1' => [
                ['Develop an Online Course Module per program per College in Office 365 and Open LMS.', [$ACAD]],
                ['Develop a Hyflex Learning Strategy in all colleges.', [$ACAD]],
                ['Provide professional development training courses on ICT for faculty and staff (e.g. AI, KM, IoT, data science).', [$ACAD]],
                ['Retool for integration of MS Teams in the LMS (UV ACCESS).', [$ACAD]],
                ['Establish strategic partnerships with technology companies through MOA and MOU.', [$ACAD]],
                ['Integrate AI/Robotics in all courses.', [$ACAD]],
            ],
            '3.4.1' => [
                ['Monitor graduates to document their employment, engagement in entrepreneurial activities, or pursuit of further studies.', ['CPAD', $ACAD]],
                ['Provide incentives to encourage graduates to give feedback when they get a job after graduation.', ['CPAD', $ACAD]],
                ['Conduct a regular job fair in collaboration with industry partners and document those hired on the spot.', ['CPAD', $ACAD]],
            ],
            '3.4.2' => [
                ['Identify local and international companies and start networking for partnerships.', ['CPAD', 'IAD', $ACAD]],
                ['Build collaborative programs that are mutually beneficial to industry and the college/university.', ['CPAD', 'IAD', $ACAD]],
            ],
            '3.4.3' => [
                ['Initiate the conduct of the annual graduate tracer studies.', ['CPAD', 'CRI', $ACAD]],
                ['Collaborate with the colleges and alumni affairs in the deployment of the graduate tracer survey questionnaire.', ['CPAD', 'CRI', $ACAD]],
                ['Utilize data gathered from the tracer study and convert it into a research paper in coordination with CRI.', ['CPAD', 'CRI', $ACAD]],
                ['Cascade results to the colleges as input to improve programs.', ['CPAD', 'CRI', $ACAD]],
            ],
            '4.1.1' => [
                ['Involvement of all stakeholders.', ['COMEX', $ACAD, $NONACAD]],
            ],
            '4.1.2' => [
                ['Conduct at least one (1) extension program from these researches.', ['COMEX', $ACAD, $NONACAD, 'CRI']],
            ],
            '4.1.3' => [
                ['Develop programs related to Environment Protection and Conservation.', ['COMEX', $ACAD, $NONACAD, 'CRI']],
            ],
            '4.1.4' => [
                ['Sustain the community tutorial and expand to other surrounding communities.', ['COMEX', $ACAD, $NONACAD]],
            ],
            '4.1.5' => [
                ['Participation of the COMEX representative, faculty and student representatives per program, and the college dean from planning to evaluation.', ['COMEX', $ACAD, $NONACAD]],
                ['Posting of COMEX activities on the UV FB page and website.', ['COMEX', 'CPAD']],
            ],
            '4.2.1' => [
                ['Document all networking with national and regional organizations by all academic units.', ['COMEX', $ACAD]],
            ],
            '4.3.1' => [
                ['Document all networking with international organizations by all academic units.', ['COMEX', $ACAD]],
            ],
            '4.3.2' => [
                ['Deployment of activities stipulated in the MOA/MOU.', ['IAD', $ACAD]],
            ],
            '4.3.3' => [
                ['Deployment of activities stipulated in the MOA/MOU.', ['IAD', $ACAD]],
            ],
            '4.3.4' => [
                ['Deployment of activities stipulated in the MOA/MOU.', ['IAD', $ACAD]],
            ],
            '4.3.5' => [
                ['Produce at least one campaign for each type (commercial, reputation, education/awareness, social action) per semester.', ['IAD', $ACAD]],
                ['Develop at least one campaign per semester intended for the international market.', ['IAD', $ACAD]],
            ],
            '5.1.1a' => [
                ['Conduct FGD as one of the tools to get feedback and inputs.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Increase field marketing campaign to private academic institutions.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create more page engagement on Facebook on a daily/weekly basis and expand to other social media for advertisement and promotion.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create an enhanced "enroll now, pay later" scheme and sponsorship programs to help students pursue their studies.', ['CPAD', $ACAD, 'SASC', 'CRI']],
            ],
            '5.1.1b' => [
                ['Conduct FGD as one of the tools to get feedback and inputs.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Increase field marketing campaign to private academic institutions.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create more page engagement on Facebook on a daily/weekly basis and expand to other social media for advertisement and promotion.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create an enhanced "enroll now, pay later" scheme and sponsorship programs to help students pursue their studies.', ['CPAD', $ACAD, 'SASC', 'CRI']],
            ],
            '5.1.1c' => [
                ['Conduct FGD as one of the tools to get feedback and inputs.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Increase field marketing campaign to private academic institutions.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create more page engagement on Facebook on a daily/weekly basis and expand to other social media for advertisement and promotion.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create an enhanced "enroll now, pay later" scheme and sponsorship programs to help students pursue their studies.', ['CPAD', $ACAD, 'SASC', 'CRI']],
            ],
            '5.1.1d' => [
                ['Conduct FGD as one of the tools to get feedback and inputs.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Increase field marketing campaign to private academic institutions.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create more page engagement on Facebook on a daily/weekly basis and expand to other social media for advertisement and promotion.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create an enhanced "enroll now, pay later" scheme and sponsorship programs to help students pursue their studies.', ['CPAD', $ACAD, 'SASC', 'CRI']],
            ],
            '5.1.1e' => [
                ['Conduct FGD as one of the tools to get feedback and inputs.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Increase field marketing campaign to private academic institutions.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create more page engagement on Facebook on a daily/weekly basis and expand to other social media for advertisement and promotion.', ['CPAD', $ACAD, 'SASC', 'CRI']],
                ['Create an enhanced "enroll now, pay later" scheme and sponsorship programs to help students pursue their studies.', ['CPAD', $ACAD, 'SASC', 'CRI']],
            ],
            '5.1.2' => [
                ["Implement JRG's \"Himunga-an System\".", [$ACAD]],
                ["Strengthen students' academic advising.", [$ACAD]],
                ["Sustain students' positive experiences through exceptional customer service across all units.", [$NONACAD]],
            ],
            '5.1.3' => [
                ['Conduct webinars and prepare the Marketing Plan.', ['CPAD', $ACAD]],
            ],
            '5.1.4' => [
                ['Produce at least one campaign for each type (commercial, reputation, education/awareness, social action) per semester.', ['CPAD', $ACAD]],
                ['Develop at least one campaign per semester intended for the international market.', ['CPAD', $ACAD]],
            ],
            '5.1.5' => [
                ['Seal at least five (5) Feeder School Partnerships per academic year.', ['CPAD', $ACAD]],
            ],
            '5.2.1' => [
                ['Strengthen the feedback system through the university online portal and other mechanisms for stakeholders to convey service satisfaction and experiences.', ['CPAD', $ACAD, $NONACAD, 'SASC']],
            ],
            '5.2.2' => [
                ['Maintain a timely feedback system through the university online portal and other mechanisms.', ['SASC', $ACAD]],
                ['Orient internal stakeholders on feedback mechanisms and the SOPPs on Customer Feedback Facilitation.', ['SASC', $ACAD]],
                ['Create a customer feedback committee comprising employees from Academic units, Support Service Offices, and the SSC President.', ['SASC', $ACAD]],
            ],
            '5.3.1' => [
                ['Sustain implementation of the Guidance and Counseling program through the Flexible Deployment Program.', ['SASC', $ACAD]],
                ['Link with private or government agencies offering Psychological Assessment, Debriefing, and Medical Assistance, and refer students with special needs to specialists.', ['SASC', $ACAD]],
                ['Partner with industries or companies on the deployment of CIP.', ['SASC', $ACAD]],
                ['Implement a peer counseling program.', ['SASC', $ACAD]],
            ],
            '5.4.1' => [
                ['Participate in inter-school competitions that give students the opportunity to exhibit their talents and potential.', ['SASC', $ACAD]],
            ],
            '5.4.3' => [
                ['Develop a program plan on student discipline that addresses the challenges of the new normal.', ['SASC', $ACAD]],
                ["Sustain the monitoring mechanism for student behavioral concerns.", ['SASC', $ACAD]],
                ["Conduct regular awareness drives on the digital mechanisms for monitoring students' behavior.", ['SASC', $ACAD]],
            ],
            '5.5.1' => [
                ["Create gender-inclusive teaching materials and resources to enhance classroom discussion.", [$ACAD, 'SASC']],
            ],
            '5.6.1' => [
                ["Organize sports leagues among system schools with the support of school linkages, and broadcast them on online platforms for a global audience.", ['SASC', $ACAD, 'COMEX', 'ACD']],
                ['Create Virtual Intramural activities for students and other stakeholders with the support of alumni and sponsors.', ['SASC', $ACAD, 'ACD', 'ARC']],
                ['Invite alumni and company representatives as resource speakers on fitness and sports-related webinars.', ['SASC', 'ACD', 'ARC']],
                ['Initiate, reconnect, and create linkages with former sponsors and alumni.', ['SASC', 'ACD', 'ARC']],
            ],
            '5.7.1' => [
                ['Create a Culture and Arts development program plan.', [$ACAD, $NONACAD, 'SASC']],
                ['Create a virtual platform for cultural and artistic performances and exhibitions.', [$ACAD, $NONACAD, 'ACD']],
                ['Create virtual and in-person cultural and artistic performances and exhibitions.', [$ACAD, $NONACAD, 'ACD']],
                ['Intensify the promotion of Arts and Culture activities by increasing social media engagement.', [$ACAD, $NONACAD, 'ACD']],
            ],
            '5.8.1' => [
                ['Create a chapter alumni development plan in all academic units.', [$ACAD, 'ARC']],
                ['Create an International Alumni Chapter.', [$ACAD, 'ARC']],
            ],
            '5.8.2' => [
                ['Conduct Alumni Homecoming/reunion activities.', ['ARC']],
            ],
        ];
    }

    public function run(): void
    {
        $academicIds = Units::where('category', 'Academic Units')->pluck('id')->all();
        $nonAcademicIds = Units::where('category', 'Non-Academic Units')->pluck('id')->all();
        $unitsByCode = Units::pluck('id', 'code')->all(); // code => id (as stored, uppercase expected)

        foreach ($this->data() as $kpiCode => $plans) {
            $kpi = Kpi::where('code', $kpiCode)->first();

            if (! $kpi) {
                $this->command?->warn("KPI {$kpiCode} not found, skipping its action plans.");
                continue;
            }

            foreach ($plans as $order => [$description, $unitTokens]) {
                $actionPlan = ActionPlan::updateOrCreate(
                    [
                        'kpi_id' => $kpi->id,
                        'order_no' => $order + 1,
                    ],
                    [
                        'description' => $description,
                    ]
                );

$period = \App\Models\ActionPlanPeriod::firstOrCreate(
    [
        'action_plan_id' => $actionPlan->id,
        'month' => now()->month,
        'year' => now()->year,
    ],
    [
        'period_start' => now()->startOfMonth(),

        'period_end' => now()->endOfMonth(),

        'submission_start' => now()
            ->copy()
            ->addMonth()
            ->startOfMonth(),

        'submission_deadline' => now()
            ->copy()
            ->addMonth()
            ->startOfMonth()
            ->addDays(5),

        'review_start' => now()
            ->copy()
            ->addMonth()
            ->startOfMonth(),

        'review_end' => now()
            ->copy()
            ->addMonth()
            ->startOfMonth()
            ->addDays(5),

        'approval_date' => now()
            ->copy()
            ->addMonth()
            ->startOfMonth()
            ->addDays(5),

        'status' => 'Open',
    ]
);

$unitIds = $this->resolveUnitIds(
    $unitTokens,
    $academicIds,
    $nonAcademicIds,
    $unitsByCode
);

foreach ($unitIds as $unitId) {

    ActionPlanAssignment::updateOrCreate(
        [
            'action_plan_period_id' => $period->id,
            'action_plan_id' => $actionPlan->id,
            'responsible_unit_id' => $unitId,
        ],
        [
            'progress_percentage' => 0,
            'status' => 'Not Yet Submitted',
        ]
    );
}





            }
        }
    }

    /**
     * Expand a list of unit codes / pseudo-codes into unique unit IDs,
     * resolving aliases and skipping anything not found in the units table.
     */
    private function resolveUnitIds(array $tokens, array $academicIds, array $nonAcademicIds, array $unitsByCode): array
    {
        $ids = [];

        foreach ($tokens as $token) {
            if ($token === self::ALL_ACADEMIC) {
                $ids = array_merge($ids, $academicIds);
                continue;
            }

            if ($token === self::ALL_NONACADEMIC) {
                $ids = array_merge($ids, $nonAcademicIds);
                continue;
            }

            $code = strtoupper(trim($token));
            $code = self::UNIT_ALIASES[$code] ?? $code;

            if (isset($unitsByCode[$code])) {
                $ids[] = $unitsByCode[$code];
            } else {
                $this->command?->warn("Responsible unit '{$token}' has no matching row in units table, skipping assignment.");
            }
        }

        return array_values(array_unique($ids));
    }
}