<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\KeyResultArea\Kra;
use App\Models\ResponsibleUnit\Units;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use App\Models\Assignment\ActionPlanAssignment;
use App\Models\SubKeyResultsArea\SubKra;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $role
 * @property int|null $responsible_unit_id
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'responsible_unit_id',
    'subkra_id',
])]
#[Hidden([
    'password',
    'two_factor_secret',
    'two_factor_recovery_codes',
    'remember_token',
])]
class User extends Authenticatable implements PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Responsible Unit this user belongs to.
     */
    public function responsibleUnit(): BelongsTo
    {
        return $this->belongsTo(Units::class, 'responsible_unit_id');
    }

    /**
     * KRAs this user is assigned to review.
     */
    public function kras(): BelongsToMany
    {
        return $this->belongsToMany(
            Kra::class,
            'kra_user'
        )->withTimestamps();
    }

    /**
     * Check if the user is an administrator.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if the user is a planning officer.
     */
    public function isPlanningOfficer(): bool
    {
        return $this->role === 'planning_officer';
    }

    /**
     * Check if the user is a KRA in-charge.
     */
    public function isKraIncharge(): bool
    {
        return $this->role === 'kra_incharge';
    }

    public function subKra(): BelongsTo
{
    return $this->belongsTo(SubKra::class, 'subkra_id');
}

    /**
     * Check if the user belongs to a responsible unit.
     */
    public function isResponsibleUnit(): bool
    {
        return $this->role === 'responsible_unit';
    }

    /**
     * Check if the user is a viewer.
     */
    public function isViewer(): bool
    {
        return $this->role === 'viewer';
    }

    public function reviewedAssignments(): HasMany
{
    return $this->hasMany(
        ActionPlanAssignment::class,
        'reviewed_by',
        'id'
    );
}
}