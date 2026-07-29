<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Kpi\StoreKpiRequest;
use App\Http\Requests\Admin\Kpi\UpdateKpiRequest;
use App\Models\KeyPerformanceIndicator\Kpi;
use App\Models\KeyResultArea\Kra;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class KpiController extends Controller
{
    public function index(): Response
    {
        $kpis = Kpi::with('kra:id,name')
            ->orderBy('order_no')
            ->get();

        return Inertia::render('admin/kpi/index', [
            'kpis' => $kpis,
            'kras' => Kra::select('id', 'code', 'name')->orderBy('order_no')->get(),
        ]);
    }

    public function store(StoreKpiRequest $request): RedirectResponse
    {
        Kpi::create($request->validated());

        return redirect()->route('kpis.index')->with('success', 'KPI created.');
    }

    public function update(UpdateKpiRequest $request, Kpi $kpi): RedirectResponse
    {
        $kpi->update($request->validated());

        return redirect()->route('kpis.index')->with('success', 'KPI updated.');
    }

    public function destroy(Kpi $kpi): RedirectResponse
    {
        $kpi->delete();

        return redirect()->route('kpis.index')->with('success', 'KPI deleted.');
    }
}
