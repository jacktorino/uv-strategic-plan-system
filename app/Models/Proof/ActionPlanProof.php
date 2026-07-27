<?php

namespace App\Models\Proof;

use App\Models\Assignment\ActionPlanAssignment;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActionPlanProof extends Model
{
    protected $fillable = [
        'assignment_id',
        'submitted_by',
        'file_name',
        'file_path',
        'mime_type',
        'file_size',
        'remarks',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(ActionPlanAssignment::class);
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }
}