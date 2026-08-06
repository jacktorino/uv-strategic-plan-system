import { useCallback, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { columns } from './columns';
import ActionPlanSubmissionModal from './SubmissionModal';

export interface ActionPlanAssignment {
    id: number;
    progress_percentage: number;
    submission_remarks?: string | null;
    status: string;
    submitted_at?: string | null;
    period?: {
        id: number;
        month: number;
        year: number;
        period_start?: string | null;
        period_end?: string | null;
        submission_start?: string | null;
        submission_deadline?: string | null;
        review_start?: string | null;
        review_end?: string | null;
        approval_date?: string | null;
        status: string;
    } | null;
    action_plan: {
        id: number;
        title?: string;
        description: string;
        start_date?: string | null;
        end_date?: string | null;
        kpi?: {
            id: number;
            code?: string;
            name: string;
            overall_progress?: number;
            kra?: {
                id: number;
                code?: string;
                name: string;
            };
        };
    };
    responsible_unit?: {
        id: number;
        code?: string;
        name: string;
        category?: 'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';
    };
}

interface PaginatedAssignments {
    data: ActionPlanAssignment[];
    current_page: number;
    last_page: number;
    total: number;
}

interface IndexProps {
    assignments: PaginatedAssignments | ActionPlanAssignment[];
}

export interface AssignmentRow {
    id: number;

    isFirstKpi: boolean;
    kpiRowSpan: number;

    isFirstKra: boolean;
    kraRowSpan: number;

    kpi: NonNullable<ActionPlanAssignment['action_plan']['kpi']>;

    assignment: ActionPlanAssignment;
}

type KpiGroup = {
    kpi: NonNullable<ActionPlanAssignment['action_plan']['kpi']>;
    assignments: ActionPlanAssignment[];
};

type KraGroup = {
    kpiOrder: number[];
    kpiMap: Record<number, KpiGroup>;
};

interface PeriodBlock {
    key: string;
    period: ActionPlanAssignment['period'];
    rows: AssignmentRow[];
}

const formatDate = (date?: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
};

export default function Index({ assignments = [] }: IndexProps) {
    const [search, setSearch] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] =
        useState<ActionPlanAssignment | null>(null);

    // Standardize data array whether receiving paginated data or a plain array
    const rawAssignments = useMemo(() => {
        return Array.isArray(assignments)
            ? assignments
            : (assignments.data ?? []);
    }, [assignments]);

    /*
    |--------------------------------------------------------------------------
    | 1. SEARCH FILTER
    |--------------------------------------------------------------------------
    */
    const filteredAssignments = useMemo(() => {
        if (!search.trim()) return rawAssignments;

        const text = search.toLowerCase();

        return rawAssignments.filter((item) => {
            const plan = item.action_plan;
            const kpi = plan?.kpi;
            const kra = kpi?.kra;
            const unit = item.responsible_unit;

            return (
                kpi?.code?.toLowerCase().includes(text) ||
                kpi?.name?.toLowerCase().includes(text) ||
                kra?.code?.toLowerCase().includes(text) ||
                kra?.name?.toLowerCase().includes(text) ||
                plan?.description?.toLowerCase().includes(text) ||
                unit?.name?.toLowerCase().includes(text) ||
                unit?.code?.toLowerCase().includes(text) ||
                item.status?.toLowerCase().includes(text)
            );
        });
    }, [rawAssignments, search]);

    /*
    |--------------------------------------------------------------------------
    | 2. GROUP FILTERED ASSIGNMENTS BY PERIOD -> KRA -> KPI -> ASSIGNMENT
    |    Each period becomes its own block, rendered as a heading + table.
    |--------------------------------------------------------------------------
    */
    const periodBlocks = useMemo(() => {
        if (!filteredAssignments || !Array.isArray(filteredAssignments))
            return [];

        const periodOrder: string[] = [];
        const periodMap: Record<
            string,
            {
                period: ActionPlanAssignment['period'];
                kraOrder: number[];
                kraMap: Record<number, KraGroup>;
            }
        > = {};

        filteredAssignments.forEach((assignment) => {
            const plan = assignment.action_plan;
            if (!plan) return;

            const period = assignment.period ?? null;
            const periodKey = period
                ? `${period.year}-${String(period.month).padStart(2, '0')}`
                : 'unscheduled';

            if (!periodMap[periodKey]) {
                periodOrder.push(periodKey);
                periodMap[periodKey] = { period, kraOrder: [], kraMap: {} };
            }

            const periodEntry = periodMap[periodKey];
            const kraId = plan.kpi?.kra ? plan.kpi.kra.id : -1;

            if (!periodEntry.kraMap[kraId]) {
                periodEntry.kraOrder.push(kraId);
                periodEntry.kraMap[kraId] = { kpiOrder: [], kpiMap: {} };
            }

            const kraEntry = periodEntry.kraMap[kraId];
            const kpiId = plan.kpi ? plan.kpi.id : -999;

            if (!kraEntry.kpiMap[kpiId]) {
                kraEntry.kpiOrder.push(kpiId);
                kraEntry.kpiMap[kpiId] = {
                    kpi: plan.kpi ?? { id: -999, name: 'Unassigned KPI' },
                    assignments: [],
                };
            }

            kraEntry.kpiMap[kpiId].assignments.push(assignment);
        });

        const blocks: PeriodBlock[] = periodOrder.map((periodKey) => {
            const periodEntry = periodMap[periodKey];
            const rows: AssignmentRow[] = [];

            periodEntry.kraOrder.forEach((kraId) => {
                const kraEntry = periodEntry.kraMap[kraId];
                let kraTotalRows = 0;

                kraEntry.kpiOrder.forEach((kpiId) => {
                    kraTotalRows += kraEntry.kpiMap[kpiId].assignments.length;
                });

                let isFirstInKra = true;

                kraEntry.kpiOrder.forEach((kpiId) => {
                    const kpiEntry = kraEntry.kpiMap[kpiId];

                    kpiEntry.assignments.forEach((assignment, index) => {
                        rows.push({
                            id: assignment.id,
                            isFirstKpi: index === 0,
                            kpiRowSpan: kpiEntry.assignments.length,
                            isFirstKra: isFirstInKra,
                            kraRowSpan: kraTotalRows,
                            kpi: kpiEntry.kpi,
                            assignment,
                        });

                        isFirstInKra = false;
                    });
                });
            });

            return {
                key: periodKey,
                period: periodEntry.period,
                rows,
            };
        });

        return blocks;
    }, [filteredAssignments]);

    const handleOpenModal = useCallback((assignment: ActionPlanAssignment) => {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedAssignment(null);
    }, []);

    const tableColumns = useMemo(
        () =>
            columns({
                onUpdateProgress: handleOpenModal,
            }),
        [handleOpenModal],
    );

    return (
        <>
            <Head title="Unit Assignments & Progress" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Unit Assignments & Progress
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor action plan assignments and update
                            submission progress.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Search KRA, KPI, action plan, status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <div className="space-y-6">
                    {periodBlocks.map((block) => (
                        <div key={block.key} className="space-y-2">
                            {/* Period heading — sits above the table, not inside it */}
                            <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2">
                                <div>
                                    <p className="text-sm font-semibold">
                                        {block.period
                                            ? format(
                                                  new Date(
                                                      block.period.year,
                                                      block.period.month - 1,
                                                  ),
                                                  'MMMM yyyy',
                                              )
                                            : 'Unscheduled'}
                                    </p>
                                    {block.period && (
                                        <p className="text-xs text-muted-foreground">
                                            {formatDate(
                                                block.period.period_start,
                                            )}
                                            {' — '}
                                            {formatDate(
                                                block.period.period_end,
                                            )}
                                        </p>
                                    )}
                                </div>

                                {block.period && (
                                    <Badge
                                        variant="outline"
                                        className="text-[10px]"
                                    >
                                        {block.period.status}
                                    </Badge>
                                )}
                            </div>

                            <DataTable
                                columns={tableColumns}
                                data={block.rows}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <ActionPlanSubmissionModal
                assignment={selectedAssignment}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
