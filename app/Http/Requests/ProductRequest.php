<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ProductRequest extends FormRequest
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
            'name' => 'required|unique:products,name,' . optional($this->product)->id,
            'regular_price' => 'required',
            'sale_price' => 'nullable',
            'quantity' => 'required',
            'description' => 'required',
            'sumary' => 'nullable',
            'category_id' => 'required',
            'sizes' => 'required',
            'colors' => 'required'
        ];
    }

    public function prepareForValidation()
    {

        $this->merge([
            'name' => $this->name,
            'slug' => Str::slug($this->name),
            'regular_price' => $this->regular_price,
            'sale_price' => $this->sale_price,
            'quantity' => $this->quantity,
            'description' => $this->description,
            'sumary' => $this->sumary,
            'category_id' => $this->category_id,
        ]);
    }
}
