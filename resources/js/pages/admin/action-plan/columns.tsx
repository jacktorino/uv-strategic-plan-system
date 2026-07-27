// resources/js/pages/admin/action-plan/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

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

import { UnitOption } from './index';

export interface ResponsibleUnit {
    id: number;
    code?: string;
    name: string;
    category?: 'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';
}

export interface ActionPlan {
    id: number;
    kra_code?: string;
    kpi_code?: string;
    kpi_name?: string;
    description: string;
    order_no?: number;
    start_date?: string;
    end_date?: string;
    responsible_units: ResponsibleUnit[];
}

interface ColumnProps {
    allUnits: UnitOption[];
    onEdit: (plan: ActionPlan) => void;
    onDelete: (plan: ActionPlan) => void;
}

export const columns = ({
    allUnits,
    onEdit,
    onDelete,
}: ColumnProps): ColumnDef<ActionPlan>[] => [
    {
        accessorKey: 'order_no',
        header: '#',
        cell: ({ row }) => (
            <span className="text-xs font-semibold">
                {row.original.order_no ?? '-'}
            </span>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Action Plan Details',
        cell: ({ row }) => (
            <div className="w-[320px] space-y-1">
                <p className="line-clamp-2 text-xs leading-relaxed font-medium">
                    {row.original.description}
                </p>
                {(row.original.start_date || row.original.end_date) && (
                    <span className="text-[10px] text-muted-foreground">
                        {row.original.start_date ?? 'N/A'} —{' '}
                        {row.original.end_date ?? 'N/A'}
                    </span>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'responsible_units',
        header: 'Responsible Units',
        cell: ({ row }) => {
            const assignedUnits = row.original.responsible_units || [];

            // Group system-wide units by category for comparison
            const academicUnits = allUnits.filter(
                (u) => u.category === 'Academic Units',
            );
            const nonAcademicUnits = allUnits.filter(
                (u) => u.category === 'Non-Academic Units',
            );
            const satelliteUnits = allUnits.filter(
                (u) => u.category === 'Satellite Campus',
            );

            // Filter assigned units by category
            const assignedAcademic = assignedUnits.filter(
                (u) => u.category === 'Academic Units',
            );
            const assignedNonAcademic = assignedUnits.filter(
                (u) => u.category === 'Non-Academic Units',
            );
            const assignedSatellite = assignedUnits.filter(
                (u) => u.category === 'Satellite Campus',
            );

            // Check if ALL units within a category are selected
            const hasAllAcademic =
                academicUnits.length > 0 &&
                academicUnits.every((au) =>
                    assignedUnits.some((u) => u.id === au.id),
                );

            const hasAllNonAcademic =
                nonAcademicUnits.length > 0 &&
                nonAcademicUnits.every((nu) =>
                    assignedUnits.some((u) => u.id === nu.id),
                );

            const hasAllSatellite =
                satelliteUnits.length > 0 &&
                satelliteUnits.every((su) =>
                    assignedUnits.some((u) => u.id === su.id),
                );

            if (assignedUnits.length === 0) {
                return (
                    <span className="text-xs text-muted-foreground">None</span>
                );
            }

            return (
                <div className="flex w-[340px] flex-wrap gap-1">
                    {/* ACADEMIC UNITS DISPLAY */}
                    {hasAllAcademic ? (
                        <Badge
                            variant="secondary"
                            className="bg-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                        >
                            Academic Units
                        </Badge>
                    ) : (
                        assignedAcademic.map((u) => (
                            <Badge
                                key={u.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {u.code || u.name}
                            </Badge>
                        ))
                    )}

                    {/* NON-ACADEMIC UNITS DISPLAY */}
                    {hasAllNonAcademic ? (
                        <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-[10px] font-semibold text-blue-600 dark:text-blue-400"
                        >
                            Non-Academic Units
                        </Badge>
                    ) : (
                        assignedNonAcademic.map((u) => (
                            <Badge
                                key={u.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {u.code || u.name}
                            </Badge>
                        ))
                    )}

                    {/* SATELLITE CAMPUS DISPLAY */}
                    {hasAllSatellite ? (
                        <Badge
                            variant="secondary"
                            className="bg-amber-500/10 text-[10px] font-semibold text-amber-600 dark:text-amber-400"
                        >
                            Satellite Campus
                        </Badge>
                    ) : (
                        assignedSatellite.map((u) => (
                            <Badge
                                key={u.id}
                                variant="outline"
                                className="text-[10px]"
                            >
                                {u.code || u.name}
                            </Badge>
                        ))
                    )}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const plan = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuLabel className="text-xs">
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => onEdit(plan)}
                            className="cursor-pointer text-xs"
                        >
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onDelete(plan)}
                            className="cursor-pointer text-xs text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
