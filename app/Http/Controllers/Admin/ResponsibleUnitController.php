<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ResponsibleUnit\StoreResponsibleUnitRequest;
use App\Http\Requests\Admin\ResponsibleUnit\UpdateResponsibleUnitRequest;
use App\Models\ResponsibleUnit\Units;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ResponsibleUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $units = Units::query()
            ->orderBy('order_no')
            ->get();

        return Inertia::render('admin/responsible-unit/index', [
            'units' => $units,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResponsibleUnitRequest $request): RedirectResponse
    {
        Units::create(
            $request->validated()
        );

        return redirect()
            ->route('responsible-units.index')
            ->with('success', 'Responsible unit created.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateResponsibleUnitRequest $request,
        Units $responsibleUnit
    ): RedirectResponse {
        $responsibleUnit->update(
            $request->validated()
        );

        return redirect()
            ->route('responsible-units.index')
            ->with('success', 'Responsible unit updated.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Units $responsibleUnit
    ): RedirectResponse {
        $responsibleUnit->delete();

        return redirect()
            ->route('responsible-units.index')
            ->with('success', 'Responsible unit deleted.');
    }
}
