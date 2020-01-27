<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{

    public function authorize()
    {
        return true; //Only authorize user can do this operation if false then unauthorize user can do
    }

    public function rules()
    {
        return [
            'name' => 'required|max:255|unique:products',
            'description' => 'required',
            'price' => 'required|max:10',
            'stock' => 'required|max:6',
            'discount' => 'required|max:2'
        ];
    }
}
