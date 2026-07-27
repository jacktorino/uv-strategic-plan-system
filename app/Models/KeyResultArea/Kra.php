<?php

namespace App\Models\KeyResultArea;

use App\Models\KeyPerfomanceIndicator\Kpi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kra extends Model
{
    protected $fillable = [
        'code',
        'name',
        'order_no',
    ];

    public function kpis(): HasMany
    {
        return $this->hasMany(Kpi::class);
    }
}