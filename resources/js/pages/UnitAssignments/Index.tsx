import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

import { DataTable } from '@/components/data-table';
import { Input } from '@/components/ui/input';

import { columns } from './columns';
import ActionPlanSubmissionModal from './SubmissionModal';

export interface ActionPlanAssignment {
    id: number;
    progress_percentage: number;
    submission_remarks?: string | null;
    status: string;
    submitted_at?: string | null;
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

    isFirstMonth: boolean;
    monthRowSpan: number;

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
            const unit = item.responsible_unit;

            return (
                kpi?.code?.toLowerCase().includes(text) ||
                kpi?.name?.toLowerCase().includes(text) ||
                plan?.description?.toLowerCase().includes(text) ||
                unit?.name?.toLowerCase().includes(text) ||
                unit?.code?.toLowerCase().includes(text) ||
                item.status?.toLowerCase().includes(text)
            );
        });
    }, [rawAssignments, search]);

    /*
    |--------------------------------------------------------------------------
    | 2. GROUP FILTERED ASSIGNMENTS BY DATE -> KRA -> KPI -> ASSIGNMENT
    |--------------------------------------------------------------------------
    */
    const tableRows = useMemo(() => {
        if (!rawAssignments || !Array.isArray(rawAssignments)) return [];

        const dateOrder: string[] = [];
        const dateMap: Record<
            string,
            { kraOrder: number[]; kraMap: Record<number, KraGroup> }
        > = {};

        filteredAssignments.forEach((assignment) => {
            const plan = assignment.action_plan;
            if (!plan || !plan.kpi) return;

            const targetDate = plan.start_date || plan.end_date;
            const dateKey = targetDate
                ? format(new Date(targetDate), 'yyyy-MM-dd')
                : 'Unscheduled';

            if (!dateMap[dateKey]) {
                dateOrder.push(dateKey);
                dateMap[dateKey] = { kraOrder: [], kraMap: {} };
            }

            const dateEntry = dateMap[dateKey];
            const kraId = plan.kpi.kra ? plan.kpi.kra.id : -1;

            if (!dateEntry.kraMap[kraId]) {
                dateEntry.kraOrder.push(kraId);
                dateEntry.kraMap[kraId] = { kpiOrder: [], kpiMap: {} };
            }

            const kraEntry = dateEntry.kraMap[kraId];

            if (!kraEntry.kpiMap[plan.kpi.id]) {
                kraEntry.kpiOrder.push(plan.kpi.id);
                kraEntry.kpiMap[plan.kpi.id] = {
                    kpi: plan.kpi,
                    assignments: [],
                };
            }

            kraEntry.kpiMap[plan.kpi.id].assignments.push(assignment);
        });

        const rows: AssignmentRow[] = [];

        dateOrder.forEach((dateKey) => {
            const dateEntry = dateMap[dateKey];
            let dateTotalRows = 0;

            dateEntry.kraOrder.forEach((kraId) => {
                dateEntry.kraMap[kraId].kpiOrder.forEach((kpiId) => {
                    dateTotalRows +=
                        dateEntry.kraMap[kraId].kpiMap[kpiId].assignments
                            .length;
                });
            });

            let isFirstInDate = true;

            dateEntry.kraOrder.forEach((kraId) => {
                const kraEntry = dateEntry.kraMap[kraId];
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
                            isFirstMonth: isFirstInDate,
                            monthRowSpan: dateTotalRows,
                            isFirstKpi: index === 0,
                            kpiRowSpan: kpiEntry.assignments.length,
                            isFirstKra: isFirstInKra,
                            kraRowSpan: kraTotalRows,
                            kpi: kpiEntry.kpi,
                            assignment,
                        });

                        isFirstInDate = false;
                        isFirstInKra = false;
                    });
                });
            });
        });

        return rows;
    }, [filteredAssignments, rawAssignments]);

    function handleOpenModal(assignment: ActionPlanAssignment) {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedAssignment(null);
    }

    const tableColumns = columns({
        onUpdateProgress: handleOpenModal,
    });

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
                        placeholder="Search KPI, action plan, status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <DataTable columns={tableColumns} data={tableRows} />
            </div>

            <ActionPlanSubmissionModal
                assignment={selectedAssignment}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}
