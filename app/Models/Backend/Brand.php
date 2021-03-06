<?php

namespace App\Models\Backend;

use App\Traits\QueryDatabaseTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory, QueryDatabaseTrait;

    protected $fillable = ['name', 'slug', 'image', 'is_home', 'status'];
}
