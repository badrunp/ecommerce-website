<?php

namespace App\Models\Backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    use HasFactory;

    protected $table = "product_images";

    protected $fillable = ['image', 'product_id'];

    public function product(){

        return $this->belongsTo(Product::class);

    }

}
