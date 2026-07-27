import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type ResponsibleUnit = {
    id: number;
    code: string;
    name: string;
    category: string;
    order_no: number;
};

interface ColumnsProps {
    onEdit: (unit: ResponsibleUnit) => void;
    onDelete: (unit: ResponsibleUnit) => void;
}

export function columns({
    onEdit,
    onDelete,
}: ColumnsProps): ColumnDef<ResponsibleUnit>[] {
    return [
        {
            accessorKey: 'code',
            header: 'Code',
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'category',
            header: 'Category',
        },
        {
            accessorKey: 'order_no',
            header: 'Order',
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => {
                const unit = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(unit)}>
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete(unit)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
