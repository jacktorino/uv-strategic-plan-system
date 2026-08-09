import { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

// 1. Import your Layout component (Adjust path if needed, e.g. '@/layouts/AuthenticatedLayout')
import AppLayout from '@/layouts/app-layout';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import { Badge } from '@/components/ui/badge';
import { Select, SelectGroup, SelectTrigger } from '@/components/ui/select';

interface UnitInfo {
    name: string;
    submitted: boolean;
    progress_percentage: number;
}

interface CategoryGroup {
    category: string;
    units: UnitInfo[];
}

interface PeriodInfo {
    id: number;
    month: number;
    year: number;
    period_start?: string | null;
    period_end?: string | null;
    status: string;
}

export interface ActionPlan {
    id: number;
    description: string;
    overall_progress: number;
    computedProgress?: number;
    parsedUnits?: UnitInfo[];
    period?: PeriodInfo | null;
    kpi?: {
        id: number;
        code: string;
        name: string;
        subkra_id?: number;
        subkra?: {
            id?: number;
            code?: string;
            name?: string;
        };
        sub_kra?: {
            id?: number;
            code?: string;
            name?: string;
        };
        kra?: {
            id: number;
            code: string;
            name: string;
        };
    };
    responsible_units?: any[];
}

interface SubKraInfo {
    id: number;
    code: string;
    name: string;
    kra?: {
        id: number;
        code: string;
        name: string;
    };
}

interface SubKraIndexProps {
    subkra: SubKraInfo;
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
    kpiProgress: number;
    progress: number;
    description: string;
    categoryGroups: CategoryGroup[];
    ungroupedUnits: UnitInfo[];
}

type KpiGroup = {
    label: string;
    plans: (ActionPlan & {
        computedProgress: number;
        parsedUnits: UnitInfo[];
    })[];
    calculatedProgress: number;
};

type KraGroup = {
    label: string;
    kpiOrder: string[];
    kpiMap: Record<string, KpiGroup>;
};

const formatDate = (date?: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
};

function buildRows(
    actionPlans: ActionPlan[],
    fallbackSubKra?: SubKraInfo,
): DisplayRow[] {
    const kraOrder: string[] = [];
    const kraMap: Record<string, KraGroup> = {};

    // 1. Map and calculate individual plan progress based on responsible units average
    const processedPlans = actionPlans.map((plan) => {
        const units: UnitInfo[] = [];

        plan.responsible_units?.forEach((u: any) => {
            const progressVal = Number(
                u.progress_percentage ?? u.pivot?.progress_percentage ?? 0,
            );
            const isSubmittedExplicit = Boolean(
                u.submitted || u.pivot?.submitted || false,
            );

            units.push({
                name: u.code ?? u.name,
                submitted: isSubmittedExplicit || progressVal === 100,
                progress_percentage: progressVal,
            });
        });

        // Formula: Action Plan Progress = Sum of units progress / Total units count
        let calculatedPlanProgress = 0;
        if (units.length > 0) {
            const totalUnitsProgress = units.reduce(
                (sum, unit) => sum + unit.progress_percentage,
                0,
            );
            calculatedPlanProgress = Math.round(
                totalUnitsProgress / units.length,
            );
        }

        return {
            ...plan,
            computedProgress: calculatedPlanProgress,
            parsedUnits: units,
        };
    });

    // 2. Group plans under Sub-KRA / KPI structure
    processedPlans.forEach((plan) => {
        const subkra = plan.kpi?.subkra || plan.kpi?.sub_kra || fallbackSubKra;
        const kra = plan.kpi?.kra || fallbackSubKra?.kra;

        const kraKey = subkra
            ? `subkra-${subkra.id || subkra.code}`
            : kra
              ? `kra-${kra.id}`
              : 'subkra-default';

        const kraLabel = subkra
            ? [subkra.code ? `${subkra.code}` : '', subkra.name]
                  .filter(Boolean)
                  .join(' - ')
            : kra
              ? [kra.code, kra.name].filter(Boolean).join(' ')
              : 'Sub-KRA';

        if (!kraMap[kraKey]) {
            kraOrder.push(kraKey);
            kraMap[kraKey] = { label: kraLabel, kpiOrder: [], kpiMap: {} };
        }

        const kraEntry = kraMap[kraKey];
        const kpiKey = plan.kpi ? String(plan.kpi.id) : `kpi-none-${plan.id}`;
        const kpiLabel = plan.kpi
            ? [plan.kpi.code, plan.kpi.name].filter(Boolean).join(' ')
            : 'N/A';

        if (!kraEntry.kpiMap[kpiKey]) {
            kraEntry.kpiOrder.push(kpiKey);
            kraEntry.kpiMap[kpiKey] = {
                label: kpiLabel,
                plans: [],
                calculatedProgress: 0,
            };
        }

        kraEntry.kpiMap[kpiKey].plans.push(plan);
    });

    // 3. Calculate KPI progress (Average of its Action Plans)
    kraOrder.forEach((kraKey) => {
        const kraEntry = kraMap[kraKey];
        kraEntry.kpiOrder.forEach((kpiKey) => {
            const kpiEntry = kraEntry.kpiMap[kpiKey];
            const totalPlanProgress = kpiEntry.plans.reduce(
                (sum, p) => sum + p.computedProgress,
                0,
            );
            kpiEntry.calculatedProgress =
                kpiEntry.plans.length > 0
                    ? Math.round(totalPlanProgress / kpiEntry.plans.length)
                    : 0;
        });
    });

    // 4. Flatten grouped data into table rows with computed rowSpans
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
                const categoryMap: Record<string, UnitInfo[]> = {};

                plan.parsedUnits.forEach((unit) => {
                    const originalUnitData = plan.responsible_units?.find(
                        (u: any) => (u.code ?? u.name) === unit.name,
                    );
                    const category =
                        originalUnitData?.category ?? 'Other Units';

                    if (!categoryMap[category]) {
                        categoryMap[category] = [];
                    }
                    categoryMap[category].push(unit);
                });

                const categoryGroups: CategoryGroup[] = [];
                const ungroupedUnits: UnitInfo[] = [];

                Object.entries(categoryMap).forEach(([category, units]) => {
                    if (units.length <= 3) {
                        ungroupedUnits.push(...units);
                    } else {
                        categoryGroups.push({ category, units });
                    }
                });

                rows.push({
                    id: plan.id,
                    isFirstKra: isFirstInKra,
                    kraRowSpan: kraTotalRows,
                    kraLabel: kraEntry.label,
                    isFirstKpi: index === 0,
                    kpiRowSpan: kpiEntry.plans.length,
                    kpiLabel: kpiEntry.label,
                    kpiProgress: kpiEntry.calculatedProgress,
                    progress: plan.computedProgress,
                    description: plan.description,
                    categoryGroups,
                    ungroupedUnits,
                });

                isFirstInKra = false;
            });
        });
    });

    return rows;
}

export default function Index({ subkra, actionPlans = [] }: SubKraIndexProps) {
    const rows = useMemo(
        () => buildRows(actionPlans, subkra),
        [actionPlans, subkra],
    );

    // Reporting period banner derived from action plans
    const currentPeriod = useMemo(() => {
        return actionPlans.find((plan) => plan.period)?.period ?? null;
    }, [actionPlans]);

    return (
        <TooltipProvider>
            <Head title={`Sub-KRA ${subkra?.code || ''}`} />
            <div className="flex h-full w-full max-w-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-5">
                {/* Reporting period banner */}
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                    <div>
                        <p className="text-2xl font-semibold">
                            {currentPeriod
                                ? format(
                                      new Date(
                                          currentPeriod.year,
                                          currentPeriod.month - 1,
                                      ),
                                      'MMMM yyyy',
                                  )
                                : 'Unscheduled'}
                        </p>
                        {currentPeriod && (
                            <p className="text-xs text-muted-foreground">
                                {formatDate(currentPeriod.period_start)}
                                {' — '}
                                {formatDate(currentPeriod.period_end)}
                            </p>
                        )}



                    </div>

                    {currentPeriod && (
                        <Badge variant="outline" className="text-[15px]">
                            {currentPeriod.status}
                        </Badge>
                    )}
                </div>

                <Table className="w-full table-fixed border-collapse border border-border [&_td]:border [&_td]:border-border [&_th]:border [&_th]:border-border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[12%] whitespace-normal">
                                Key Results Area
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
                            <TableHead className="w-[14%] whitespace-normal">
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
                                        <div>{row.kpiLabel}</div>
                                        <div className="mt-2 text-xs font-semibold text-foreground">
                                            KPI Progress: {row.kpiProgress}%
                                        </div>
                                    </TableCell>
                                )}
                                <TableCell className="text-center align-top whitespace-normal text-muted-foreground">
                                    {row.progress}%
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.description}
                                </TableCell>
                                <TableCell className="align-top whitespace-normal text-muted-foreground">
                                    {row.categoryGroups.length > 0 ||
                                    row.ungroupedUnits.length > 0 ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {row.categoryGroups.map(
                                                (group, gIdx) => (
                                                    <Tooltip key={gIdx}>
                                                        <TooltipTrigger asChild>
                                                            <Badge
                                                                variant="outline"
                                                                className="cursor-pointer hover:bg-muted"
                                                            >
                                                                {group.category}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="w-80 max-w-md border bg-popover p-4 text-popover-foreground shadow-md"
                                                        >
                                                            <ul className="space-y-2.5 text-sm">
                                                                {group.units.map(
                                                                    (
                                                                        unit,
                                                                        uIdx,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                uIdx
                                                                            }
                                                                            className="flex items-center justify-between gap-4"
                                                                        >
                                                                            <div className="flex items-center gap-2.5">
                                                                                <span className="text-foreground">
                                                                                    {
                                                                                        unit.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span
                                                                                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                                                                                    unit.submitted
                                                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                                                }`}
                                                                            >
                                                                                {unit.submitted
                                                                                    ? 'Submitted'
                                                                                    : 'Not Submitted'}
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ),
                                            )}

                                            {row.ungroupedUnits.map(
                                                (unit, uIdx) => (
                                                    <Badge
                                                        key={`ungrouped-${uIdx}`}
                                                        variant="outline"
                                                        className={`cursor-default ${
                                                            unit.submitted
                                                                ? 'border-green-500/35 bg-green-50/50 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                                                                : 'border-red-500/35 bg-red-50/50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                                                        }`}
                                                    >
                                                        {unit.name}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            None
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}

                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center text-sm text-muted-foreground"
                                >
                                    No action plans found for Sub-KRA{' '}
                                    {subkra?.code || ''}.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
    );
}

// 2. Return the Layout wrapper component passing breadcrumbs and page
Index.layout = (page: any) => {
    const subkra = page?.props?.subkra;

    const parentKraName = subkra?.kra
        ? `${subkra.kra.code}: ${subkra.kra.name}`
        : 'KRA';

    const parentKraHref = subkra?.kra?.code
        ? `/kra/${subkra.kra.code.toLowerCase().replace(/[^a-z0-9]/g, '')}`
        : '/kra/governance';

    const breadcrumbs = [
        {
            title: parentKraName,
            href: parentKraHref,
        },
    ];

    return <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
};
