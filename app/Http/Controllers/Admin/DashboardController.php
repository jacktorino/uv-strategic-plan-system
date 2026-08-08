<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\ActionPlanPeriod;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Statuses that count as "submitted" for reporting purposes.
     * Matches ActionPlanAssignmentController@updateProgress and the
     * store()/update() defaults in ActionPlanController.
     */
    private const SUBMITTED_STATUSES = ['Submitted', 'Approved', 'Rejected'];

    /**
     * Display the admin dashboard with real-time strategic plan metrics.
     */
    public function index(): Response
    {
        $actionPlans = ActionPlan::with([
            'kpi.kra',
            'assignments.responsibleUnit',
        ])->get();

        $activeSubmissionsCount = 0;

        // Aggregate by KPI id and KRA id (not code/name — those can be
        // null or collide across records, silently merging unrelated rows).
        $kpiMap = [];
        $kraMap = [];

        foreach ($actionPlans as $plan) {
            $assignments = $plan->assignments;
            $unitCount = $assignments->count();
            $totalProgress = 0;

            foreach ($assignments as $assignment) {
                $progress = (int) ($assignment->progress_percentage ?? 0);
                $totalProgress += $progress;

                if (in_array($assignment->status, self::SUBMITTED_STATUSES, true)) {
                    $activeSubmissionsCount++;
                }
            }

            $planProgress = $unitCount > 0 ? (int) round($totalProgress / $unitCount) : 0;

            if ($plan->kpi) {
                $kpiId = $plan->kpi->id;
                $kpiMap[$kpiId] ??= [
                    'name' => $plan->kpi->code ?? $plan->kpi->name,
                    'total' => 0,
                    'count' => 0,
                ];
                $kpiMap[$kpiId]['total'] += $planProgress;
                $kpiMap[$kpiId]['count']++;

                $kra = $plan->kpi->kra;
                if ($kra) {
                    $kraMap[$kra->id] ??= [
                        'kra' => $kra->code ?? $kra->name,
                        'total' => 0,
                        'count' => 0,
                    ];
                    $kraMap[$kra->id]['total'] += $planProgress;
                    $kraMap[$kra->id]['count']++;
                }
            }
        }

        $kpiStats = collect($kpiMap)->map(fn ($item) => [
            'name' => $item['name'],
            'progress' => $item['count'] > 0 ? (int) round($item['total'] / $item['count']) : 0,
        ])->values();

        $kraStats = collect($kraMap)->map(fn ($item) => [
            'kra' => $item['kra'],
            'progress' => $item['count'] > 0 ? (int) round($item['total'] / $item['count']) : 0,
        ])->values();

        // Real trend: average assignment progress per reporting period
        // (month/year), across every action plan — not a fixed mock.
        $assignmentTable = (new ActionPlanAssignment)->getTable();
        $periodTable = (new ActionPlanPeriod)->getTable();

        $overallProgressTrend = ActionPlanAssignment::query()
            ->join($periodTable, "{$assignmentTable}.action_plan_period_id", '=', "{$periodTable}.id")
            ->selectRaw("{$periodTable}.year as year, {$periodTable}.month as month, AVG({$assignmentTable}.progress_percentage) as avg_progress")
            ->groupBy("{$periodTable}.year", "{$periodTable}.month")
            ->orderBy("{$periodTable}.year")
            ->orderBy("{$periodTable}.month")
            ->get()
            ->map(fn ($row) => [
                'month' => Carbon::createFromDate((int) $row->year, (int) $row->month, 1)->format('M Y'),
                'progress' => (int) round($row->avg_progress ?? 0),
            ])
            ->take(-6) // most recent 6 reporting periods
            ->values();

        return Inertia::render('admin/dashboard', [
            'activeSubmissionsCount' => $activeSubmissionsCount,
            'totalUsersCount' => User::count(),
            'totalKPICount' => Kpi::count(),
            'totalActionPlanCount' => $actionPlans->count(),
            'kpiStats' => $kpiStats,
            'kraStats' => $kraStats,
            'overallProgressTrend' => $overallProgressTrend,
        ]);
    }
}