<?php

namespace App\Models\ResponsibleUnit;

use App\Models\Assignment\ActionPlanAssignment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Units extends Model
{
    protected $fillable = [
        'code',
        'name',
        'category',
        'order_no',
    ];

    /**
     * The assignments assigned to this responsible unit.
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(ActionPlanAssignment::class, 'responsible_unit_id');
    }
}