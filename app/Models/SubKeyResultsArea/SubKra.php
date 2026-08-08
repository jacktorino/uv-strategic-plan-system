<?php

namespace App\Models\SubKeyResultsArea;

use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\Kra;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubKra extends Model
{

  protected $table = 'subkras'; 
    protected $fillable = [
        'user_id',
        'kra_id',
        'code',
        'name',
        'order_no',
    ];

        public function kpis(): HasMany
    {
        return $this->hasMany(Kpi::class);
    }

    public function kra(): BelongsTo
    {
        return $this->belongsTo(Kra::class);
    }
     public function inCharge(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}