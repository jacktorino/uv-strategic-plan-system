<?php

namespace App\Models\KeyPerformanceIndicator;

use App\Models\ActionPlan\ActionPlan;
use App\Models\KeyResultArea\Kra;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kpi extends Model
{
    protected $fillable = [
        'kra_id',
        'code',
        'name',
        'order_no',
    ];

    public function kra(): BelongsTo
    {
        return $this->belongsTo(Kra::class);
    }

    public function actionPlans(): HasMany
    {
        return $this->hasMany(ActionPlan::class);
    }

    /**
     * Calculate KPI progress in real time.
     */
    public function getProgressAttribute(): float
    {
        $total = 0;
        $approved = 0;

        foreach ($this->actionPlans as $actionPlan) {
            $total += $actionPlan->assignments()->count();

            $approved += $actionPlan->assignments()
                ->where('status', 'Approved')
                ->count();
        }

        return $total > 0
            ? round(($approved / $total) * 100, 2)
            : 0;
    }
}