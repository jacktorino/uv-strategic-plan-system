<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreResponsibleUnitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'code' => [
                'required',
                'string',
                'max:20',
                'unique:units,code',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category' => [
                'required',
                Rule::in([
                    'Academic College',
                    'Administrative Office',
                    'Academic Support Unit',
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