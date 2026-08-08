// resources/js/pages/admin/user/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { columns, User } from './columns';
import { CreateSheet } from './create-sheet';
import { EditSheet } from './edit-sheet';
import { DeleteDialog } from './delete-dialog';

interface RoleOption {
    value: string;
    label: string;
}

interface UnitOption {
    id: number;
    name: string;
}

interface SubKraOption {
    id: number;
    code: string;
    name: string;
}

interface IndexProps {
    users: User[];
    roles: RoleOption[];
    units: UnitOption[];
    subkras: SubKraOption[];
}

export default function Index({ users, roles, units, subkras }: IndexProps) {
    const [search, setSearch] = useState('');

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(user: User) {
        setSelectedUser(user);
        setEditOpen(true);
    }

    function handleDelete(user: User) {
        setSelectedUser(user);
        setDeleteOpen(true);
    }

    const tableColumns = columns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <>
            <Head title="Users" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Account
                    </Button>
                </div>

                <DataTable columns={tableColumns} data={filteredUsers} />
            </div>

            <CreateSheet
                open={createOpen}
                onOpenChange={setCreateOpen}
                roles={roles}
                units={units}
                subkras={subkras}
            />

            <EditSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                user={selectedUser}
                roles={roles}
                units={units}
                subkras={subkras}
            />

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                user={selectedUser}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '#',
        },
    ],
};
