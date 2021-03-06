<?php

namespace App\Models\Backend;

use App\Traits\QueryDatabaseTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, QueryDatabaseTrait;

    protected $fillable = ['name', 'slug', 'image', 'is_home', 'status'];

    public function products(){

        return $this->hasMany(Product::class);

    }

}
