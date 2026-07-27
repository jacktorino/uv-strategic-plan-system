// resources/js/pages/admin/action-plan/index.tsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { columns, ActionPlan } from './columns';
import { CreateDialog } from './create-sheet';
import { EditSheet } from './edit-sheet';
import { DeleteDialog } from './delete-dialog';

interface KraOption {
    id: number;
    code?: string;
    name: string;
}

interface KpiOption {
    id: number;
    kra_id?: number;
    code?: string;
    name: string;
}

export type UnitCategory =
    'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';

export interface UnitOption {
    id: number;
    code: string;
    name: string;
    category: UnitCategory;
}

interface IndexProps {
    actionPlans: ActionPlan[];
    kras?: KraOption[];
    kpis: KpiOption[];
    units: UnitOption[];
}

export default function Index({
    actionPlans,
    kras = [],
    kpis,
    units,
}: IndexProps) {
    const [search, setSearch] = useState('');
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null);

    const filteredPlans = actionPlans.filter((p) =>
        p.description.toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(plan: ActionPlan) {
        setSelectedPlan(plan);
        setEditOpen(true);
    }

    function handleDelete(plan: ActionPlan) {
        setSelectedPlan(plan);
        setDeleteOpen(true);
    }

    const tableColumns = columns({
        allUnits: units,
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    return (
        <>
            <Head title="Innovative Action Plans" />

            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                        Innovative Action Plans
                    </h1>
                    <Button onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Action Plan
                    </Button>
                </div>

                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={tableColumns} data={filteredPlans} />
            </div>

            <CreateDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                kpis={kpis}
                units={units}
            />
            <EditSheet
                open={editOpen}
                onOpenChange={setEditOpen}
                plan={selectedPlan}
                kpis={kpis}
                units={units}
            />
            <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                plan={selectedPlan}
            />
        </>
    );
}
