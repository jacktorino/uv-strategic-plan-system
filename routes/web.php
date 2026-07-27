<?php

use App\Http\Controllers\Admin\ResponsibleUnitController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\KRA\CommunityController;
use App\Http\Controllers\KRA\GovernanceController;
use App\Http\Controllers\KRA\ResearchController;
use App\Http\Controllers\KRA\StudentsController;
use App\Http\Controllers\KRA\TeachingController;
use Illuminate\Support\Facades\Route;

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

    Route::resource(
        'responsible-units',
        ResponsibleUnitController::class
    );

        Route::resource(
        'accounts',
        UserController::class
    );

});

require __DIR__.'/settings.php';
