<?php

use App\Http\Controllers\Admin\ActionPlanAssignmentController;
use App\Http\Controllers\Admin\ActionPlanController;
use App\Http\Controllers\Admin\KpiController;
use App\Http\Controllers\Admin\ResponsibleUnitController;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\KRA\CommunityController;
use App\Http\Controllers\KRA\GovernanceController;
use App\Http\Controllers\KRA\ResearchController;
use App\Http\Controllers\KRA\StudentsController;
use App\Http\Controllers\KRA\TeachingController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// --- DEMO / QUICK LOGIN ROUTES ---
Route::prefix('demo')->name('demo.')->group(function () {
    // 1. Direct switch by User ID
    Route::get('/switch/{user}', function (User $user) {
        Auth::login($user);
        request()->session()->regenerate();
        return redirect()->route('dashboard');
    })->name('switch');

    // 2. Switch by Role / Type
    Route::get('/login-as/{role}', function (string $role) {
        $user = User::where('role', $role)->first() ?? User::first();
        if ($user) {
            Auth::login($user);
            request()->session()->regenerate();
        }
        return redirect()->route('dashboard');
    })->name('login-as');
});


Route::middleware('guest')->group(function () {
    Route::inertia('/', 'auth/login')->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/kra/governance', [GovernanceController::class, 'index'])->name('kra.governance');
    
    Route::get('/kra/research', [ResearchController::class, 'index'])->name('kra.research');
    Route::get('/kra/teaching', [TeachingController::class, 'index'])->name('kra.teaching');
    Route::get('/kra/community', [CommunityController::class, 'index'])->name('kra.community');
    Route::get('/kra/students', [StudentsController::class, 'index'])->name('kra.students');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('responsible-units', ResponsibleUnitController::class);
    Route::resource('accounts', UserController::class);
    Route::resource('kpis', KpiController::class);
    Route::resource('action-plans', ActionPlanController::class);

    // --- ASSIGNED UNIT SUBMISSIONS ---
    Route::get('/unit-assignments', [ActionPlanAssignmentController::class, 'index'])
        ->name('unit-assignments.index');

    Route::put('/unit-assignments/{assignment}', [ActionPlanAssignmentController::class, 'updateProgress'])
        ->name('unit-assignments.update-progress');
});

require __DIR__.'/settings.php';