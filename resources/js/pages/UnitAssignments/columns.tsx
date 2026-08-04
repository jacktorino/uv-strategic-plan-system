import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { AssignmentRow, ActionPlanAssignment } from './Index';

export interface UnitOption {
    id: number;
    code?: string;
    name: string;
    category?: 'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';
}

const formatDate = (date?: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
};

interface ColumnProps {
    onUpdateProgress: (assignment: ActionPlanAssignment) => void;
}

export const columns = ({
    onUpdateProgress,
}: ColumnProps): ColumnDef<AssignmentRow>[] => [
    /*
    |--------------------------------------------------------------------------
    | KRA (Key Result Area - merged based on row span logic)
    |--------------------------------------------------------------------------
    */
    {
        id: 'kra',
        accessorKey: 'kpi.kra',
        header: 'Key Result Area',
        cell: ({ row }) => {
            if (!row.original.isFirstKra) return null;

            const kpi = row.original.kpi;

            return (
                <div className="w-[120px] space-y-1">
                    {kpi?.kra && (
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
    | KPI (Key Performance Indicator - merged based on row span logic)
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
                    {/* <div className="flex items-center gap-2 rounded-2xl border p-2 text-xs">
                        KPI Progress: {kpiProgress}%
                    </div> */}
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | PROGRESS PERCENTAGE & STATUS (Placed directly after KPI column)
    |--------------------------------------------------------------------------
    */
    {
        id: 'progress',
        header: 'Progress',
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            // Explicitly parse and fall back to ensure reactivity catches numeric values
            const progress = Number(assignment.progress_percentage) || 0;
            const status = assignment.status ?? 'Not Yet Submitted';

            return (
                <div className="w-[85px] space-y-1">
                    <span className="font-semibold">{progress}%</span>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | ACTION PLAN DESCRIPTION
    |--------------------------------------------------------------------------
    */
    {
        id: 'plans',
        header: 'Innovative Action Plan',
        cell: ({ row }) => {
            const plan = row.original.assignment.action_plan;

            return (
                <div className="w-[350px]">
                    <p className="text-xs break-words whitespace-normal">
                        {plan?.description}
                    </p>
                </div>
            );
        },
    },

    {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            // Explicitly parse and fall back to ensure reactivity catches numeric values
            const status = assignment.status ?? 'Not Yet Submitted';

            return (
                <div className="w-[100px] space-y-1">
                    <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                            status === 'Submitted'
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : 'bg-amber-500/10 text-amber-600'
                        }`}
                    >
                        {status}
                    </Badge>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | TIMELINE (Start Date — End Date)
    |--------------------------------------------------------------------------
    */
    {
        id: 'timeline',
        header: 'Start Date — Due Date',
        cell: ({ row }) => {
            const plan = row.original.assignment.action_plan;

            if (!plan?.start_date && !plan?.end_date) {
                return (
                    <span className="text-xs text-muted-foreground">N/A</span>
                );
            }

            return (
                <div className="flex flex-col text-xs">
                    <div className="text-[11px] text-muted-foreground">
                        {formatDate(plan.start_date)}
                        {' — '}
                        {formatDate(plan.end_date)}
                    </div>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | RESPONSIBLE UNIT
    |--------------------------------------------------------------------------
    */
    {
        id: 'unit',
        header: 'Responsible Unit',
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            const unit = assignment.responsible_unit;

            if (!unit) {
                return (
                    <span className="text-xs text-muted-foreground">None</span>
                );
            }

            return (
                <div className="flex max-w-[180px] flex-wrap gap-1">
                    <Badge variant="outline" className="text-[10px]">
                        {unit.code ?? unit.name}
                    </Badge>
                </div>
            );
        },
    },

    /*
    |--------------------------------------------------------------------------
    | ACTIONS (Update Progress / Submission)
    |--------------------------------------------------------------------------
    */
    {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
            const assignment = row.original.assignment;

            return (
                <Button
                    variant="default"
                    onClick={() => onUpdateProgress(assignment)}
                >
                    Submit
                </Button>
                // <DropdownMenu>
                //     <DropdownMenuTrigger asChild>
                //         <Button variant="ghost" className="h-8 w-8 p-0">
                //             <MoreHorizontal className="h-4 w-4" />
                //         </Button>
                //     </DropdownMenuTrigger>

                //     <DropdownMenuContent align="end">
                //         <DropdownMenuLabel>Actions</DropdownMenuLabel>

                //         <DropdownMenuItem
                //             onClick={() => onUpdateProgress(assignment)}
                //         >
                //             <UploadCloud className="mr-2 h-4 w-4" />

                //         </DropdownMenuItem>
                //     </DropdownMenuContent>
                // </DropdownMenu>
            );
        },
    },
];
