<?php

namespace App\Http\Requests\Admin\ActionPlan;

use Illuminate\Foundation\Http\FormRequest;

class StoreActionPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kpi_id' => ['required', 'exists:kpis,id'],
            'description' => ['required', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'order_no' => ['required', 'integer', 'min:0'],
            'responsible_unit_ids' => ['array'],
            'responsible_unit_ids.*' => ['exists:units,id'],
        ];
    }
}