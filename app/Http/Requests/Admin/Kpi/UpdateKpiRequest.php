<?php

namespace App\Http\Requests\Admin\Kpi;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateKpiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kra_id' => ['required', 'exists:kras,id'],
            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('kpis', 'code')
                    ->where('kra_id', $this->kra_id)
                    ->ignore($this->route('kpi')),
            ],
            'name' => ['required', 'string', 'max:255'],
            'order_no' => ['required', 'integer', 'min:0'],
        ];
    }
}