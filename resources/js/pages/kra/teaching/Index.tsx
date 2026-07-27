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
    // 3.1 Faculty
    {
        id: 1,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.1 Full Time faculty members will have the required qualifications/minimum academic qualifications (Higher Ed graduate degree = 100%; Basic Ed LET passer = 100%, graduate degree = 30%)',
        actionPlan:
            'Strictly comply with the CHED minimum academic qualifications hiring personnel for academic position.',
        responsibleUnits: 'HRD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 2,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.1 Full Time faculty members will have the required qualifications/minimum academic qualifications (Higher Ed graduate degree = 100%; Basic Ed LET passer = 100%, graduate degree = 30%)',
        actionPlan:
            'Encourage the academic personnel to avail of the educational scholarship.',
        responsibleUnits: 'HRD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 3,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.1 Full Time faculty members will have the required qualifications/minimum academic qualifications (Higher Ed graduate degree = 100%; Basic Ed LET passer = 100%, graduate degree = 30%)',
        actionPlan:
            'Craft a 5-year faculty development plan and monitor its implementation.',
        responsibleUnits: 'HRD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 4,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.2 90% of the faculty meets a performance rating of at least 4.51',
        actionPlan:
            'Regularly evaluate the faculty using the revised/updated performance evaluation tool.',
        responsibleUnits: 'HRD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 5,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.2 90% of the faculty meets a performance rating of at least 4.51',
        actionPlan:
            'Automated Faculty Evaluation System integrated with the Student Portal.',
        responsibleUnits: 'HRD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 6,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.3 Full-time faculty are members of relevant professional organizations.',
        actionPlan:
            'Require all full-time faculty to be involved as member or officer in a professional organization aligned to their discipline.',
        responsibleUnits: 'Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 7,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.4 At least one class section advisership every semester',
        actionPlan: 'Homeroom organization in regular classes.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 8,
        keyResultArea: '3.1 Faculty',
        kpi: '3.1.5 Deployment of Ranking, Tenureship & Promotion',
        actionPlan:
            'Faculty responds to the call for ranking, sends application and submits the required evidence for ranking.',
        responsibleUnits: 'HRD, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 3.2 Instruction
    {
        id: 9,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.1 Compliance with Curriculum Validation every semester',
        actionPlan: 'Prepare a curriculum validation policy.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 10,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.1 Compliance with Curriculum Validation every semester',
        actionPlan:
            'Conduct a curriculum validation before the end of each semester.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 11,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.1 Compliance with Curriculum Validation every semester',
        actionPlan:
            'Develop an automated system embedded in the UV ACCESS LMS as part of the course compliance.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 12,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.2 100% compliance with Curriculum Evaluation every four/five years',
        actionPlan: 'Conduct a curriculum evaluation every four or five years.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 13,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.2 100% compliance with Curriculum Evaluation every four/five years',
        actionPlan:
            'Conduct seminar/workshop/training for all the prospective participants (IAAC members) on the conduct of curriculum review and evaluation.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 14,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.3 Compliance to selective retention guidelines.',
        actionPlan: 'Prepare selective retention policies for all programs.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 15,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.3 Compliance to selective retention guidelines.',
        actionPlan:
            'Compliance to selective retention policies in all programs.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 16,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.3 Compliance to selective retention guidelines.',
        actionPlan:
            'Integrate in the University website the retention policy of each program.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 17,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.4 Above national passing percentage for all licensure/bar exams for 1st time takers.',
        actionPlan: 'Deployment of board exam prep policy.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 18,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.5 Deployment of at least one external certification per program for faculty.',
        actionPlan:
            'Capacitate and train faculty to deliver the external certification programs.',
        responsibleUnits: 'Academic Units (per program)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 19,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.5 Deployment of at least one external certification per program for faculty.',
        actionPlan:
            'Establish partnership with agencies/institutions providing certification programs.',
        responsibleUnits: 'Academic Units (per program)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 20,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.6 Integration of One NC per program',
        actionPlan:
            'Verify with TESDA available NC programs aligned to the programs offered.',
        responsibleUnits: 'Academic Units, EdTech',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 21,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.7 Organize student Quality Circles in all year levels',
        actionPlan:
            "Identify students who will compose the quality circle per college/per year level and organize them according to the Students' Quality Circle policy.",
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 22,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.8 3rd year students should take sub-professional and professional Civil Service examinations',
        actionPlan:
            'Orient students on the types of civil service exam and career advancement in terms of qualification.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 23,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.8 3rd year students should take sub-professional and professional Civil Service examinations',
        actionPlan:
            'Facilitate application to the civil service examination through both the Pencil and Paper Test and Computer Based Examination.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 24,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.9 Faculty Members should acquire a score of C1 in the International English Language Certification.',
        actionPlan:
            'Prepare an intervention program across all academic units.',
        responsibleUnits: 'All Academic Units',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 25,
        keyResultArea: '3.2 Instruction',
        kpi: '3.2.10 Students should acquire a score of B1 in the International English Language Certification.',
        actionPlan: 'Prepare an intervention program across all year levels.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '30%',
            ay2024_2025: '50%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 3.3 Innovative Education
    {
        id: 26,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan:
            'Develop Online Course Module per program per College in Office 365 and Open LMS.',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 27,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan: 'Develop Hyflex Learning Strategy in all colleges.',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 28,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan:
            'Provide professional development training courses on ICT for faculty and staff (e.g. AI, KM, IoT, data science).',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 29,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan:
            'Retooling on integration of MS Teams in the LMS (UV ACCESS).',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 30,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan:
            'Strategic partnership with technology companies through MOA and MOU.',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 31,
        keyResultArea: '3.3 Innovative Education',
        kpi: '3.3.1 100% implementation of the E-learning program/roadmap',
        actionPlan: 'Integrate AI/Robotics in all courses.',
        responsibleUnits: 'All Academic Units, CIE',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 3.4 Employability
    {
        id: 32,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.1 Graduates are engaged in gainful activities and professional development within 12 months after graduation (employment, entrepreneurship, graduate studies).',
        actionPlan:
            'Monitor graduates to document their employment, engagement in entrepreneurial activities, or pursuit of further studies.',
        responsibleUnits: 'CPAD, Alumni Affairs, Academic Units (per college)',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '80%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 33,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.1 Graduates are engaged in gainful activities and professional development within 12 months after graduation (employment, entrepreneurship, graduate studies).',
        actionPlan:
            'Provide incentive to encourage graduates to give feedback when they get a job after graduation.',
        responsibleUnits: 'CPAD, Alumni Affairs, Academic Units (per college)',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '80%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 34,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.1 Graduates are engaged in gainful activities and professional development within 12 months after graduation (employment, entrepreneurship, graduate studies).',
        actionPlan:
            'Conduct a regular job fair in collaboration with industry partners and document those hired on the spot.',
        responsibleUnits: 'CPAD, Alumni Affairs, Academic Units (per college)',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '80%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 35,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.2 Establish at least 2 industry partners per semester/program',
        actionPlan:
            'Identify local and international companies and start networking for partnerships.',
        responsibleUnits: 'CPAD, IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 36,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.2 Establish at least 2 industry partners per semester/program',
        actionPlan:
            'Build collaborative programs that are mutually beneficial with the industry and the college/university.',
        responsibleUnits: 'CPAD, IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 37,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.3 Conduct the annual tracer study',
        actionPlan:
            'Initiate the conduct of the annual graduate tracer studies.',
        responsibleUnits:
            'CPAD, Alumni Relations, CRI, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 38,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.3 Conduct the annual tracer study',
        actionPlan:
            'Collaborate with the colleges & alumni affairs in the deployment of the graduate tracer survey questionnaire.',
        responsibleUnits:
            'CPAD, Alumni Relations, CRI, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 39,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.3 Conduct the annual tracer study',
        actionPlan:
            'Utilize data gathered from the tracer study and convert into a research paper in coordination with the CRI.',
        responsibleUnits:
            'CPAD, Alumni Relations, CRI, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 40,
        keyResultArea: '3.4 Employability',
        kpi: '3.4.3 Conduct the annual tracer study',
        actionPlan:
            'Cascade results to the colleges as an input to improve programs.',
        responsibleUnits:
            'CPAD, Alumni Relations, CRI, Academic Units (per college)',
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
            title: 'KRA 3 : INNOVATIVE AND EXCELLENT TEACHING AND LEARNING (Mission #2 and QO #2)',
            href: '/kra/teaching',
        },
    ],
};
