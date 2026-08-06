<?php

namespace App\Models;

use App\Models\Assignment\ActionPlanAssignment;
use App\Models\InnovativeActionPlan\ActionPlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionPlanPeriod extends Model
{
    protected $fillable = [
        'action_plan_id',

        'month',
        'year',

        'period_start',
        'period_end',

        'submission_start',
        'submission_deadline',

        'review_start',
        'review_end',

        'approval_date',

        'status',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',

        'submission_start' => 'date',
        'submission_deadline' => 'date',

        'review_start' => 'date',
        'review_end' => 'date',

        'approval_date' => 'date',
    ];

    /**
     * Parent Action Plan.
     */
    public function actionPlan(): BelongsTo
    {
        return $this->belongsTo(ActionPlan::class);
    }

    /**
     * Assignments for this reporting period.
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(
            ActionPlanAssignment::class,
            'action_plan_period_id'
        );
    }

    /**
     * Check if submissions are currently allowed.
     */
    public function getIsSubmissionOpenAttribute(): bool
    {
        return today()->between(
            $this->submission_start,
            $this->submission_deadline
        );
    }

    /**
     * Check if review is currently ongoing.
     */
    public function getIsReviewOpenAttribute(): bool
    {
        return today()->between(
            $this->review_start,
            $this->review_end
        );
    }

    /**
     * Check if final approval date has passed.
     */
    public function getIsApprovedAttribute(): bool
    {
        return today()->gte($this->approval_date);
    }
}