<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;


use App\Models\ResponsibleUnit\Units;
use App\Models\SubKeyResultsArea\SubKra;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected array $roles = [
        ['value' => 'admin', 'label' => 'Admin'],
        ['value' => 'planning_officer', 'label' => 'Planning Officer'],
        ['value' => 'kra_incharge', 'label' => 'Kra Champion'],
        ['value' => 'subkra_incharge', 'label' => 'SubKra In-charge'],
        ['value' => 'viewer', 'label' => 'Viewer'],
    ];

    public function index(): Response
    {
        $users = User::with(['responsibleUnit:id,name', 'subKra:id,code,name'])
            ->orderBy('name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'responsible_unit' => $user->responsibleUnit,
                'sub_kra' => $user->subKra,
            ]);

        return Inertia::render('admin/user/index', [
            'users' => $users,
            'roles' => $this->roles,
            'units' => Units::select('id', 'name')
                ->orderBy('name')
                ->get(),
            'subkras' => SubKra::select('id', 'code', 'name')
                ->orderBy('code')
                ->get(),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $temporaryPassword = Str::password(12);

        $user = User::create([
            ...$request->validated(),
            'password' => Hash::make($temporaryPassword),
        ]);

        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account created');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->validated());

        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account updated.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account deleted.');
    }
}