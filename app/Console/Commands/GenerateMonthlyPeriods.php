<?php

namespace App\Console\Commands;

use App\Models\ActionPlanPeriod;
use App\Models\InnovativeActionPlan\ActionPlan;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMonthlyPeriods extends Command
{
    protected $signature = 'periods:generate';

    protected $description = 'Generate monthly reporting periods';

public function handle(): int
{
    $month = now()->month;
    $year = now()->year;

    foreach (ActionPlan::with('assignments')->get() as $plan) {

        $period = ActionPlanPeriod::firstOrCreate(

            [
                'action_plan_id' => $plan->id,
                'month' => $month,
                'year' => $year,
            ],

            [
                'period_start' => Carbon::create($year, $month, 1),

                'period_end' => Carbon::create($year, $month, 1)
                    ->endOfMonth(),

                'submission_start' => Carbon::create($year, $month, 1)
                    ->addMonth()
                    ->startOfMonth(),

                'submission_deadline' => Carbon::create($year, $month, 1)
                    ->addMonth()
                    ->startOfMonth()
                    ->addDays(5),

                'review_start' => Carbon::create($year, $month, 1)
                    ->addMonth()
                    ->startOfMonth(),

                'review_end' => Carbon::create($year, $month, 1)
                    ->addMonth()
                    ->startOfMonth()
                    ->addDays(5),

                'approval_date' => Carbon::create($year, $month, 1)
                    ->addMonth()
                    ->startOfMonth()
                    ->addDays(5),

                'status' => 'Open',
            ]
        );

        // Create assignments for this month's period
        foreach ($plan->assignments as $assignment) {

            $period->assignments()->firstOrCreate([
                'action_plan_id' => $plan->id,
                'responsible_unit_id' => $assignment->responsible_unit_id,
            ], [
                'progress_percentage' => 0,
                'status' => 'Not Yet Submitted',
            ]);
        }
    }

    $this->info('Monthly periods generated successfully.');

    return self::SUCCESS;
}
}