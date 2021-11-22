<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ColorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:colors,name,' . optional($this->color)->id,
            'code' => 'required|unique:colors,code,' . optional($this->color)->id
        ];
    }

    public function prepareForValidation(){
        $this->merge([
            'name' => ucfirst($this->name),
            'slug' => Str::slug($this->name),
            'code' => strtolower($this->code)
        ]);

    }
}
