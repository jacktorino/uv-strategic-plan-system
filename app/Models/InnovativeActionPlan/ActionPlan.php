<?php

namespace App\Models\InnovativeActionPlan;

use App\Models\ActionPlanPeriod;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\KeyPerformanceIndicator\Kpi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ActionPlan extends Model
{
    protected $fillable = [
        'kpi_id',
        'description',
        'order_no',
    ];

    public function kpi(): BelongsTo
    {
        return $this->belongsTo(Kpi::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(ActionPlanAssignment::class);
    }

    /**
     * Monthly reporting periods.
     */
    public function periods(): HasMany
    {
        return $this->hasMany(ActionPlanPeriod::class);
    }

    /**
     * Current month's reporting period.
     */
    public function currentPeriod(): HasOne
    {
        return $this->hasOne(ActionPlanPeriod::class)
            ->where('month', now()->month)
            ->where('year', now()->year);
    }

    /**
     * Overall progress, averaged across each assignment's progress_percentage.
     */
    public function getOverallProgressAttribute(): float
    {
        $total = $this->assignments()->count();

        if ($total === 0) {
            return 0;
        }

        $sum = $this->assignments()->sum('progress_percentage');

        return round($sum / $total, 2);
    }
}