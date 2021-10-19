<?php

namespace App\Models\Backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'image', 'status'];

    public function scopeSorting($query, $sorting)
    {
        return $query->when($sorting, function ($query, $sorting) {
            if ($sorting === 'oldest') {
                return $query->orderBy('created_at', 'ASC');
            } else {
                return $query->orderBy('created_at', 'DESC');
            }
        }, function ($query) {
            return $query->orderBy('created_at', 'DESC');
        });
    }

    public function scopeSearch($query, $search){
        return $query->when($search, function($query, $search){
            return $query->where('name', 'like', '%'.$search.'%');
        });
    }
}
