// resources/js/pages/admin/kpi/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { columns, Kpi } from './columns';
import { CreateDialog } from './create-dialog';
import { EditSheet } from './edit-sheet';
import { DeleteDialog } from './delete-dialog';

interface KraOption {
    id: number;
    code?: string;
    name: string;
}

interface IndexProps {
    kpis: Kpi[];
    kras: KraOption[];
}

export default function Index({ kpis, kras }: IndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedKpi, setSelectedKpi] = useState<Kpi | null>(null);

    const filteredKpis = kpis.filter(
        (k) =>
            k.name.toLowerCase().includes(search.toLowerCase()) ||
            k.code.toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(kpi: Kpi) {
        setSelectedKpi(kpi);
        setEditOpen(true);
    }

    function handleDelete(kpi: Kpi) {
        setSelectedKpi(kpi);
        setDeleteOpen(true);
    }

    const tableColumns = columns({
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <>
            <Head title="KPIs" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Key Performance Indicators
                    </h1>
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New KPI
                    </Button>
                </div>

                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={tableColumns} data={filteredKpis} />
            </div>

            <CreateDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                kras={kras}
            />
            <EditSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                kpi={selectedKpi}
                kras={kras}
            />
            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                kpi={selectedKpi}
            />
        </>
    );
}
