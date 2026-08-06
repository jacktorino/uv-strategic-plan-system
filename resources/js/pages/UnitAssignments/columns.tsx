import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { AssignmentRow, ActionPlanAssignment } from './Index';

export interface UnitOption {
    id: number;
    code?: string;
    name: string;
    category?: 'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';
}

interface ColumnProps {
    onUpdateProgress: (assignment: ActionPlanAssignment) => void;
}

/*
|--------------------------------------------------------------------------
| SUBMIT BUTTON
| Disabled once the assignment has actually been submitted, showing a
| checkmark instead of the "Submit" label.
|--------------------------------------------------------------------------
*/
function SubmitButton({
    assignment,
    onUpdateProgress,
}: {
    assignment: ActionPlanAssignment;
    onUpdateProgress: (assignment: ActionPlanAssignment) => void;
}) {
    const isSubmitted = assignment.status === 'Submitted';

    return (
        <Button
            variant="default"
            className="w-[84px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitted}
            onClick={() => onUpdateProgress(assignment)}
        >
            {isSubmitted ? (
                <Check className="h-4 w-4 animate-in duration-300 zoom-in-50" />
            ) : (
                'Submit'
            )}
        </Button>
    );
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
        header: () => <div className="text-center">Progress</div>,
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            // Explicitly parse and fall back to ensure reactivity catches numeric values
            const progress = Number(assignment.progress_percentage) || 0;

            return (
                <div className="w-full space-y-1 text-center">
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
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            // Explicitly parse and fall back to ensure reactivity catches numeric values
            const status = assignment.status ?? 'Not Yet Submitted';

            return (
                <div className="flex w-full justify-center space-y-1">
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
    | RESPONSIBLE UNIT
    |--------------------------------------------------------------------------
    */
    {
        id: 'unit',
        header: () => <div className="text-center">Responsible Unit</div>,
        cell: ({ row }) => {
            const assignment = row.original.assignment;
            const unit = assignment.responsible_unit;

            if (!unit) {
                return (
                    <div className="flex w-full justify-center">
                        <span className="text-xs text-muted-foreground">
                            None
                        </span>
                    </div>
                );
            }

            return (
                <div className="flex w-full flex-wrap justify-center gap-1">
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
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            const assignment = row.original.assignment;

            return (
                <div className="flex w-full justify-center">
                    <SubmitButton
                        assignment={assignment}
                        onUpdateProgress={onUpdateProgress}
                    />
                </div>
            );
        },
    },
];
