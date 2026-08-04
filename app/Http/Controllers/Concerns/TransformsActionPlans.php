<?php

namespace App\Http\Controllers\Concerns;

use App\Models\InnovativeActionPlan\ActionPlan;

trait TransformsActionPlans
{
    /**
     * Shape a single ActionPlan the same way for every page that
     * displays them (admin index and the read-only KRA group pages).
     */
    protected function transformPlan(ActionPlan $plan): array
    {
        return [
            'id' => $plan->id,
            'description' => $plan->description,
            'start_date' => $plan->start_date?->toDateString(),
            'end_date' => $plan->end_date?->toDateString(),

            // Action Plan Calculated Progress
            'overall_progress' => $plan->overall_progress,

            // KPI information
            'kpi' => $plan->kpi ? [
                'id' => $plan->kpi->id,
                'code' => $plan->kpi->code,
                'name' => $plan->kpi->name,
                'target' => $plan->kpi->target,
                'overall_progress' => $plan->kpi->overall_progress,
                'kra' => $plan->kpi->kra ? [
                    'id' => $plan->kpi->kra->id,
                    'code' => $plan->kpi->kra->code,
                    'name' => $plan->kpi->kra->name,
                ] : null,
            ] : null,

            'responsible_unit_ids' => $plan->assignments
                ->pluck('responsible_unit_id')
                ->values(),

            // Mapped to include pivot progress, status, category, and submission check for frontend display
            'responsible_units' => $plan->assignments->map(function ($assignment) {
                $unit = $assignment->responsibleUnit;
                $progress = (int) ($assignment->progress_percentage ?? 0);

                return [
                    'id' => $unit?->id,
                    'name' => $unit?->name,
                    'code' => $unit?->code,
                    'category' => $unit?->category ?? 'Other Units',
                    'progress_percentage' => $progress,
                    'submitted' => ($assignment->status === 'submitted' || !empty($assignment->submitted_at) || $progress === 100),
                    'status' => $assignment->status ?? 'pending',
                ];
            })->filter(fn ($unit) => !is_null($unit['id']))->values(),

            'assignments' => $plan->assignments->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'responsible_unit_id' => $assignment->responsible_unit_id,
                    'unit_code' => $assignment->responsibleUnit?->code,
                    'unit_name' => $assignment->responsibleUnit?->name,
                    'progress_percentage' => $assignment->progress_percentage,
                    'status' => $assignment->status,
                    'submitted_at' => $assignment->submitted_at,
                ];
            }),
        ];
    }

    /**
     * Fetch every ActionPlan whose KPI belongs to a Kra with a code
     * starting with the given prefix (e.g. '1.' for the Governance
     * group: 1.1, 1.2 ... 1.8), fully eager loaded and shaped.
     */
    protected function actionPlansForKraGroup(string $codePrefix)
    {
        return ActionPlan::with([
            'kpi:id,kra_id,code,name,target',
            'kpi.kra:id,code,name',
            'assignments.responsibleUnit:id,name,code,category',
        ])
            ->whereHas('kpi.kra', fn ($q) => $q->where('code', 'like', $codePrefix.'%'))
            ->orderBy('order_no')
            ->get()
            ->map(fn (ActionPlan $plan) => $this->transformPlan($plan));
    }
}