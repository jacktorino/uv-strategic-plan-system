// index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { columns, ResponsibleUnit } from './columns';
import { CreateSheet } from './create-sheet';
import { EditSheet } from './edit-sheet';
import { DeleteDialog } from './delete-dialog';

interface IndexProps {
    units: ResponsibleUnit[];
}

export default function Index({ units }: IndexProps) {
    const [search, setSearch] = useState('');

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<ResponsibleUnit | null>(
        null,
    );

    const filteredUnits = units.filter(
        (unit) =>
            unit.name.toLowerCase().includes(search.toLowerCase()) ||
            unit.code.toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(unit: ResponsibleUnit) {
        setSelectedUnit(unit);
        setEditOpen(true);
    }

    function handleDelete(unit: ResponsibleUnit) {
        setSelectedUnit(unit);
        setDeleteOpen(true);
    }

    const tableColumns = columns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <>
            <Head title="Responsible Units" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Responsible Units
                    </h1>
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Responsible Unit
                    </Button>
                </div>

                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={tableColumns} data={filteredUnits} />
            </div>

            <CreateSheet open={createOpen} onOpenChange={setCreateOpen} />

            <EditSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                unit={selectedUnit}
            />

            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                unit={selectedUnit}
            />
        </>
    );
}
