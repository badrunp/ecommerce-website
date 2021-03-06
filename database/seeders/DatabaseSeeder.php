<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        \App\Models\Backend\Category::factory(10)->create();
        \App\Models\Backend\Color::factory(10)->create();
        \App\Models\Backend\Size::factory(10)->create();
        \App\Models\Backend\Brand::factory(10)->create();
    }
}
