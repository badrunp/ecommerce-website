<?php

namespace App\Models\Backend;

use App\Traits\QueryDatabaseTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory, QueryDatabaseTrait;

    protected $fillable = ['name', 'slug', 'code', 'status'];

    public function products(){

        return $this->belongsToMany(Product::class, 'color_product');
        
    }
}
