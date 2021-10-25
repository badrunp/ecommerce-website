<?php

namespace Database\Factories\Backend;

use App\Models\Backend\Brand;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BrandFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Brand::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->text(10);
        $slug = Str::slug($name);
        return [
            'name' => $name,
            'slug' => $slug,
            'status' => 'active'
        ];
    }
}
