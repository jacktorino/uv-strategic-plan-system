<?php

namespace App\Http\Controllers\KRA;


use App\Http\Controllers\Concerns\TransformsActionPlans;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class GovernanceController extends Controller
{
    use TransformsActionPlans;

    /**
     * Read-only view of Action Plans belonging to the "Governance" KRA
     * group (codes 1.1 - 1.8). No create/edit/delete controls are exposed
     * on this page — it only renders progress.
     */
    public function index(): Response
    {
        return Inertia::render('kra/governance/Index', [
            'actionPlans' => $this->actionPlansForKraGroup('1.'),
        ]);
    }
}