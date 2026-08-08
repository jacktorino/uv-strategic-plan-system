<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('user')),
            ],
            'role' => ['required', 'string', 'in:admin,planning_officer,kra_incharge,subkra_incharge,responsible_unit,viewer'],
            'responsible_unit_id' => ['nullable', 'exists:units,id'],
            'subkra_id' => [
                'nullable',
                'required_if:role,subkra_incharge',
                'exists:subkras,id',
            ],
        ];
    }
}