<?php

namespace App\Models\InnovativeActionPlan;

use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\Assignment\ActionPlanAssignment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionPlan extends Model
{
    protected $fillable = [
        'kpi_id',
        'description',
        'start_date',
        'end_date',
        'order_no',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
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
     * Real-time progress.
     */
    public function getProgressAttribute(): float
    {
        $total = $this->assignments()->count();

        $approved = $this->assignments()
            ->where('status', 'Approved')
            ->count();

        return $total > 0
            ? round(($approved / $total) * 100, 2)
            : 0;
    }
}