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
    // 4.1 Community Extension
    {
        id: 1,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.1 100% sectoral representation in community extension programs',
        actionPlan: 'Involvement of all stakeholders.',
        responsibleUnits: 'COMEX, Academic and Non-Academic Units, Alumni',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 2,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.2 Conduct at least 2 full researches per academic unit and at least one from the non-teaching personnel',
        actionPlan:
            'Conduct at least one (1) extension program from these researches.',
        responsibleUnits:
            'COMEX, Academic Units (per college), Non-Academic Units, CRI',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 3,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.3 Involvement and participation in the environmental protection and preservation',
        actionPlan:
            'Develop programs related to Environment Protection and Conservation.',
        responsibleUnits:
            'COMEX, Academic Units (per college), Non-Academic Units, CRI',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 4,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.4 Sustain the Community Tutorial program. Expansion of the program to the other 6 sitios by the 2nd semester of AY 2023-2024',
        actionPlan:
            'Sustain the community tutorial and expand it to other surrounding communities.',
        responsibleUnits: 'COMEX, Academic and Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 5,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.5 100% implementation, involvement and participation from all colleges/departments during AY 2023-2026',
        actionPlan:
            'Participation of the COMEX representative, faculty and student representatives per program, and the college dean from planning to evaluation.',
        responsibleUnits: 'COMEX, Academic and Non-Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 6,
        keyResultArea: '4.1 Community Extension',
        kpi: '4.1.5 100% implementation, involvement and participation from all colleges/departments during AY 2023-2026',
        actionPlan: 'Posting of COMEX activities in UV FB page and website.',
        responsibleUnits: 'COMEX, CPAD',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 4.2 Philippine Linkages
    {
        id: 7,
        keyResultArea: '4.2 Philippine Linkages',
        kpi: '4.2.1 At least one active partnership with government, industry or NGO per academic unit every semester',
        actionPlan:
            'Document all networking with national and regional organizations by all academic units.',
        responsibleUnits: 'COMEX, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },

    // 4.3 International Linkages
    {
        id: 8,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.1 At least one active partnership with international university per academic unit per semester.',
        actionPlan:
            'Document all networking with international organizations by all academic units.',
        responsibleUnits: 'COMEX, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 9,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.2 At least 1 faculty exchange per academic unit for academic year 2024-2025.',
        actionPlan: 'Deployment of activities stipulated in the MOA/MOU.',
        responsibleUnits: 'IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 10,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.3 At least 2 student exchange programs per academic unit for academic year 2024-2025.',
        actionPlan: 'Deployment of activities stipulated in the MOA/MOU.',
        responsibleUnits: 'IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 11,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.4 At least 1 collaborative Research Activity/Colloquium Activity (Production, Publication, Presentation, and Utilization)',
        actionPlan: 'Deployment of activities stipulated in the MOA/MOU.',
        responsibleUnits: 'IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 12,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.5 At least 50 admissions of Foreign Students enrolled in any academic program for academic year 2024-2025.',
        actionPlan:
            'Produce at least one of each type of campaign (commercial, reputation, education/awareness, and social action) per semester.',
        responsibleUnits: 'IAD, Academic Units',
        targets: {
            ay2023_2024: '100%',
            ay2024_2025: '100%',
            ay2025_2026: '100%',
        },
        status: '---',
    },
    {
        id: 13,
        keyResultArea: '4.3 International Linkages',
        kpi: '4.3.5 At least 50 admissions of Foreign Students enrolled in any academic program for academic year 2024-2025.',
        actionPlan:
            'Develop at least one campaign per semester intended for the international market.',
        responsibleUnits: 'IAD, Academic Units',
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
            title: 'KRA 4 : SUSTAINED SOCIAL RESPONSIBILITY, COMMUNITY INVOLVEMENT AND INDUSTRY LINKAGES (Mission #3 and QO #1)',
            href: '/kra/community',
        },
    ],
};
