<?php

namespace App\Models\InnovativeActionPlan;

use App\Models\ActionPlanPeriod;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\ResponsibleUnit; // Adjust namespace if your model is in Admin\ResponsibleUnit
use App\Models\ResponsibleUnit\Units;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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
     * Responsible Units assigned to this Action Plan (via ActionPlanAssignment).
     */
    public function responsibleUnits(): HasManyThrough
    {
        return $this->hasManyThrough(
            Units::class,
            ActionPlanAssignment::class,
            'action_plan_id',       // Foreign key on ActionPlanAssignment table
            'id',                   // Foreign key on ResponsibleUnit table
            'id',                   // Local key on ActionPlan table
            'responsible_unit_id'   // Local key on ActionPlanAssignment table
        );
    }

    /**
     * Monthly reporting periods.
     */
    public function periods(): HasMany
    {
        return $this->hasMany(ActionPlanPeriod::class);
    }

    public function period(): HasOne
    {
        return $this->hasOne(ActionPlanPeriod::class)->latestOfMany();
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