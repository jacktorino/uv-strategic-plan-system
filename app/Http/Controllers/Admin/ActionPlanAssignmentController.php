<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assignment\ActionPlanAssignment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ActionPlanAssignmentController extends Controller
{
    /**
     * Display a listing of the action plan assignments.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $query = ActionPlanAssignment::with([
            'actionPlan.kpi.subkra.kra',
            'responsibleUnit',
            'period',
        ])
            // Join tables to sort by subkra code first, then action plan order_no
            ->join('action_plans', 'action_plan_assignments.action_plan_id', '=', 'action_plans.id')
            ->join('kpis', 'action_plans.kpi_id', '=', 'kpis.id')
            ->join('subkras', 'kpis.subkra_id', '=', 'subkras.id')
            ->orderBy('subkras.code', 'asc')
            ->orderBy('action_plans.order_no', 'asc')
            ->select('action_plan_assignments.*');

        // Restrict to responsible unit if not an admin
        if ($user->role !== 'admin') {
            $unitId = $this->getUnitIdForUser($user);

            if ($unitId) {
                $query->where('responsible_unit_id', $unitId);
            } else {
                $query->whereRaw('1 = 0');
            }
        }

        $assignments = $query
            ->get()
            ->map(fn (ActionPlanAssignment $assignment) => $this->transformAssignment($assignment));

        return Inertia::render('UnitAssignments/Index', [
            'assignments' => $assignments,
        ]);
    }

    /**
     * Display the specified action plan assignment.
     */
    public function show(Request $request, ActionPlanAssignment $assignment): Response
    {
        $this->authorizeUnitAccess($request->user(), $assignment);

        $assignment->load([
            'actionPlan.kpi.subkra.kra',
            'responsibleUnit',
            'period',
        ]);

        return Inertia::render('UnitAssignments/Show', [
            'assignment' => $this->transformAssignment($assignment),
        ]);
    }

    /**
     * Update the progress and submission details.
     */
    public function updateProgress(Request $request, ActionPlanAssignment $assignment): RedirectResponse
    {
        $this->authorizeUnitAccess($request->user(), $assignment);

        $validated = $request->validate([
            'progress_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'submission_remarks'  => ['nullable', 'string', 'max:2000'],
            'attachment'          => ['nullable', 'file', 'mimes:pdf,doc,docx,zip,png,jpg', 'max:10240'],
        ]);

        $progress = (int) $validated['progress_percentage'];
        $status = $progress > 0 ? 'Submitted' : 'Not Submitted';

        $dataToUpdate = [
            'progress_percentage' => $progress,
            'submission_remarks'  => $validated['submission_remarks'] ?? null,
            'status'              => $status,
            'submitted_at'        => now(),
        ];

        // Handle attachment file upload
        if ($request->hasFile('attachment')) {
            // Delete existing file if replacing
            if ($assignment->attachment_path && Storage::disk('public')->exists($assignment->attachment_path)) {
                Storage::disk('public')->delete($assignment->attachment_path);
            }

            $dataToUpdate['attachment_path'] = $request->file('attachment')->store('action_plan_submissions', 'public');
        }

        $assignment->update($dataToUpdate);

        return Redirect::back()->with('success', 'Progress updated successfully.');
    }

    /**
     * Download the attachment for an assignment.
     */
    public function downloadAttachment(Request $request, ActionPlanAssignment $assignment): BinaryFileResponse|RedirectResponse
    {
        $this->authorizeUnitAccess($request->user(), $assignment);

        if (!$assignment->attachment_path) {
            return Redirect::back()->with('error', 'File attachment not found.');
        }

        $filePath = storage_path('app/public/' . $assignment->attachment_path);

        if (!file_exists($filePath)) {
            return Redirect::back()->with('error', 'File attachment does not exist on disk.');
        }

        return response()->download($filePath);
    }

    /**
     * Helper to retrieve the user's unit ID.
     */
    private function getUnitIdForUser($user): ?int
    {
        return $user->responsible_unit_id ?? $user->responsibleUnit?->id;
    }

    /**
     * Helper to verify unit authorization for non-admins.
     */
    private function authorizeUnitAccess($user, ActionPlanAssignment $assignment): void
    {
        if ($user->role === 'admin') {
            return;
        }

        $unitId = $this->getUnitIdForUser($user);

        if (!$unitId || (int) $assignment->responsible_unit_id !== (int) $unitId) {
            abort(403, 'Unauthorized action. You can only access assignments belonging to your assigned unit.');
        }
    }

    /**
     * Helper to standardise payload formatting for Inertia.
     */
    private function transformAssignment(ActionPlanAssignment $assignment): array
    {
        return [
            'id'                  => $assignment->id,
            'progress_percentage' => (int) ($assignment->progress_percentage ?? 0),
            'submission_remarks'  => $assignment->submission_remarks ?? '',
            'status'              => $assignment->status ?? 'Not Submitted',

            'attachment_url' => $assignment->attachment_path
                ? asset('storage/' . $assignment->attachment_path)
                : null,

            'submitted_at' => optional($assignment->submitted_at)?->toDateTimeString(),

            'period' => $assignment->period ? [
                'id'                  => $assignment->period->id,
                'month'               => $assignment->period->month,
                'year'                => $assignment->period->year,
                'period_start'        => optional($assignment->period->period_start)?->toDateString(),
                'period_end'          => optional($assignment->period->period_end)?->toDateString(),
                'submission_start'    => optional($assignment->period->submission_start)?->toDateString(),
                'submission_deadline' => optional($assignment->period->submission_deadline)?->toDateString(),
                'review_start'        => optional($assignment->period->review_start)?->toDateString(),
                'review_end'          => optional($assignment->period->review_end)?->toDateString(),
                'approval_date'       => optional($assignment->period->approval_date)?->toDateString(),
                'status'              => $assignment->period->status,
            ] : null,

            'action_plan' => $assignment->actionPlan ? [
                'id'          => $assignment->actionPlan->id,
                'description' => $assignment->actionPlan->description ?? '',

                // Action Plan no longer stores start/end dates directly — the current
                // reporting period (attached to this assignment) is now the source
                // of truth for the plan's schedule.
                'start_date' => optional($assignment->period?->period_start)?->toDateString(),
                'end_date'   => optional($assignment->period?->period_end)?->toDateString(),

                'overall_progress' => $assignment->actionPlan->overall_progress ?? 0,

                'kpi' => $assignment->actionPlan->kpi ? [
                    'id'               => $assignment->actionPlan->kpi->id,
                    'code'             => $assignment->actionPlan->kpi->code ?? '',
                    'name'             => $assignment->actionPlan->kpi->name ?? '',
                    'overall_progress' => $assignment->actionPlan->kpi->overall_progress ?? 0,

                    // Map SubKra data onto 'kra' so frontend grouping reflects the sub-area
                    'kra' => $assignment->actionPlan->kpi->subkra ? [
                        'id'   => $assignment->actionPlan->kpi->subkra->id,
                        'code' => $assignment->actionPlan->kpi->subkra->code ?? '',
                        'name' => $assignment->actionPlan->kpi->subkra->name ?? '',
                    ] : null,

                    'subkra' => $assignment->actionPlan->kpi->subkra ? [
                        'id'   => $assignment->actionPlan->kpi->subkra->id,
                        'code' => $assignment->actionPlan->kpi->subkra->code ?? '',
                        'name' => $assignment->actionPlan->kpi->subkra->name ?? '',
                    ] : null,
                ] : null,
            ] : null,

            'responsible_unit' => $assignment->responsibleUnit ? [
                'id'       => $assignment->responsibleUnit->id,
                'code'     => $assignment->responsibleUnit->code ?? '',
                'name'     => $assignment->responsibleUnit->name ?? '',
                'category' => $assignment->responsibleUnit->category ?? '',
            ] : null,
        ];
    }
}