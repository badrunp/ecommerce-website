<?php 

namespace App\Traits;

trait QueryDatabaseTrait {
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
