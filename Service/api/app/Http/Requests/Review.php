<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "customer" => "required",
            "star" => "required|integer|between:0,5",
            "review" => "required"
        ];
    }
}
