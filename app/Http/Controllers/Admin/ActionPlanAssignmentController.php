<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\InnovativeActionPlan\ActionPlan as InnovativeActionPlanActionPlan;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\kra;
use App\Models\ResponsibleUnit\Units;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ActionPlanAssignmentController extends Controller
{
    /**
     * Display a listing of the action plan assignments scoped to the user's unit.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $unitId = $user->unit_id; // Adjust field name if your user unit foreign key is named differently (e.g., $user->responsible_unit_id)

        // 1. Build base query for Action Plans
        $actionPlanQuery = InnovativeActionPlanActionPlan::with([
            'kpi:id,kra_id,code,name,target',
            'kpi.kra:id,code,name',
            'assignments.responsibleUnit:id,name,code,category'
        ])->orderBy('order_no');

        // Filter assignments strictly to the authenticated user's unit if they are not an admin
        if ($user->role !== 'admin') {
            $actionPlanQuery->whereHas('assignments', function ($q) use ($unitId) {
                $q->where('responsible_unit_id', $unitId);
            });
        }

        $actionPlans = $actionPlanQuery->get()->map(function (InnovativeActionPlanActionPlan $plan) use ($user, $unitId) {
            // Filter assignments array inside each plan so users only see their own unit's assignment record
            $assignments = $plan->assignments;
            if ($user->role !== 'admin') {
                $assignments = $assignments->where('responsible_unit_id', $unitId);
            }

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

                'responsible_unit_ids' => $assignments
                    ->pluck('responsible_unit_id')
                    ->values(),

                // Full Unit objects needed by TanStack column rendering
                'responsible_units' => $assignments
                    ->pluck('responsibleUnit')
                    ->filter()
                    ->values(),

                // Individual assignment progress breakdown
                'assignments' => $assignments->map(function ($assignment) {
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
        });

        // 2. Fetch KPIs scoped to assigned action plans if non-admin
        $kpiQuery = Kpi::query();
        if ($user->role !== 'admin') {
            $kpiQuery->whereHas('actionPlans.assignments', function ($q) use ($unitId) {
                $q->where('responsible_unit_id', $unitId);
            });
        }

        $kpis = $kpiQuery->get()->map(function ($kpi) {
            return [
                'id' => $kpi->id,
                'kra_id' => $kpi->kra_id,
                'code' => $kpi->code,
                'name' => $kpi->name,
                'target' => $kpi->target,
                'overall_progress' => $kpi->overall_progress,
            ];
        });

        // 3. Fetch KRAs scoped to active KPIs if non-admin
        $kraQuery = kra::select('id', 'code', 'name')->orderBy('order_no');
        if ($user->role !== 'admin') {
            $assignedKraIds = $kpis->pluck('kra_id')->unique()->filter();
            $kraQuery->whereIn('id', $assignedKraIds);
        }

        return Inertia::render('UnitAssignments/Index', [
            'actionPlans' => $actionPlans,
            'kras'        => $kraQuery->get(),
            'kpis'        => $kpis,
            'units'       => Units::select('id', 'code', 'name', 'category', 'order_no')
                                ->orderBy('order_no')
                                ->get(),
        ]);
    }

    /**
     * Update the progress and submission details.
     */
    public function update(Request $request, ActionPlanAssignment $actionPlanAssignment)
    {
        $validated = $request->validate([
            'progress_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'submission_remarks'  => ['nullable', 'string', 'max:2000'],
            'attachment'          => ['nullable', 'file', 'mimes:pdf,doc,docx,zip,png,jpg', 'max:10240'],
            'start_date'          => ['nullable', 'date'],
            'end_date'            => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        $newStatus = $validated['progress_percentage'] > 0 ? 'Submitted' : 'Not Submitted';

        $dataToUpdate = [
            'progress_percentage' => $validated['progress_percentage'],
            'submission_remarks'  => $validated['submission_remarks'] ?? null,
            'status'              => $newStatus,
            'submitted_at'        => now(),
        ];

        if (array_key_exists('start_date', $validated)) {
            $dataToUpdate['start_date'] = $validated['start_date'];
        }

        if (array_key_exists('end_date', $validated)) {
            $dataToUpdate['end_date'] = $validated['end_date'];
        }

        if ($request->hasFile('attachment')) {
            $dataToUpdate['attachment_path'] = $request->file('attachment')->store('action_plan_submissions', 'public');
        }

        $actionPlanAssignment->update($dataToUpdate);

        return Redirect::back()->with('success', 'Action plan progress updated successfully.');
    }
}