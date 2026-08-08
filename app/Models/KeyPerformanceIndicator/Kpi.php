<?php

namespace App\Models\KeyPerformanceIndicator;

use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\KeyResultArea\Kra;
use App\Models\SubKeyResultsArea\SubKra;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kpi extends Model
{
    protected $fillable = [
        'subkra_id',
        'code',
        'name',
        'order_no',
    ];

    public function subkra(): BelongsTo
    {
        return $this->belongsTo(SubKra::class);
    }

    public function actionPlans(): HasMany
    {
        return $this->hasMany(ActionPlan::class);
    }

    public function kra(): BelongsTo
{
    return $this->belongsTo(Kra::class);
}
    /**
     * KPI progress, averaged across its action plans' overall_progress.
     */
    public function getOverallProgressAttribute(): float
    {
        $actionPlans = $this->actionPlans;

        $total = $actionPlans->count();

        if ($total === 0) {
            return 0;
        }

        $sum = $actionPlans->sum(
            fn (ActionPlan $actionPlan) => $actionPlan->overall_progress
        );

        return round($sum / $total, 2);
    }
}