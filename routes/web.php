<?php

use App\Http\Controllers\Admin\DashboardController;
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

Route::middleware('guest')->group(function () {
    Route::inertia('/', 'auth/login')->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
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

    Route::post('/unit-assignments/{assignment}/update-progress', [ActionPlanAssignmentController::class, 'updateProgress'])
    ->name('unit-assignments.update-progress');
});

require __DIR__.'/settings.php';