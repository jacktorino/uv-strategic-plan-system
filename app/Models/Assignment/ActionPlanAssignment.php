<?php

namespace App\Models\Assignment;

use App\Models\ActionPlanPeriod;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\Proof\ActionPlanProof;
use App\Models\ResponsibleUnit\Units;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActionPlanAssignment extends Model
{
    protected $fillable = [
        'action_plan_id',
        'action_plan_period_id',

        'responsible_unit_id',

        'progress_percentage',
        'status',

        'submitted_at',
        'submission_remarks',

        'reviewed_by',
        'reviewed_at',

        'remarks',
        'attachment_path',
    ];

    protected $casts = [
        'progress_percentage' => 'integer',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    /**
     * Permanent Action Plan.
     */
    public function actionPlan(): BelongsTo
    {
        return $this->belongsTo(ActionPlan::class);
    }

    /**
     * Monthly reporting period.
     */
    public function period(): BelongsTo
    {
        return $this->belongsTo(
            ActionPlanPeriod::class,
            'action_plan_period_id'
        );
    }

    /**
     * Responsible Unit.
     */
    public function responsibleUnit(): BelongsTo
    {
        return $this->belongsTo(Units::class);
    }

    /**
     * Reviewer.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Supporting documents.
     */
    public function proofs(): HasMany
    {
        return $this->hasMany(ActionPlanProof::class, 'assignment_id');
    }

    /**
     * Convenience helper.
     */
    public function getIsSubmittedAttribute(): bool
    {
        return $this->status !== 'Not Submitted';
    }

    /**
     * Convenience helper.
     */
    public function getIsApprovedAttribute(): bool
    {
        return $this->status === 'Approved';
    }
}