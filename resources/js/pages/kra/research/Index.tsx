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
    // 2.1 Research Production, Dissemination, Utilization
    {
        id: 1,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.1 Full time faculty personnel are engaged in research',
        actionPlan:
            'Creation of a core team among research coordinators, teaching and non-teaching personnel.',
        responsibleUnits: 'CRI, Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 2,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.1 Full time faculty personnel are engaged in research',
        actionPlan: 'Conduct weekly research didactics for the faculty.',
        responsibleUnits: 'CRI, Academic & Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 3,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.2 At least one research capacity and capability building per college per semester',
        actionPlan:
            'Conduct Discipline-Specific Research Capability Trainings and Workshops per Semester for every College/Program including non-teaching staffs based on the results of the needs assessment survey.',
        responsibleUnits: 'CRI, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 4,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.2 At least one research capacity and capability building per college per semester',
        actionPlan:
            'Produce outputs which uses NETNOGRAPHY research design and big data analysis.',
        responsibleUnits: 'CRI, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 5,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.3 One research journal per college per academic year',
        actionPlan: 'Publish research outputs in the college research journal.',
        responsibleUnits: 'CRI, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 6,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.4 At least two research-based science and technology applied for patent and/or at least four utility models',
        actionPlan:
            'Forge collaboration researches among different disciplines in the university.',
        responsibleUnits: 'CRI, Academic Units (per college)',
        targets: {
            ay2023_2024: '20%',
            ay2024_2025: '50%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 7,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.5 At least one (1) research output from Non-Teaching Personnel per unit',
        actionPlan:
            'Conduct a training and workshop on writing a publishable format research.',
        responsibleUnits: 'CRI, Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 8,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.6 Utilize tracer study results yearly per academic unit',
        actionPlan:
            'Innovate curricula and improve learning outcomes and graduate competencies.',
        responsibleUnits: 'Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 9,
        keyResultArea: '2.1 Research Production, Dissemination, Utilization',
        kpi: '2.1.7 Thesis/dissertation are IMRAD-ready',
        actionPlan: 'Modify thesis/dissertation format to become IMRAD-ready.',
        responsibleUnits: 'CRI, Academic Units (per college)',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 2.2 Knowledge Management
    {
        id: 10,
        keyResultArea: '2.2 Knowledge Management',
        kpi: '2.2.1 100% deployment of knowledge management system, measurement and analysis.',
        actionPlan:
            'Prepare a Knowledge Management Manual containing forms and SOPPs based on the listed processes and procedures.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 11,
        keyResultArea: '2.2 Knowledge Management',
        kpi: '2.2.1 100% deployment of knowledge management system, measurement and analysis.',
        actionPlan:
            'Deployment of Knowledge Management System activities per unit.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 12,
        keyResultArea: '2.2 Knowledge Management',
        kpi: '2.2.1 100% deployment of knowledge management system, measurement and analysis.',
        actionPlan:
            'Include in KM System in the scheduled re-orientation program.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 13,
        keyResultArea: '2.2 Knowledge Management',
        kpi: '2.2.1 100% deployment of knowledge management system, measurement and analysis.',
        actionPlan:
            'Include KPI of Knowledge Management in the Performance Evaluation per unit.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 14,
        keyResultArea: '2.2 Knowledge Management',
        kpi: '2.2.1 100% deployment of knowledge management system, measurement and analysis.',
        actionPlan:
            'Introduce knowledge management programs to the Visayanian community through exposure of programs to e-media channels.',
        responsibleUnits: 'Academic Units, HRD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 2.3 Library
    {
        id: 15,
        keyResultArea: '2.3 Library',
        kpi: '2.3.1 30% print acquisitions within AY 2023-2026',
        actionPlan:
            'Beef up collections of printed resources in collaboration with the academic units.',
        responsibleUnits: 'Academic Units, ARC',
        targets: { ay2023_2024: '10%', ay2024_2025: '20%', ay2025_2026: '30%' },
        status: '---',
    },
    {
        id: 16,
        keyResultArea: '2.3 Library',
        kpi: '2.3.2 70% non-print acquisitions within the AY 2023-2026',
        actionPlan:
            'Improve collections of relevant electronic resources by participating in consortium with other universities.',
        responsibleUnits: 'Academic Units, ARC',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '75%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 17,
        keyResultArea: '2.3 Library',
        kpi: '2.3.3 100% information dissemination and accessibility of academic resources, print & non-print.',
        actionPlan:
            'Integrate the library management system in the university website.',
        responsibleUnits: 'ICTD, CPAD, ARC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 18,
        keyResultArea: '2.3 Library',
        kpi: '2.3.3 100% information dissemination and accessibility of academic resources, print & non-print.',
        actionPlan:
            'Create infographics (digital library guides) to encourage all faculty and students to fully maximize the utilization of all library resources and services.',
        responsibleUnits: 'ICTD, CPAD, ARC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 19,
        keyResultArea: '2.3 Library',
        kpi: '2.3.4 100% of Full-time faculty accessed and utilized the academic resources per month',
        actionPlan:
            'Require all full-time faculty to borrow at least two books per month and access the e-learning resources through the library management system.',
        responsibleUnits: 'Academic Units, ARC',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 20,
        keyResultArea: '2.3 Library',
        kpi: '2.3.5 Students accessed and utilized the academic resources per month within the AY 2023-2026',
        actionPlan:
            'Require all the students to borrow at least two books per month and access the e-learning resources through the library management system.',
        responsibleUnits: 'Academic Units, ARC',
        targets: {
            ay2023_2024: '50%',
            ay2024_2025: '75%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 21,
        keyResultArea: '2.3 Library',
        kpi: '2.3.5 Non-Teaching personnel should borrow and read at least one book per month',
        actionPlan:
            'Require the non-teaching personnel to visit the ARC and/or access the library management system and utilize the available resources.',
        responsibleUnits: 'Non-Academic Units, ARC',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 22,
        keyResultArea: '2.3 Library',
        kpi: '2.3.6 At least one recipient per department per semester for the top academic resources borrower award (faculty, non-teaching, students)',
        actionPlan:
            'Sets criteria for the recognition and prepares monitoring matrix on ARC resources utilization.',
        responsibleUnits: 'ARC',
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
            title: 'KRA 2 : QUALITY RESEARCH AND KNOWLEDGE MANAGEMENT (Mission #1 and QO #3)',
            href: '/kra/governance',
        },
    ],
};
