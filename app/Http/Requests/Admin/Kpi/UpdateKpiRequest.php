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
            'subkra_id' => ['required', 'exists:subkras,id'],
            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('kpis', 'code')
                    ->where('subkra_id', $this->subkra_id)
                    ->ignore($this->route('kpi')),
            ],
            'name' => ['required', 'string', 'max:255'],
            'order_no' => ['required', 'integer', 'min:0'],
        ];
    }
}