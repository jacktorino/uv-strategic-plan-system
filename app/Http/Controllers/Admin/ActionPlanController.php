<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ActionPlan\StoreActionPlanRequest;
use App\Http\Requests\Admin\ActionPlan\UpdateActionPlanRequest;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\Kra; // Adjust namespace if your KRA model location differs
use App\Models\ResponsibleUnit\Units;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ActionPlanController extends Controller
{
    public function index(): Response
    {
        $actionPlans = ActionPlan::with([
            'kpi:id,kra_id,code,name',
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

                    // KPI information
                    'kpi' => $plan->kpi ? [
                        'id' => $plan->kpi->id,
                        'code' => $plan->kpi->code,
                        'name' => $plan->kpi->name,
                        'kra' => $plan->kpi->kra ? [
                            'code' => $plan->kpi->kra->code,
                            'name' => $plan->kpi->kra->name,
                        ] : null,
                    ] : null,

                    'responsible_unit_ids' => $plan->assignments
                        ->pluck('responsible_unit_id')
                        ->values(),

                    'responsible_units' => $plan->assignments
                        ->pluck('responsibleUnit')
                        ->filter()
                        ->values(),
                ];
            });

        return Inertia::render('admin/action-plan/index', [
            'actionPlans' => $actionPlans,

            'kras' => Kra::select('id', 'code', 'name')
                ->orderBy('order_no')
                ->get(),

            'kpis' => Kpi::select('id', 'kra_id', 'code', 'name')
                ->orderBy('order_no')
                ->get(),

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

        // Only touch assignments still "Not Submitted" — preserve submitted/approved/rejected
        $existingUnitIds = $actionPlan->assignments()->pluck('responsible_unit_id')->all();
        $toAdd = array_diff($unitIds, $existingUnitIds);

        foreach ($toAdd as $unitId) {
            ActionPlanAssignment::create([
                'action_plan_id' => $actionPlan->id,
                'responsible_unit_id' => $unitId,
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
