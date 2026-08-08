<?php

namespace App\Http\Controllers\Concerns;

use App\Models\InnovativeActionPlan\ActionPlan;

trait TransformsActionPlans
{
    /**
     * Fetch every ActionPlan whose KPI belongs to a SubKra with a code
     * starting with the given prefix (e.g. '1.' for Governance group: 1.1, 1.2 ... 1.8),
     * fully eager loaded, shaped, and sorted by SubKra code.
     */
    protected function actionPlansForKraGroup(string $codePrefix)
    {
        return ActionPlan::with([
            'currentPeriod',
            'kpi:id,subkra_id,code,name,target',
            'kpi.subkra:id,kra_id,code,name',
            'assignments.responsibleUnit:id,name,code,category',
        ])
            ->whereHas('kpi.subkra', fn ($q) => $q->where('code', 'like', $codePrefix.'%'))
            // Join subkras and kpis to sort numerically/alphabetically by subkra code first, then action plan order_no
            ->join('kpis', 'action_plans.kpi_id', '=', 'kpis.id')
            ->join('subkras', 'kpis.subkra_id', '=', 'subkras.id')
            ->orderBy('subkras.code', 'asc')
            ->orderBy('action_plans.order_no', 'asc')
            ->select('action_plans.*') // Prevent column collision from joins
            ->get()
            ->map(fn (ActionPlan $plan) => $this->transformPlan($plan));
    }

    /**
     * Shape a single ActionPlan the same way for every page that
     * displays them (admin index and the read-only KRA group pages).
     */
    protected function transformPlan(ActionPlan $plan): array
    {
        // `assignments` is loaded across every period this plan has ever
        // had, so a unit assigned in July and again in August comes back
        // as two rows for the same plan. Only the current period's
        // assignments should ever reach the frontend.
        $currentPeriodId = optional($plan->currentPeriod)->id;

        $currentAssignments = $currentPeriodId
            ? $plan->assignments->where('action_plan_period_id', $currentPeriodId)->values()
            : collect();

        return [
            'id' => $plan->id,
            'description' => $plan->description,

            // ActionPlan no longer stores its own start/end dates — the
            // current reporting period is now the source of truth for
            // the plan's schedule. Kept as flat keys for consumers that
            // only need a quick date range.
            'start_date' => optional($plan->currentPeriod)->period_start?->toDateString(),
            'end_date' => optional($plan->currentPeriod)->period_end?->toDateString(),

            // Full period details, for pages that want to display the
            // reporting period (month/year, status) rather than just a
            // raw date range.
            'period' => $plan->currentPeriod ? [
                'id' => $plan->currentPeriod->id,
                'month' => $plan->currentPeriod->month,
                'year' => $plan->currentPeriod->year,
                'period_start' => $plan->currentPeriod->period_start?->toDateString(),
                'period_end' => $plan->currentPeriod->period_end?->toDateString(),
                'status' => $plan->currentPeriod->status,
            ] : null,

            // Action Plan Calculated Progress
            'overall_progress' => $plan->overall_progress,

            // KPI information mapped with SubKra data acting as the group 'kra'
            'kpi' => $plan->kpi ? [
                'id' => $plan->kpi->id,
                'code' => $plan->kpi->code,
                'name' => $plan->kpi->name,
                'target' => $plan->kpi->target,
                'overall_progress' => $plan->kpi->overall_progress,
                'kra' => $plan->kpi->subkra ? [
                    'id' => $plan->kpi->subkra->id,
                    'code' => $plan->kpi->subkra->code,
                    'name' => $plan->kpi->subkra->name,
                ] : null,
            ] : null,

            'responsible_unit_ids' => $currentAssignments
                ->pluck('responsible_unit_id')
                ->values(),

            // Mapped to include pivot progress, status, category, and submission check for frontend display
            'responsible_units' => $currentAssignments->map(function ($assignment) {
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

            'assignments' => $currentAssignments->map(function ($assignment) {
                return [
                    'id' => $assignment->id,
                    'responsible_unit_id' => $assignment->responsible_unit_id,
                    'unit_code' => $assignment->responsibleUnit?->code,
                    'unit_name' => $assignment->responsibleUnit?->name,
                    'progress_percentage' => $assignment->progress_percentage,
                    'status' => $assignment->status,
                    'submitted_at' => $assignment->submitted_at,
                ];
            })->values(),
        ];
    }
}