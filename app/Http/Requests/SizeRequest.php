<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class SizeRequest extends FormRequest
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
            'name' => 'required|unique:sizes,name,' . optional($this->size)->id,
        ];
    }

    protected function prepareForValidation(){

        $this->merge([
            'name' => ucfirst($this->name),
            'slug' => Str::slug($this->name)
        ]);

    }

}
