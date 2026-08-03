<?php

namespace App\Http\Controllers\KRA;

use App\Http\Controllers\Concerns\TransformsActionPlans;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeachingController extends Controller
{
       use TransformsActionPlans;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('kra/teaching/Index', [
            'actionPlans' => $this->actionPlansForKraGroup('3.'),
        ]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
