<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ActionPlan\StoreActionPlanRequest;
use App\Http\Requests\Admin\ActionPlan\UpdateActionPlanRequest;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\Kra;
use App\Models\ResponsibleUnit\Units;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ActionPlanController extends Controller
{
    public function index(): Response
    {
        $actionPlans = ActionPlan::with([
            'kpi:id,kra_id,code,name,target',
            'kpi.kra:id,code,name',
            'assignments.responsibleUnit:id,name,code,category'
        ])
            ->orderBy('order_no')
            ->get()
            ->map(function (ActionPlan $plan) {

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

                    // 1. ADDED BACK: Full Unit objects needed by TanStack column rendering
                    'responsible_units' => $plan->assignments
                        ->pluck('responsibleUnit')
                        ->filter()
                        ->values(),

                    // 2. Individual assignment progress breakdown
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
            });

        return Inertia::render('admin/action-plan/index', [
            'actionPlans' => $actionPlans,

            'kras' => Kra::select('id', 'code', 'name')
                ->orderBy('order_no')
                ->get(),

            'kpis' => Kpi::with('actionPlans.assignments')
                ->get()
                ->map(function ($kpi) {
                    return [
                        'id' => $kpi->id,
                        'kra_id' => $kpi->kra_id,
                        'code' => $kpi->code,
                        'name' => $kpi->name,
                        'target' => $kpi->target,
                        'overall_progress' => $kpi->overall_progress,
                    ];
                }),

            'units' => Units::select(
                'id',
                'code',
                'name',
                'category',
                'order_no'
            )
                ->orderBy('order_no')
                ->get(),
        ]);
    }

    public function store(StoreActionPlanRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $unitIds = $validated['responsible_unit_ids'] ?? [];
        unset($validated['responsible_unit_ids']);

        $actionPlan = ActionPlan::create($validated);

        foreach ($unitIds as $unitId) {
            ActionPlanAssignment::create([
                'action_plan_id' => $actionPlan->id,
                'responsible_unit_id' => $unitId,
                'progress_percentage' => 0,
                'status' => 'Not Submitted',
            ]);
        }

        return redirect()
            ->route('action-plans.index')
            ->with('success', 'Action plan created.');
    }

    public function update(UpdateActionPlanRequest $request, ActionPlan $actionPlan): RedirectResponse
    {
        $validated = $request->validated();
        $unitIds = $validated['responsible_unit_ids'] ?? [];
        unset($validated['responsible_unit_ids']);

        $actionPlan->update($validated);

        $existingUnitIds = $actionPlan->assignments()->pluck('responsible_unit_id')->all();
        $toAdd = array_diff($unitIds, $existingUnitIds);

        foreach ($toAdd as $unitId) {
            ActionPlanAssignment::create([
                'action_plan_id' => $actionPlan->id,
                'responsible_unit_id' => $unitId,
                'progress_percentage' => 0,
                'status' => 'Not Submitted',
            ]);
        }

        $actionPlan->assignments()
            ->where('status', 'Not Submitted')
            ->whereNotIn('responsible_unit_id', $unitIds)
            ->delete();

        return redirect()
            ->route('action-plans.index')
            ->with('success', 'Action plan updated.');
    }

    public function destroy(ActionPlan $actionPlan): RedirectResponse
    {
        $actionPlan->delete();

        return redirect()
            ->route('action-plans.index')
            ->with('success', 'Action plan deleted.');
    }
}