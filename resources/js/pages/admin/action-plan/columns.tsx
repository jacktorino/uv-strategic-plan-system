import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ActionPlanRow, UnitOption } from './index';

export interface ResponsibleUnit {
    id: number;
    code?: string;
    name: string;
    category?: 'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';
}

export interface ActionPlanAssignment {
    id: number;
    responsible_unit_id: number;
    unit_code?: string;
    unit_name?: string;
    progress_percentage: number;
    status: 'Not Submitted' | 'Submitted';
    submitted_at?: string | null;
}

export interface Kpi {
    id: number;
    code?: string;
    name?: string;
    target?: number;
    overall_progress?: number;
    kra?: {
        id: number;
        code?: string;
        name?: string;
    };
}

export interface ActionPlan {
    id: number;
    description: string;
    start_date?: string;
    end_date?: string;
    overall_progress?: number;
    kpi?: Kpi;

    submission_month?: string;
    responsible_units: ResponsibleUnit[];
    responsible_unit_ids?: number[];
    assignments?: ActionPlanAssignment[];
    order_no?: number | null;
}

const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
};

interface ColumnProps {
    allUnits: UnitOption[];
    onEdit: (plan: ActionPlan) => void;
    onDelete: (plan: ActionPlan) => void;
}

export const columns = ({
    allUnits,
    onEdit,
    onDelete,
}: ColumnProps): ColumnDef<ActionPlanRow>[] => [
    /*
    |--------------------------------------------------------------------------
    | KRA (merged across all KPIs/plans that share it)
    |--------------------------------------------------------------------------
    */
    {
        id: 'kra',
        accessorKey: 'kra',
        header: 'Key Result Area',

        cell: ({ row }) => {
            if (!row.original.isFirstKra) return null;

            const kpi = row.original.kpi;

            return (
                <div className="w-[280px] space-y-1">
                    {kpi.kra && (
                        <p className="text-xs leading-snug font-semibold whitespace-normal">
                            {kpi.kra.code} {kpi.kra.name}
                        </p>
                    )}
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | KPI (merged across all plans under it)
    |--------------------------------------------------------------------------
    */
    {
        id: 'kpi',
        accessorKey: 'kpi',
        header: 'Key Performance Indicator',

        cell: ({ row }) => {
            if (!row.original.isFirstKpi) return null;

            const kpi = row.original.kpi;
            const kpiProgress = kpi.overall_progress ?? 0;

            return (
                <div className="w-[280px] space-y-2">
                    <p className="mb-10 text-xs leading-snug font-semibold whitespace-normal">
                        {kpi.code ?? '-'} {kpi.name}
                    </p>
                    <div className="flex items-center gap-2 rounded-2xl border p-2">
                        KPI Progress: {kpiProgress}%
                    </div>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | ACTION PLAN PROGRESS
    |--------------------------------------------------------------------------
    */
    {
        id: 'progress',
        header: 'Progress',

        cell: ({ row }) => {
            const plan = row.original.plan;
            const progress = plan.overall_progress ?? 0;

            // let colorClass = 'bg-amber-500';
            // if (progress >= 100) {
            //     colorClass = 'bg-emerald-500';
            // } else if (progress > 0) {
            //     colorClass = 'bg-blue-500';
            // }

            return (
                <div className="w-[50px] space-y-1">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] font-semibold">
                            {progress}%
                        </span>
                    </div>
                    {/* <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                            className={`h-full transition-all duration-300 ${colorClass}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div> */}
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | ACTION PLANS
    |--------------------------------------------------------------------------
    */
    {
        id: 'plans',
        header: 'Innovative Action Plan',

        cell: ({ row }) => {
            const plan = row.original.plan;

            return (
                <div className="w-[400px]">
                    <p className="text-xs break-words whitespace-normal">
                        {plan.description}
                    </p>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | SUBMISSION MONTH (Derived from start_date or end_date)
    |--------------------------------------------------------------------------
    */
    // {
    //     id: 'submission_month',
    //     header: 'Start Date — Due Date',
    //     cell: ({ row }) => {
    //         const plan = row.original.plan;

    //         if (!plan.start_date && !plan.end_date) {
    //             return (
    //                 <span className="text-xs text-muted-foreground">N/A</span>
    //             );
    //         }

    //         return (
    //             <div className="flex flex-col text-xs">
    //                 <div className="text-[11px] text-muted-foreground">
    //                     {plan.start_date ? formatDate(plan.start_date) : 'N/A'}
    //                     {' — '}
    //                     {plan.end_date ? formatDate(plan.end_date) : 'N/A'}
    //                 </div>
    //             </div>
    //         );
    //     },
    // },

    /*
    |--------------------------------------------------------------------------
    | RESPONSIBLE UNITS
    |--------------------------------------------------------------------------
    */
    {
        id: 'units',
        header: 'Responsible Units',

        cell: ({ row }) => {
            const plan = row.original.plan;

            const assignedUnits = plan.responsible_units ?? [];

            const academicUnits = allUnits.filter(
                (u) => u.category === 'Academic Units',
            );

            const nonAcademicUnits = allUnits.filter(
                (u) => u.category === 'Non-Academic Units',
            );

            const satelliteUnits = allUnits.filter(
                (u) => u.category === 'Satellite Campus',
            );

            const assignedAcademic = assignedUnits.filter(
                (u) => u.category === 'Academic Units',
            );

            const assignedNonAcademic = assignedUnits.filter(
                (u) => u.category === 'Non-Academic Units',
            );

            const assignedSatellite = assignedUnits.filter(
                (u) => u.category === 'Satellite Campus',
            );

            const allAcademicSelected =
                academicUnits.length > 0 &&
                academicUnits.every((u) =>
                    assignedUnits.some((a) => a.id === u.id),
                );

            const allNonAcademicSelected =
                nonAcademicUnits.length > 0 &&
                nonAcademicUnits.every((u) =>
                    assignedUnits.some((a) => a.id === u.id),
                );

            const allSatelliteSelected =
                satelliteUnits.length > 0 &&
                satelliteUnits.every((u) =>
                    assignedUnits.some((a) => a.id === u.id),
                );

            return (
                <div className="flex max-w-[220px] flex-wrap gap-1 align-top">
                    {!assignedUnits.length && (
                        <span className="text-xs text-muted-foreground">
                            None
                        </span>
                    )}

                    {allAcademicSelected ? (
                        <Badge
                            variant="secondary"
                            className="bg-emerald-500/10 text-[10px] text-emerald-600"
                        >
                            Academic Units
                        </Badge>
                    ) : (
                        assignedAcademic.map((unit) => (
                            <Badge
                                key={unit.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {unit.code ?? unit.name}
                            </Badge>
                        ))
                    )}

                    {allNonAcademicSelected ? (
                        <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-[10px] text-blue-600"
                        >
                            Non-Academic Units
                        </Badge>
                    ) : (
                        assignedNonAcademic.map((unit) => (
                            <Badge
                                key={unit.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {unit.code ?? unit.name}
                            </Badge>
                        ))
                    )}

                    {allSatelliteSelected ? (
                        <Badge
                            variant="secondary"
                            className="bg-amber-500/10 text-[10px] text-amber-600"
                        >
                            Satellite Campus
                        </Badge>
                    ) : (
                        assignedSatellite.map((unit) => (
                            <Badge
                                key={unit.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {unit.code ?? unit.name}
                            </Badge>
                        ))
                    )}
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | ACTIONS
    |--------------------------------------------------------------------------
    */
    {
        id: 'actions',
        header: '',

        cell: ({ row }) => {
            const plan = row.original.plan;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem onClick={() => onEdit(plan)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => onDelete(plan)}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
