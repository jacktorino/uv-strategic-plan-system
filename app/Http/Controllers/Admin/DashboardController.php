<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with real-time strategic plan metrics.
     */
    public function index(): Response
    {
        // 1. Fetch action plans with their assignments and KPI structures
        $actionPlans = ActionPlan::with([
            'kpi.kra',
            'assignments.responsibleUnit',
        ])->get();

        // 2. Active submissions count (assignments where status is submitted or progress is 100)
        $activeSubmissionsCount = 0;
        
        // Prepare KPI stats mapping
        $kpiMap = [];
        // Prepare KRA stats mapping
        $kraMap = [];

        foreach ($actionPlans as $plan) {
            // Calculate plan progress based on units/assignments average
            $assignments = $plan->assignments;
            $unitCount = $assignments->count();
            $totalProgress = 0;

            foreach ($assignments as $assignment) {
                $progress = (int) ($assignment->progress_percentage ?? 0);
                $totalProgress += $progress;

                if ($assignment->status === 'submitted' || !empty($assignment->submitted_at) || $progress === 100) {
                    $activeSubmissionsCount++;
                }
            }

            $planProgress = $unitCount > 0 ? (int) round($totalProgress / $unitCount) : 0;

            // Aggregate by KPI
            if ($plan->kpi) {
                $kpiKey = $plan->kpi->code ?? $plan->kpi->name;
                if (!isset($kpiMap[$kpiKey])) {
                    $kpiMap[$kpiKey] = ['name' => $kpiKey, 'total' => 0, 'count' => 0];
                }
                $kpiMap[$kpiKey]['total'] += $planProgress;
                $kpiMap[$kpiKey]['count']++;
            }

            // Aggregate by KRA
            $kra = $plan->kpi?->kra;
            if ($kra) {
                $kraKey = $kra->code ?? $kra->name;
                if (!isset($kraMap[$kraKey])) {
                    $kraMap[$kraKey] = ['kra' => $kraKey, 'total' => 0, 'count' => 0];
                }
                $kraMap[$kraKey]['total'] += $planProgress;
                $kraMap[$kraKey]['count']++;
            }
        }

        // Format KPI stats for the bar chart
        $kpiStats = collect($kpiMap)->map(function ($item) {
            return [
                'name' => $item['name'],
                'progress' => $item['count'] > 0 ? (int) round($item['total'] / $item['count']) : 0,
            ];
        })->values();

        // Format KRA stats for the pie chart
        $kraStats = collect($kraMap)->map(function ($item) {
            return [
                'kra' => $item['kra'],
                'progress' => $item['count'] > 0 ? (int) round($item['total'] / $item['count']) : 0,
            ];
        })->values();

        // Total registered system users
        $totalUsersCount = User::count();

        // Overall progress trend mockup or calculated over time if historical data exists
        $overallProgressTrend = [
            ['month' => 'Jan', 'progress' => 15],
            ['month' => 'Feb', 'progress' => 30],
            ['month' => 'Mar', 'progress' => 45],
            ['month' => 'Apr', 'progress' => 60],
            ['month' => 'May', 'progress' => 75],
            ['month' => 'Jun', 'progress' => (int) round($actionPlans->avg(fn($p) => $p->overall_progress) ?? 0)],
        ];

        return Inertia::render('admin/dashboard', [
            'activeSubmissionsCount' => $activeSubmissionsCount,
            'totalUsersCount' => $totalUsersCount,
            'kpiStats' => $kpiStats,
            'kraStats' => $kraStats,
            'overallProgressTrend' => $overallProgressTrend,
        ]);
    }
}