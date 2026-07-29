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
    category?:
        | 'Academic Units'
        | 'Non-Academic Units'
        | 'Satellite Campus';
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

    /*
    |--------------------------------------------------------------------------
    | KPI
    |--------------------------------------------------------------------------
    */

    {
        accessorKey: 'kpi',
        header: 'KPI',

        cell: ({ row }) => {

            const kpi = row.original.kpi;


            if (!kpi) {

                return (
                    <span className="text-xs text-muted-foreground">
                        No KPI
                    </span>
                );

            }


            return (

                <div className="w-[300px] space-y-1">


                    <Badge
                        variant="secondary"
                        className="text-[10px]"
                    >
                        {kpi.code ?? '-'}
                    </Badge>



                    <p className="text-xs font-semibold leading-snug">
                        {kpi.name}
                    </p>



                    {kpi.kra && (

                        <p className="text-[10px] text-muted-foreground">

                            KRA: {kpi.kra.code}

                        </p>

                    )}


                </div>

            );

        },

    },



    /*
    |--------------------------------------------------------------------------
    | ACTION PLAN
    |--------------------------------------------------------------------------
    */

    {
        accessorKey: 'description',

        header: 'Action Plan Details',

        cell: ({ row }) => (

            <div className="w-[420px] space-y-2">


                <p className="line-clamp-3 text-xs leading-relaxed font-medium">

                    {row.original.description}

                </p>



                {(row.original.start_date ||
                    row.original.end_date) && (

                    <div className="text-[10px] text-muted-foreground">

                        {row.original.start_date ?? 'N/A'}

                        {' — '}

                        {row.original.end_date ?? 'N/A'}

                    </div>

                )}


            </div>

        ),

    },



    /*
    |--------------------------------------------------------------------------
    | RESPONSIBLE UNITS
    |--------------------------------------------------------------------------
    */

    {
        accessorKey: 'responsible_units',

        header: 'Responsible Units',

        cell: ({ row }) => {


            const assignedUnits =
                row.original.responsible_units ?? [];



            const academicUnits =
                allUnits.filter(
                    unit =>
                        unit.category === 'Academic Units'
                );



            const nonAcademicUnits =
                allUnits.filter(
                    unit =>
                        unit.category === 'Non-Academic Units'
                );



            const satelliteUnits =
                allUnits.filter(
                    unit =>
                        unit.category === 'Satellite Campus'
                );



            const assignedAcademic =
                assignedUnits.filter(
                    unit =>
                        unit.category === 'Academic Units'
                );



            const assignedNonAcademic =
                assignedUnits.filter(
                    unit =>
                        unit.category === 'Non-Academic Units'
                );



            const assignedSatellite =
                assignedUnits.filter(
                    unit =>
                        unit.category === 'Satellite Campus'
                );




            const allAcademicSelected =
                academicUnits.length > 0 &&
                academicUnits.every(
                    unit =>
                        assignedUnits.some(
                            selected =>
                                selected.id === unit.id
                        )
                );



            const allNonAcademicSelected =
                nonAcademicUnits.length > 0 &&
                nonAcademicUnits.every(
                    unit =>
                        assignedUnits.some(
                            selected =>
                                selected.id === unit.id
                        )
                );



            const allSatelliteSelected =
                satelliteUnits.length > 0 &&
                satelliteUnits.every(
                    unit =>
                        assignedUnits.some(
                            selected =>
                                selected.id === unit.id
                        )
                );



            if (!assignedUnits.length) {

                return (

                    <span className="text-xs text-muted-foreground">

                        None

                    </span>

                );

            }



            return (

                <div className="flex w-[300px] flex-wrap gap-1">


                    {
                        allAcademicSelected ? (

                            <Badge
                                variant="secondary"
                                className="bg-emerald-500/10 text-[10px] text-emerald-600"
                            >

                                Academic Units

                            </Badge>

                        ) : (

                            assignedAcademic.map(unit => (

                                <Badge
                                    key={unit.id}
                                    variant="outline"
                                    className="text-[10px]"
                                >

                                    {unit.code ?? unit.name}

                                </Badge>

                            ))

                        )
                    }



                    {
                        allNonAcademicSelected ? (

                            <Badge
                                variant="secondary"
                                className="bg-blue-500/10 text-[10px] text-blue-600"
                            >

                                Non-Academic Units

                            </Badge>

                        ) : (

                            assignedNonAcademic.map(unit => (

                                <Badge
                                    key={unit.id}
                                    variant="outline"
                                    className="text-[10px]"
                                >

                                    {unit.code ?? unit.name}

                                </Badge>

                            ))

                        )
                    }



                    {
                        allSatelliteSelected ? (

                            <Badge
                                variant="secondary"
                                className="bg-amber-500/10 text-[10px] text-amber-600"
                            >

                                Satellite Campus

                            </Badge>

                        ) : (

                            assignedSatellite.map(unit => (

                                <Badge
                                    key={unit.id}
                                    variant="outline"
                                    className="text-[10px]"
                                >

                                    {unit.code ?? unit.name}

                                </Badge>

                            ))

                        )
                    }


                </div>

            );

        },

    },



    /*
    |--------------------------------------------------------------------------
    | ACTION BUTTONS
    |--------------------------------------------------------------------------
    */

    {
        id: 'actions',

        cell: ({ row }) => {


            const plan = row.original;



            return (

                <DropdownMenu>


                    <DropdownMenuTrigger asChild>

                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                        >

                            <span className="sr-only">
                                Open menu
                            </span>


                            <MoreHorizontal className="h-4 w-4" />

                        </Button>


                    </DropdownMenuTrigger>



                    <DropdownMenuContent
                        align="end"
                        className="w-[140px]"
                    >


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
                            className="cursor-pointer text-xs text-destructive"
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