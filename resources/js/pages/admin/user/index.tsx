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

interface IndexProps {
    users: User[];
    roles: RoleOption[];
    units: UnitOption[];
}

export default function Index({ users, roles, units }: IndexProps) {
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
            <Head title="Accounts" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Accounts</h1>
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Account
                    </Button>
                </div>

                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={tableColumns} data={filteredUsers} />
            </div>

            <CreateSheet
                open={createOpen}
                onOpenChange={setCreateOpen}
                roles={roles}
                units={units}
            />

            <EditSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                user={selectedUser}
                roles={roles}
                units={units}
            />

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                user={selectedUser}
            />
        </>
    );
}
