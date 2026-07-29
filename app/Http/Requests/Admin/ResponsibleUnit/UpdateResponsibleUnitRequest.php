<?php

namespace App\Http\Requests\Admin\ResponsibleUnit;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateResponsibleUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $unit = $this->route('responsible_unit');

        return [

            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('units', 'code')
                    ->ignore($unit?->id),
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category' => [
                'required',
                Rule::in([
                    'Academic Units',
                    'Non-Academic Units',
                    'Satellite Campus',
                ]),
            ],

            'order_no' => [
                'required',
                'integer',
                'min:1',
            ],

        ];
    }
}
