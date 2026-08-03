import { useMemo } from 'react';
import { Head } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { ActionPlan } from '@/pages/admin/action-plan/columns';

interface GovernanceIndexProps {
    actionPlans: ActionPlan[];
}

interface DisplayRow {
    id: number;

    isFirstKra: boolean;
    kraRowSpan: number;
    kraLabel: string;

    isFirstKpi: boolean;
    kpiRowSpan: number;
    kpiLabel: string;

    progress: number;
    description: string;
    unitsLabel: string;
}

type KpiGroup = {
    label: string;
    plans: ActionPlan[];
};

type KraGroup = {
    label: string;
    kpiOrder: string[];
    kpiMap: Record<string, KpiGroup>;
};

// Groups the flat list of action plans by KRA -> KPI (in the order they
// first appear) so consecutive rows sharing a KRA/KPI can be merged with
// rowSpan instead of repeating the text — same approach as the admin list.
function buildRows(actionPlans: ActionPlan[]): DisplayRow[] {
    const kraOrder: string[] = [];
    const kraMap: Record<string, KraGroup> = {};

    actionPlans.forEach((plan) => {
        if (!plan.kpi) return;

        const kra = plan.kpi.kra;
        const kraKey = kra ? String(kra.id) : 'none';
        const kraLabel = kra
            ? [kra.code, kra.name].filter(Boolean).join(' ')
            : 'Uncategorized';

        if (!kraMap[kraKey]) {
            kraOrder.push(kraKey);
            kraMap[kraKey] = { label: kraLabel, kpiOrder: [], kpiMap: {} };
        }

        const kraEntry = kraMap[kraKey];
        const kpiKey = String(plan.kpi.id);
        const kpiLabel = [plan.kpi.code, plan.kpi.name]
            .filter(Boolean)
            .join(' ');

        if (!kraEntry.kpiMap[kpiKey]) {
            kraEntry.kpiOrder.push(kpiKey);
            kraEntry.kpiMap[kpiKey] = { label: kpiLabel, plans: [] };
        }

        kraEntry.kpiMap[kpiKey].plans.push(plan);
    });

    const rows: DisplayRow[] = [];

    kraOrder.forEach((kraKey) => {
        const kraEntry = kraMap[kraKey];

        let kraTotalRows = 0;
        kraEntry.kpiOrder.forEach((kpiKey) => {
            kraTotalRows += kraEntry.kpiMap[kpiKey].plans.length;
        });

        let isFirstInKra = true;

        kraEntry.kpiOrder.forEach((kpiKey) => {
            const kpiEntry = kraEntry.kpiMap[kpiKey];

            kpiEntry.plans.forEach((plan, index) => {
                const unitsLabel = plan.responsible_units?.length
                    ? plan.responsible_units
                          .map((u) => u.code ?? u.name)
                          .join(', ')
                    : 'None';

                rows.push({
                    id: plan.id,
                    isFirstKra: isFirstInKra,
                    kraRowSpan: kraTotalRows,
                    kraLabel: kraEntry.label,
                    isFirstKpi: index === 0,
                    kpiRowSpan: kpiEntry.plans.length,
                    kpiLabel: kpiEntry.label,
                    progress: plan.overall_progress ?? 0,
                    description: plan.description,
                    unitsLabel,
                });

                isFirstInKra = false;
            });
        });
    });

    return rows;
}

export default function Index({ actionPlans }: GovernanceIndexProps) {
    const rows = useMemo(() => buildRows(actionPlans), [actionPlans]);

    return (
        <>
            <Head title="Governance" />
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
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.isFirstKra && (
                                    <TableCell
                                        rowSpan={row.kraRowSpan}
                                        className="align-top font-medium whitespace-normal"
                                    >
                                        {row.kraLabel}
                                    </TableCell>
                                )}
                                {row.isFirstKpi && (
                                    <TableCell
                                        rowSpan={row.kpiRowSpan}
                                        className="align-top whitespace-normal text-muted-foreground"
                                    >
                                        {row.kpiLabel}
                                    </TableCell>
                                )}
                                <TableCell className="text-center align-top whitespace-normal text-muted-foreground">
                                    {row.progress}%
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.description}
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.unitsLabel}
                                </TableCell>
                            </TableRow>
                        ))}

                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-sm text-muted-foreground"
                                >
                                    No action plans found for this KRA.
                                </TableCell>
                            </TableRow>
                        )}
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
