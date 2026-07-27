import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type KraRow = {
    id: number;
    keyResultArea: string;
    kpi: string;
    actionPlan: string;
    responsibleUnits: string;
    targets: {
        ay2023_2024: string;
        ay2024_2025: string;
        ay2025_2026: string;
    };
    status: string;
};

const kraData: KraRow[] = [
    // 1.1 Governance
    {
        id: 1,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.1 Deployment and dissemination of VMO, Quality Management System in all units',
        actionPlan:
            'Upload the VMO in the website, official social media accounts, and post in the conspicuous places/areas in the University Campuses.',
        responsibleUnits: 'CPAD, QMS, FMD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 2,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.1 Deployment and dissemination of VMO, Quality Management System in all units',
        actionPlan:
            'Upload the PQF Levels 6-8 Descriptors and the UV Institutional Learning Outcomes in the website, official social media accounts, and post in the conspicuous places/areas in the University Campuses.',
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 3,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.1 Deployment and dissemination of VMO, Quality Management System in all units',
        actionPlan:
            'Integrate in the course syllabi and activities of all programs across campuses, colleges and units.',
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 4,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.1 Deployment and dissemination of VMO, Quality Management System in all units',
        actionPlan:
            "Integration in all classes' orientation and recitation in all units' regular meetings.",
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 5,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.2 Alignment and dissemination of 17 UN Sustainable Development Goals in all university operations.',
        actionPlan:
            'Upload the 17 UNSDG in the website, official social media accounts, and post in the conspicuous places/areas in the University Campuses.',
        responsibleUnits: 'CPAD, QMS, FMD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 6,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.2 Alignment and dissemination of 17 UN Sustainable Development Goals in all university operations.',
        actionPlan:
            'Integrate in the course syllabi and activities of all programs across campuses, colleges and units.',
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 7,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.2 Alignment and dissemination of 17 UN Sustainable Development Goals in all university operations.',
        actionPlan:
            "Integration in all classes' orientation and recitation in all units' regular meetings.",
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 8,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.3 100% of Senior Leaders and other stakeholders participate in the Quality Assurance Review and Planning.',
        actionPlan:
            "Senior leaders and stakeholders participate actively in the scheduled Quality Assurance Review and Planning towards continuous improvement and stakeholder's satisfaction.",
        responsibleUnits: 'All Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 9,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.3 100% of Senior Leaders and other stakeholders participate in the Quality Assurance Review and Planning.',
        actionPlan:
            'Regularly recognize the valuable contribution of the stakeholders.',
        responsibleUnits: 'All Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 10,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.4 Compliance with the National Privacy Commission requirements',
        actionPlan: 'Undertake audit procedures on data privacy',
        responsibleUnits: 'All Academic & Non-Academic Units, DPO',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 11,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.4 Compliance with the National Privacy Commission requirements',
        actionPlan:
            'Implement Awareness Program for employees to improve privacy knowledge, skills, attitude, and behavior.',
        responsibleUnits: 'All Academic & Non-Academic Units, DPO',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 12,
        keyResultArea: '1.1 Governance',
        kpi: '1.1.4 Compliance with the National Privacy Commission requirements',
        actionPlan:
            "Install much-needed security software's to protect data on all devices used in the University and its satellite campuses.",
        responsibleUnits: 'ICTD, FAD, Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.2 Leadership
    {
        id: 13,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.1 100% involvement of all senior leaders in University Committee Leadership/Memberships',
        actionPlan:
            'Senior Leaders should chair/vice chair/member of at least one (1) university/college committee.',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 14,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.1 100% involvement of all senior leaders in University Committee Leadership/Memberships',
        actionPlan:
            'Ensure continuity of involvement in university committee leaderships memberships by assigning assistants or associates to every senior leader occupying chairmanship positions in various committees.',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 15,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.2 100% involvement in 5S program',
        actionPlan:
            'Conduct periodic implementation audit of 5S in the different units across all campuses.',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 16,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.2 100% involvement in 5S program',
        actionPlan: 'Conduct Capacity-Building for 5S Implementers',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 17,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.3 100% involvement of all employees in the Quality Circles',
        actionPlan:
            'Organize and orient employees on the policies and procedures of the University Quality Circles.',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 18,
        keyResultArea: '1.2 Leadership',
        kpi: '1.2.3 100% involvement of all employees in the Quality Circles',
        actionPlan:
            'Deployment of the policies and procedures of the University Quality Circles.',
        responsibleUnits: 'Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.3 Human Resources Learning and Development
    {
        id: 19,
        keyResultArea: '1.3 Human Resources Learning and Development',
        kpi: '1.3.1 100% participation in university-wide learning and development program',
        actionPlan:
            'Conduct training needs assessment as a basis in crafting the learning and development program for non-teaching.',
        responsibleUnits: 'HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 20,
        keyResultArea: '1.3 Human Resources Learning and Development',
        kpi: '1.3.1 100% participation in university-wide learning and development program',
        actionPlan:
            'Attend and complete at least one online training/webinar aligned to the job function.',
        responsibleUnits: 'Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 21,
        keyResultArea: '1.3 Human Resources Learning and Development',
        kpi: '1.3.2 100% academic development participation in unit faculty program',
        actionPlan:
            'Conduct training assessment as basis crafting of the development program needs in the faculty.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 22,
        keyResultArea: '1.3 Human Resources Learning and Development',
        kpi: '1.3.2 100% academic development participation in unit faculty program',
        actionPlan:
            'Attendance to at least one online training or webinar aligned to the field of specialization.',
        responsibleUnits: 'Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 23,
        keyResultArea: '1.3 Human Resources Learning and Development',
        kpi: '1.3.2 100% academic development participation in unit faculty program',
        actionPlan:
            'Include Faculty Immersion program and have it implemented during Special Period.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.4 Communication
    {
        id: 24,
        keyResultArea: '1.4 Communication',
        kpi: '1.4.1 100% deployment of internal and external communication guidelines/protocols.',
        actionPlan:
            'Efficient and regular use of corporate emails and online systems in inter-office communication by customizing Office 365 features and applications for a secured and reliable communication process.',
        responsibleUnits: 'CPAD, Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 25,
        keyResultArea: '1.4 Communication',
        kpi: '1.4.1 100% deployment of internal and external communication guidelines/protocols.',
        actionPlan:
            'Establish a contingency communication plan with due consideration on security for unexpected challenges.',
        responsibleUnits: 'CPAD, Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.5 Physical Plant and Facilities
    {
        id: 26,
        keyResultArea: '1.5 Physical Plant and Facilities',
        kpi: '1.5.1 100% completion in crafting the 3-year campus development plan.',
        actionPlan: 'Prepare a campus development plan.',
        responsibleUnits: 'FMD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 27,
        keyResultArea: '1.5 Physical Plant and Facilities',
        kpi: '1.5.2 Implementation of the 3-year campus development plan.',
        actionPlan: 'Monitoring of the campus development plan implementation.',
        responsibleUnits: 'FMD',
        targets: {
            ay2023_2024: '30%',
            ay2024_2025: '50%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.6 ICT
    {
        id: 28,
        keyResultArea: '1.6 ICT',
        kpi: '1.6.1 100% up to date, innovative and user friendly, functional website and automation systems',
        actionPlan:
            'Maintain regularly an updated website and automation system.',
        responsibleUnits: 'ICTD, CPAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 29,
        keyResultArea: '1.6 ICT',
        kpi: '1.6.2 100% improvement of ICT network infrastructure capability',
        actionPlan: 'Maintain regularly an upgraded IT infrastructure.',
        responsibleUnits: 'ICTD, FAD',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 30,
        keyResultArea: '1.6 ICT',
        kpi: '1.6.2 100% improvement of ICT network infrastructure capability',
        actionPlan:
            "Install much-needed security software's to protect data on all devices used in the University and its satellite campuses.",
        responsibleUnits: 'ICTD, FAD, Academic/Non-Academic Units',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 31,
        keyResultArea: '1.6 ICT',
        kpi: '1.6.2 100% improvement of ICT network infrastructure capability',
        actionPlan: 'Host secured systems over the cloud.',
        responsibleUnits: 'ICTD, FAD, Academic/Non-Academic Units',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.7 Finance
    {
        id: 32,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.1 Increase accounts Receivable collection efficiency to 98%.',
        actionPlan: 'Efficient deployment of cashless payment scheme.',
        responsibleUnits: 'FAD, Academic Units',
        targets: {
            ay2023_2024: '95%',
            ay2024_2025: '98%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 33,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.1 Increase accounts Receivable collection efficiency to 98%.',
        actionPlan:
            "Close monitoring of students' accounts and consistent reminders to students.",
        responsibleUnits: 'FAD',
        targets: {
            ay2023_2024: '95%',
            ay2024_2025: '98%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 34,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.1 Increase accounts Receivable collection efficiency to 98%.',
        actionPlan:
            'Strengthen partnership/linkages with financing intermediaries who could offer educational loans to students.',
        responsibleUnits: 'FAD',
        targets: {
            ay2023_2024: '95%',
            ay2024_2025: '98%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 35,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.1 Increase accounts Receivable collection efficiency to 98%.',
        actionPlan:
            'Integrate the available payment channels in the Enrolment system.',
        responsibleUnits: 'FAD, ICTD',
        targets: {
            ay2023_2024: '95%',
            ay2024_2025: '98%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 36,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.1 Increase accounts Receivable collection efficiency to 98%.',
        actionPlan:
            'Create a University Communication System to update students on their school fees.',
        responsibleUnits: 'FAD, ICTD, Academic Units',
        targets: {
            ay2023_2024: '95%',
            ay2024_2025: '98%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 37,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.2 Zero complain from students of late posting or unposted online payments every day.',
        actionPlan:
            'Monitor daily status report of online collections to ensure on time and accurate posting of student online payments.',
        responsibleUnits: 'FAD, ICTD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 38,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.3 Utilization of resources based on approved budget for all units',
        actionPlan:
            'Monitoring of the actual expenditures versus approved budget.',
        responsibleUnits: 'FAD, Academic & Non-academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 39,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.3 Utilization of resources based on approved budget for all units',
        actionPlan:
            'Create and integrate the purchasing system to the existing accounting system (Ledgea).',
        responsibleUnits: 'FAD, ICTD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 40,
        keyResultArea: '1.7 Finance',
        kpi: '1.7.3 Utilization of resources based on approved budget for all units',
        actionPlan:
            'Submission of weekly Purchase monitoring sheet to track status of request.',
        responsibleUnits: 'FAD, Academic & Non-academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 1.8 Accreditation & Certification
    {
        id: 41,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.1 100% Compliance with Institutional Sustainability Assessment (ISA) Standards',
        actionPlan:
            'Regular review of compliance to standards and submit action plan to address gaps.',
        responsibleUnits: 'QMSO, Quality Circles, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 42,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.2 100% Compliance with Autonomous Standards',
        actionPlan:
            'Regular review of compliance to standards and submit action plan to address gaps.',
        responsibleUnits: 'QMSO, Quality Circles, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 43,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.3 100% Compliance to PACUCOA Accreditation standards for all programs',
        actionPlan:
            'Compliance to standards and submit action plan to address gaps.',
        responsibleUnits: 'All Academic Units, Quality Circles, QMSO',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 44,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.4 100% compliance with CHED COD/COE standard',
        actionPlan:
            'Regular review of compliance to standards and submit action plan to address gaps.',
        responsibleUnits: 'Academic Units (per college), QMSO, Quality Circles',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 45,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.5 100% Compliance to International accreditation standards.',
        actionPlan:
            'All quality circles to review requirements and submit action plans to address gaps.',
        responsibleUnits: 'Academic Units (per college), QMSO, Quality Circles',
        targets: {
            ay2023_2024: '25%',
            ay2024_2025: '50%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 46,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.6 100% Compliance with ISO 9001:2015 version by AY 2023-2026',
        actionPlan:
            'Monitoring, review and evaluation on the compliance to ISO 9001:2015 standards.',
        responsibleUnits: 'QMSO, Academic & Non-Academic Units, DQMR, IQA',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 47,
        keyResultArea: '1.8 Accreditation & Certification',
        kpi: '1.8.7 100% Compliance to National Competency Certification',
        actionPlan:
            'Identify, train and capacitate faculty members to take the assessments to qualify with TESDA qualified assessors.',
        responsibleUnits: 'Academic Units (per program)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
];

// Computes how many consecutive rows share the same Key Result Area / KPI so
// those cells can be merged with rowSpan instead of repeating the text.
function getRowSpans(data: KraRow[]) {
    const kraSpan: Record<number, number> = {};
    const kpiSpan: Record<number, number> = {};

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const prev = data[i - 1];

        const isNewKra = !prev || prev.keyResultArea !== row.keyResultArea;
        if (isNewKra) {
            let span = 1;
            while (
                data[i + span] &&
                data[i + span].keyResultArea === row.keyResultArea
            ) {
                span++;
            }
            kraSpan[row.id] = span;
        }

        const isNewKpi = isNewKra || !prev || prev.kpi !== row.kpi;
        if (isNewKpi) {
            let span = 1;
            while (
                data[i + span] &&
                data[i + span].keyResultArea === row.keyResultArea &&
                data[i + span].kpi === row.kpi
            ) {
                span++;
            }
            kpiSpan[row.id] = span;
        }
    }

    return { kraSpan, kpiSpan };
}

export default function Index() {
    const { kraSpan, kpiSpan } = getRowSpans(kraData);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full w-full max-w-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-5">
                <Table className="w-full table-fixed border-collapse border border-border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[12%] whitespace-normal">
                                Key Result Area
                            </TableHead>
                            <TableHead className="w-[18%] whitespace-normal">
                                Key Performance Indicator
                            </TableHead>
                            <TableHead className="w-[10%] text-center whitespace-normal">
                                Progress
                            </TableHead>
                            <TableHead className="w-[26%] whitespace-normal">
                                Innovative Action Plan
                            </TableHead>
                            <TableHead className="w-[12%] whitespace-normal">
                                Responsible Units
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kraData.map((row) => (
                            <TableRow key={row.id}>
                                {kraSpan[row.id] && (
                                    <TableCell
                                        rowSpan={kraSpan[row.id]}
                                        className="align-top font-medium whitespace-normal"
                                    >
                                        {row.keyResultArea}
                                    </TableCell>
                                )}
                                {kpiSpan[row.id] && (
                                    <TableCell
                                        rowSpan={kpiSpan[row.id]}
                                        className="align-top whitespace-normal text-muted-foreground"
                                    >
                                        {row.kpi}
                                    </TableCell>
                                )}
                                <TableCell className="text-center align-top whitespace-normal text-muted-foreground">
                                    {row.status}
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.actionPlan}
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.responsibleUnits}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'KRA 1 : EFFICIENT AND EFFECTIVE GOVERNANCE, MANAGEMENT AND LEADERSHIP (Mission #4 and QO #4)',
            href: '/kra/governance',
        },
    ],
};
