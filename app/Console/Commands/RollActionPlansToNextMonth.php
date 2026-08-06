<?php

namespace App\Console\Commands;

use App\Models\InnovativeActionPlan\ActionPlan;
use Carbon\Carbon;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:roll-action-plans-to-next-month')]
#[Description('Command description')]
class RollActionPlansToNextMonth extends Command
{
    /**
     * Execute the console command.
     */
  public function handle()
{
    ActionPlan::query()->update([
        'start_date' => Carbon::now()->startOfMonth(),
        'end_date' => Carbon::now()->endOfMonth(),
    ]);

    $this->info('Action Plans updated for the current month.');
}
}
