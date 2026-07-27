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

// Shared action plans for the 5.1.1 freshmen/Grade 11 enrollment quotas (a-e),
// since the source document lists these action items once and applies them
// across all five sub-targets.
const enrollmentActionPlans = [
    'Conduct FGD as one of the tools to get feedback and inputs.',
    'Increase field marketing campaign to private academic institutions.',
    'Create more page engagements in Facebook on a daily/weekly basis to reach more page likes and follows, and expand into other social media for advertisement and promotion.',
    'Create an enhanced "enroll now, pay later" scheme and sponsorship programs for students to pursue their studies.',
];

const enrollmentTargets = [
    {
        kpi: '5.1.1a At least 300 freshmen students for colleges with a single program offering (CCJE)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
    },
    {
        kpi: '5.1.1b At least 500 freshmen students for colleges with two to three program offerings, at least 50 students/program (CAHS, COME)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
    },
    {
        kpi: '5.1.1c At least 600 freshmen students for colleges with more than three program offerings, at least 50 students/program (CAS, CBA, COED, CETA)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
    },
    {
        kpi: '5.1.1d At least 100 freshmen students for JD.',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
    },
    {
        kpi: '5.1.1e At least 600 Grade 11 students with at least 50 students/track.',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
    },
];

let idCounter = 0;
const nextId = () => ++idCounter;

const enrollmentRows: KraRow[] = enrollmentTargets.flatMap((group) =>
    enrollmentActionPlans.map((actionPlan) => ({
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: group.kpi,
        actionPlan,
        responsibleUnits: 'CPAD, Academic Units, SASC, CRI',
        targets: group.targets,
        status: '---',
    })),
);

const restOfKraData: KraRow[] = [
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: "5.1.2 Achieve at least 80% students' retention",
        actionPlan: 'Implement JRG\'s "Himunga-an System".',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: "5.1.2 Achieve at least 80% students' retention",
        actionPlan: "Strengthen students' academic advising.",
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: "5.1.2 Achieve at least 80% students' retention",
        actionPlan:
            "Sustain students' positive experiences through exceptional customer service throughout all units.",
        responsibleUnits: 'Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: '5.1.3 Submission of College Marketing Plan',
        actionPlan: 'Conduct webinars and prepare Marketing Plan.',
        responsibleUnits: 'CPAD, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: '5.1.4 Deployment of the university campaign advertisement materials per semester',
        actionPlan:
            'Produce at least one of each type of campaign (commercial, reputation, education/awareness, and social action) per semester.',
        responsibleUnits: 'CPAD, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: '5.1.4 Deployment of the university campaign advertisement materials per semester',
        actionPlan:
            'Develop at least one campaign per semester intended for the international market.',
        responsibleUnits: 'CPAD, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.1 PR and Marketing',
        kpi: '5.1.5 Five (5) signed MOA per Academic Year with the feeder school',
        actionPlan:
            'Seal at least five (5) Feeder School Partnerships per academic year.',
        responsibleUnits: 'CPAD, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.2 Customer Feedback
    {
        id: nextId(),
        keyResultArea: '5.2 Customer Feedback',
        kpi: '5.2.1 Deployment of the Best Innovative Procedures Award (BIPA) and customer feedback mechanism in all units',
        actionPlan:
            'Strengthen the feedback system through the university online portal and other mechanisms where stakeholders can convey service satisfaction and experiences.',
        responsibleUnits: 'CPAD, Academic & Non-academic Units, SASC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.2 Customer Feedback',
        kpi: '5.2.2 Response to customer feedback within seven days',
        actionPlan:
            'Timely feedback system through the university online portal and other mechanisms where stakeholders can convey service satisfaction and experiences.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.2 Customer Feedback',
        kpi: '5.2.2 Response to customer feedback within seven days',
        actionPlan:
            'Orient internal stakeholders on the various feedback mechanisms and the Standard Operating Policies and Procedures on Customer Feedback Facilitation.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.2 Customer Feedback',
        kpi: '5.2.2 Response to customer feedback within seven days',
        actionPlan:
            'Create a customer feedback committee comprising employees from Academic units, Support Service Offices, and the President of SSC to ensure sincere involvement.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.3 Guidance & Counseling
    {
        id: nextId(),
        keyResultArea: '5.3 Guidance & Counseling',
        kpi: '5.3.1 Deployment of counseling program',
        actionPlan:
            'Sustain the implementation of the Guidance and Counseling program through a Flexible Deployment Program.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.3 Guidance & Counseling',
        kpi: '5.3.1 Deployment of counseling program',
        actionPlan:
            'Link with private or government agencies offering Psychological Assessment, Debriefing, and Medical Assistance, and refer students with special needs to specialists.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.3 Guidance & Counseling',
        kpi: '5.3.1 Deployment of counseling program',
        actionPlan:
            'Partner with industries or companies on the deployment of CIP.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.3 Guidance & Counseling',
        kpi: '5.3.1 Deployment of counseling program',
        actionPlan: 'Implement a peer counseling program.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.4 Student Development & Discipline
    {
        id: nextId(),
        keyResultArea: '5.4 Student Development & Discipline',
        kpi: '5.4.1 Deployment of student-planned extracurricular activities.',
        actionPlan:
            'Participate in inter-school competitions which give students the opportunity to exhibit and unleash their talents and potentials.',
        responsibleUnits: 'SASC, All Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.4 Student Development & Discipline',
        kpi: '5.4.3 2% decrease of student violations',
        actionPlan:
            'Developmental Program Plan on student discipline that counters the challenges of the new normal.',
        responsibleUnits: 'SASC, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.4 Student Development & Discipline',
        kpi: '5.4.3 2% decrease of student violations',
        actionPlan:
            'Sustain monitoring mechanism of student behavioral concerns.',
        responsibleUnits: 'SASC, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.4 Student Development & Discipline',
        kpi: '5.4.3 2% decrease of student violations',
        actionPlan:
            "Conduct regular awareness drives on the digital mechanisms for monitoring students' behavior.",
        responsibleUnits: 'SASC, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.5 Gender and Development Program
    {
        id: nextId(),
        keyResultArea: '5.5 Gender and Development Program',
        kpi: '5.5.1 Deployment of the Gender and Development program',
        actionPlan:
            'Create gender-inclusive teaching materials and resources for teachers to enhance classroom discussion.',
        responsibleUnits: 'All Academic Units, SASC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.6 Sports Development
    {
        id: nextId(),
        keyResultArea: '5.6 Sports Development',
        kpi: '5.6.1 100% involvement in intramural and extramural activities',
        actionPlan:
            "Organize sports leagues among the system schools with support from the schools' linkages and broadcast them through online platforms for a global audience.",
        responsibleUnits: 'SASC, Academic Units, COMEX, ACD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.6 Sports Development',
        kpi: '5.6.1 100% involvement in intramural and extramural activities',
        actionPlan:
            'Create Virtual Intramural activities for students and other stakeholders with support from alumni and sponsors.',
        responsibleUnits: 'SASC, Academic Units, Alumni, ACD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.6 Sports Development',
        kpi: '5.6.1 100% involvement in intramural and extramural activities',
        actionPlan:
            'Invite alumni and company representatives as resource speakers on fitness and sports related webinars.',
        responsibleUnits: 'SASC, ACD, Alumni',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.6 Sports Development',
        kpi: '5.6.1 100% involvement in intramural and extramural activities',
        actionPlan:
            'Initiate, reconnect and create linkages with former sponsors and alumni.',
        responsibleUnits: 'SASC, ACD, Alumni',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.7 Arts & Culture Development
    {
        id: nextId(),
        keyResultArea: '5.7 Arts & Culture Development',
        kpi: '5.7.1 Organize at least one NTPIF/Faculty/Student arts and culture program per semester.',
        actionPlan: 'Create a Culture and Arts development program plan.',
        responsibleUnits: 'Academic & Non-Academic Units, SASC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.7 Arts & Culture Development',
        kpi: '5.7.1 Organize at least one NTPIF/Faculty/Student arts and culture program per semester.',
        actionPlan:
            'Create a virtual platform for Cultural & Artistic performances and Exhibitions.',
        responsibleUnits: 'Academic & Non-Academic Units, ACD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.7 Arts & Culture Development',
        kpi: '5.7.1 Organize at least one NTPIF/Faculty/Student arts and culture program per semester.',
        actionPlan:
            'Create virtual and in-person cultural and artistic performances and exhibitions.',
        responsibleUnits: 'Academic & Non-Academic Units, ACD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.7 Arts & Culture Development',
        kpi: '5.7.1 Organize at least one NTPIF/Faculty/Student arts and culture program per semester.',
        actionPlan:
            'Intensify the promotion of Arts and Culture activities by increasing social media engagement.',
        responsibleUnits: 'Academic & Non-Academic Units, ACD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 5.8 Alumni Relations
    {
        id: nextId(),
        keyResultArea: '5.8 Alumni Relations',
        kpi: '5.8.1 Strengthen alumni chapter in all academic units',
        actionPlan:
            'Creation of a chapter alumni developmental plan in all academic units.',
        responsibleUnits: 'Academic Units, Alumni Affairs',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.8 Alumni Relations',
        kpi: '5.8.1 Strengthen alumni chapter in all academic units',
        actionPlan: 'Creation of an International Alumni Chapter.',
        responsibleUnits: 'Academic Units, Alumni Affairs',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: nextId(),
        keyResultArea: '5.8 Alumni Relations',
        kpi: '5.8.2 Organize university-wide Alumni Homecoming/Reunion every year',
        actionPlan: 'Conduct Alumni Homecoming/reunion activities.',
        responsibleUnits: 'Alumni Affairs, UVAAI',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
];

const kraData: KraRow[] = [...enrollmentRows, ...restOfKraData];

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
            title: 'KRA 5 : HOLISTIC ENGAGEMENT WITH STUDENTS AND OTHER STAKEHOLDERS (Mission #4 and QO #5)',
            href: '/kra/students',
        },
    ],
};
