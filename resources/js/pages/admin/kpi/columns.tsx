// resources/js/pages/admin/kpi/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Kpi = {
    id: number;
    code: string;
    name: string;
    order_no: number;
    subkra: { id: number; code?: string; name: string } | null;
};

interface ColumnsProps {
    onEdit: (kpi: Kpi) => void;
    onDelete: (kpi: Kpi) => void;
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<Kpi>[] {
    return [
        {
            accessorKey: 'subkra',
            header: 'Sub-KRA',
            cell: ({ row }) => {
                const subkra = row.original.subkra;
                if (!subkra) return '—';
                return subkra.code
                    ? `${subkra.code} - ${subkra.name}`
                    : subkra.name;
            },
        },
        { accessorKey: 'code', header: 'Code' },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'order_no', header: 'Order' },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => {
                const kpi = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(kpi)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete(kpi)}
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
