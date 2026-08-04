<?php

namespace App\Models\Assignment;

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

    public function actionPlan(): BelongsTo
    {
        return $this->belongsTo(ActionPlan::class);
    }

    public function responsibleUnit(): BelongsTo
    {
        return $this->belongsTo(Units::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function proofs(): HasMany
    {
        return $this->hasMany(ActionPlanProof::class, 'assignment_id');
    }
}