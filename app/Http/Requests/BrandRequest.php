<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class BrandRequest extends FormRequest
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
            'name' => 'required|unique:brands,name,' . optional($this->brand)->id,
            'image' => !$this->brand ? 'nullable|mimes:jpg,png,jpeg|max:1024' : '',
            'newimage' => $this->brand ? 'nullable|mimes:jpg,png,jpeg|max:1024' : '',
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'name' => ucfirst($this->name),
            'slug' => Str::slug($this->name),
            'status' => 'active',
            'is_home' => $this->boolean('is_home')
        ]);
    }
}
