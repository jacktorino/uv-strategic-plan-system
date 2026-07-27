<?php

namespace App\Models\KeyResultArea;

use App\Models\KeyPerfomanceIndicator\Kpi;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class kra extends Model
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

     public function inCharges(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'kra_user'
        )->withTimestamps();
    }
}