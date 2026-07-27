// resources/js/pages/admin/user/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    responsible_unit: {
        id: number;
        name: string;
    } | null;
};

interface ColumnsProps {
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export function columns({ onEdit, onDelete }: ColumnsProps): ColumnDef<User>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => (
                <Badge variant="secondary" className="capitalize">
                    {row.original.role}
                </Badge>
            ),
        },
        {
            id: 'responsible_unit',
            header: 'Responsible Unit',
            cell: ({ row }) => row.original.responsible_unit?.name ?? '—',
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(user)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => onDelete(user)}
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
