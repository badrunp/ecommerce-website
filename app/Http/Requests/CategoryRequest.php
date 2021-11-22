<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class CategoryRequest extends FormRequest
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
            'name' => 'required|unique:categories,name,' . optional($this->category)->id,
            'image' => !$this->category ? 'nullable|mimes:jpg,png,jpeg|max:1024' : '',
            'newimage' => $this->category ? 'nullable|mimes:jpg,png,jpeg|max:1024' : ''
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
