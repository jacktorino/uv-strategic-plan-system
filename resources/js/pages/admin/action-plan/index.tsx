import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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

export interface KpiOption {
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

export interface ActionPlanRow {
    id: number;

    isFirstKpi: boolean;
    kpiRowSpan: number;

    isFirstKra: boolean;
    kraRowSpan: number;

    kpi: NonNullable<ActionPlan['kpi']>;

    plan: ActionPlan;
}

type KpiGroup = {
    kpi: NonNullable<ActionPlan['kpi']>;
    plans: ActionPlan[];
};

type KraGroup = {
    kpiOrder: number[];
    kpiMap: Record<number, KpiGroup>;
};

export default function Index({ actionPlans, kpis, units }: IndexProps) {
    const [search, setSearch] = useState('');

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<ActionPlan | null>(null);

    /*
    |--------------------------------------------------------------------------
    | 1. SEARCH FILTER
    | (This MUST happen before grouping so row spans adjust dynamically)
    |--------------------------------------------------------------------------
    */
    const filteredPlans = useMemo(() => {
        if (!search.trim()) return actionPlans;

        const text = search.toLowerCase();

        return actionPlans.filter((plan) => {
            return (
                plan.kpi?.code?.toLowerCase().includes(text) ||
                plan.kpi?.name?.toLowerCase().includes(text) ||
                plan.description.toLowerCase().includes(text) ||
                plan.responsible_units.some(
                    (unit) =>
                        unit.name.toLowerCase().includes(text) ||
                        unit.code?.toLowerCase().includes(text),
                )
            );
        });
    }, [actionPlans, search]);

    /*
    |--------------------------------------------------------------------------
    | 2. GROUP FILTERED ACTION PLANS BY KRA -> KPI -> PLAN
    |--------------------------------------------------------------------------
    */
    const tableRows = useMemo(() => {
        const kraOrder: number[] = [];
        const kraMap: Record<number, KraGroup> = {};

        // Use filteredPlans instead of actionPlans
        filteredPlans.forEach((plan) => {
            if (!plan.kpi) return;

            const kraId = plan.kpi.kra ? plan.kpi.kra.id : -1;

            if (!kraMap[kraId]) {
                kraOrder.push(kraId);
                kraMap[kraId] = { kpiOrder: [], kpiMap: {} };
            }

            const kraEntry = kraMap[kraId];

            if (!kraEntry.kpiMap[plan.kpi.id]) {
                kraEntry.kpiOrder.push(plan.kpi.id);
                kraEntry.kpiMap[plan.kpi.id] = { kpi: plan.kpi, plans: [] };
            }

            kraEntry.kpiMap[plan.kpi.id].plans.push(plan);
        });

        const rows: ActionPlanRow[] = [];

        kraOrder.forEach((kraId) => {
            const kraEntry = kraMap[kraId];

            let kraTotalRows = 0;

            kraEntry.kpiOrder.forEach((kpiId) => {
                kraTotalRows += kraEntry.kpiMap[kpiId].plans.length;
            });

            let isFirstInKra = true;

            kraEntry.kpiOrder.forEach((kpiId) => {
                const kpiEntry = kraEntry.kpiMap[kpiId];

                kpiEntry.plans.forEach((plan, index) => {
                    rows.push({
                        id: plan.id,
                        isFirstKpi: index === 0,
                        kpiRowSpan: kpiEntry.plans.length,
                        isFirstKra: isFirstInKra,
                        kraRowSpan: kraTotalRows,
                        kpi: kpiEntry.kpi,
                        plan,
                    });

                    isFirstInKra = false;
                });
            });
        });

        return rows;
    }, [filteredPlans]);

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
                    placeholder="Search KPI, description, unit..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={tableColumns} data={tableRows} />
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
