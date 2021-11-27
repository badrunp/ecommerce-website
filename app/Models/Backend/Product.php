<?php

namespace App\Models\Backend;

use App\Traits\QueryDatabaseTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, QueryDatabaseTrait;

    protected $fillable = ['name', 'slug', 'regular_price', 'sale_price', 'quantity', 'sumary', 'description', 'category_id', 'status'];

    public function category(){

        return $this->belongsTo(Category::class);

    }

    public function sizes(){

        return $this->belongsToMany(Size::class, 'product_size');

    }

    public function colors(){

        return $this->belongsToMany(Color::class, 'color_product');

    }

    public function images(){

        return $this->hasMany(ProductImages::class);
            
    }


}
