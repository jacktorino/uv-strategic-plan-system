<?php

namespace App\Models\KeyResultArea;

use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\SubKeyResultsArea\SubKra;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kra extends Model
{
    protected $fillable = [
        'user_id', // Added for the KRA Champion
        'code',
        'name',
        'order_no',
    ];

    public function champion(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function subKras(): HasMany
    {
        return $this->hasMany(SubKra::class);
    }

}