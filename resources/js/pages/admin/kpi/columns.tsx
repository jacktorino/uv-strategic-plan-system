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
    kra: { id: number; name: string } | null;
};

interface ColumnsProps {
    onEdit: (kpi: Kpi) => void;
    onDelete: (kpi: Kpi) => void;
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<Kpi>[] {
    return [
        // 1. KRA moved to the very first position
        {
            id: 'kra',
            header: 'Key Result Area',
            cell: ({ row }) => row.original.kra?.name ?? '—',
        },
        // 2. Code is now second
        { accessorKey: 'code', header: 'Code' },
        // 3. Name is third
        { accessorKey: 'name', header: 'Name' },
        // 4. Order is fourth
        { accessorKey: 'order_no', header: 'Order' },
        // 5. Actions at the end
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