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

export interface Kpi {
    id: number;
    code?: string;
    name?: string;
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
    kpi?: Kpi;
    responsible_units: ResponsibleUnit[];
    responsible_unit_ids?: number[];
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
                <div className="w-[300px] space-y-1">
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

            return (
                <div className="w-[300px] space-y-1">
                    <p className="text-xs leading-snug font-semibold whitespace-normal">
                        {kpi.code ?? '-'} {kpi.name}
                    </p>
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
                <div className="w-[500px]">
                    <p className="break-words whitespace-normal">
                        {plan.description}
                    </p>

                    {(plan.start_date || plan.end_date) && (
                        <div className="mt-1 text-[10px] text-muted-foreground">
                            SET: {formatDate(plan.start_date)}
                            {' — '}
                            DUE: {formatDate(plan.end_date)}
                        </div>
                    )}
                </div>
            );
        },
    },

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
                <div className="flex flex-wrap gap-1">
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
