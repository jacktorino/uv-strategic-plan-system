<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\TransformsActionPlans;
use App\Models\InnovativeActionPlan\ActionPlan;
use App\Models\SubKeyResultsArea\SubKra;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubKraController extends Controller
{
    use TransformsActionPlans;

    /**
     * Display the dynamic Sub-KRA page.
     * Restricts non-admin users to only view their assigned Sub-KRA data.
     */
    public function show(Request $request, string $param1, ?string $param2 = null): Response
    {
        $requestedCode = $param2 ?? $param1;
        $user = $request->user();

        // 1. Get the authenticated user's assigned code (Sub-KRA or Unit code)
        $userCode = $user->subkra_code 
            ?? $user->code 
            ?? optional($user->responsibleUnit)->code;

        // 2. Check if the user is an admin
        $isAdmin = $user->is_admin || $user->role === 'admin';

        // 3. Dynamic Enforcement: Non-admin users are restricted to "what is theirs"
        if (!$isAdmin && $userCode) {
            // Option A: Automatically force $code to be the user's assigned code
            $code = $userCode;

            // Option B: If you prefer blocking with 403 when they attempt to visit another code, uncomment below:
            /*
            if ($requestedCode !== $userCode) {
                abort(403, "You are only authorized to view Sub-KRA {$userCode}.");
            }
            */
        } else {
            $code = $requestedCode;
        }

        // 4. Fetch the SubKra matching the allowed code
        $subkra = SubKra::with('kra')
            ->where('code', $code)
            ->firstOrFail();

        // 5. Fetch Action Plans and filter by the current period
        $actionPlans = ActionPlan::with([
            'currentPeriod',
            'kpi:id,subkra_id,code,name,target',
            'kpi.subkra:id,kra_id,code,name',
            'assignments.responsibleUnit:id,name,code,category',
        ])
        ->whereHas('kpi', function ($query) use ($subkra) {
            $query->where('subkra_id', $subkra->id)
                  ->orWhere('code', 'LIKE', $subkra->code . '%');
        })
        ->orderBy('order_no', 'asc')
        ->get()
        ->map(fn (ActionPlan $plan) => $this->transformPlan($plan));

        // 6. Return Inertia view with user's specific data
        return Inertia::render('subkra/Index', [
            'subkra' => [
                'id' => $subkra->id,
                'code' => $subkra->code,
                'name' => $subkra->name,
                'kra' => $subkra->kra ? [
                    'id' => $subkra->kra->id,
                    'code' => $subkra->kra->code,
                    'name' => $subkra->kra->name,
                ] : null,
            ],
            'actionPlans' => $actionPlans,
        ]);
    }
}