<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assignment\ActionPlanAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ActionPlanAssignmentController extends Controller
{
    /**
     * Display a listing of the action plan assignments.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = ActionPlanAssignment::with([
            'actionPlan.kpi.kra',
            'responsibleUnit'
        ]);

        // Restrict based on the user's responsible unit if they are not an admin
        if ($user->role !== 'admin') {
            $unitId = $user->responsible_unit_id;

            if (!$unitId && $user->responsibleUnit) {
                $unitId = $user->responsibleUnit->id;
            }

            if ($unitId) {
                $query->where('responsible_unit_id', $unitId);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        $assignments = $query->get()->map(function ($assignment) {
            return [
                'id' => $assignment->id,
                'progress_percentage' => (int) ($assignment->progress_percentage ?? 0),
                'submission_remarks' => $assignment->submission_remarks ?? '',
                'status' => $assignment->status ?? 'Not Submitted',
                'submitted_at' => $assignment->submitted_at,
                'action_plan' => $assignment->actionPlan ? [
                    'id' => $assignment->actionPlan->id,
                    'title' => $assignment->actionPlan->title ?? 'Untitled Action Plan',
                    'description' => $assignment->actionPlan->description ?? '',
                    'start_date' => $assignment->actionPlan->start_date ?? null,
                    'end_date' => $assignment->actionPlan->end_date ?? null,
                    'kpi' => $assignment->actionPlan->kpi ? [
                        'id' => $assignment->actionPlan->kpi->id,
                        'code' => $assignment->actionPlan->kpi->code ?? '',
                        'name' => $assignment->actionPlan->kpi->name ?? '',
                        'overall_progress' => $assignment->actionPlan->kpi->overall_progress ?? 0,
                        'kra' => $assignment->actionPlan->kpi->kra ? [
                            'id' => $assignment->actionPlan->kpi->kra->id,
                            'code' => $assignment->actionPlan->kpi->kra->code ?? '',
                            'name' => $assignment->actionPlan->kpi->kra->name ?? '',
                        ] : null,
                    ] : null,
                ] : null,
                'responsible_unit' => $assignment->responsibleUnit ? [
                    'id' => $assignment->responsibleUnit->id,
                    'code' => $assignment->responsibleUnit->code ?? '',
                    'name' => $assignment->responsibleUnit->name ?? '',
                    'category' => $assignment->responsibleUnit->category ?? '',
                ] : null,
            ];
        });

        return Inertia::render('UnitAssignments/Index', [
            'assignments' => $assignments,
        ]);
    }

    /**
     * Update the progress and submission details immediately.
     */
 public function updateProgress(Request $request, ActionPlanAssignment $assignment)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            $unitId = $user->responsible_unit_id;

            if (!$unitId && $user->responsibleUnit) {
                $unitId = $user->responsibleUnit->id;
            }

            if ($assignment->responsible_unit_id !== $unitId) {
                abort(403, 'Unauthorized action. You can only update assignments belonging to your assigned unit.');
            }
        }

        $validated = $request->validate([
            'progress_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'submission_remarks'  => ['nullable', 'string', 'max:2000'],
            'attachment'          => ['nullable', 'file', 'mimes:pdf,doc,docx,zip,png,jpg', 'max:10240'],
        ]);

        $progress = (int) $validated['progress_percentage'];

        // Directly map status based on progress without review requirements
        $status = $progress > 0 ? 'Submitted' : 'Not Submitted';

        $dataToUpdate = [
            'progress_percentage' => $progress,
            'submission_remarks'  => $validated['submission_remarks'] ?? null,
            'status'              => $status,
            'submitted_at'        => now(),
        ];

        if ($request->hasFile('attachment')) {
            $dataToUpdate['attachment_path'] = $request->file('attachment')->store('action_plan_submissions', 'public');
        }

        $assignment->update($dataToUpdate);

        return Redirect::back()->with('success', 'Progress updated successfully.');
    }
}