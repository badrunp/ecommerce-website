<?php

namespace Database\Factories\Backend;

use App\Models\Backend\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

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
