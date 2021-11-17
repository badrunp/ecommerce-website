<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Category;
use App\Models\Backend\Color;
use App\Models\Backend\Product;
use App\Models\Backend\Size;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')->sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name', 'slug', 'category_id', 'quantity', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Product/Product', [
            'products' => $products,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {

        $sizes = collect(Size::where('status', 'active')->get())->map(function($size){
            return [
                'value' => $size->id,
                'label' => $size->name
            ];
        });

        $colors = collect(Color::where('status', 'active')->get())->map(function($color){
            return [
                'value' => $color->id,
                'label' => $color->name,
                'color' => $color->code
            ];
        });

        return Inertia::render('Backend/Product/Create', [
            'categories' => Category::where('status', 'active')->get(),
            'colors' => $colors,
            'sizes' => $sizes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:products,name',
            'regular_price' => 'required',
            'sale_price' => 'nullable',
            'quantity' => 'required',
            'description' => 'required',
            'sumary' => 'nullable',
            'category_id' => 'required',
            'sizes' => 'required',
            'colors' => 'required'
        ]);

        $slug = Str::slug($request->name);

        $product = Product::create([
            'name' => $request->name,
            'slug' => $slug,
            'regular_price' => $request->regular_price,
            'sale_price' => $request->sale_price,
            'quantity' => $request->quantity,
            'description' => $request->description,
            'sumary' => $request->sumary,
            'category_id' => $request->category_id,
        ]);

        $product->sizes()->sync($request->sizes);
        $product->colors()->sync($request->colors);

        return redirect()->route('backend.products.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Product $product)
    {
        $sizes = collect(Size::where('status', 'active')->get())->map(function($size){
            return [
                'value' => $size->id,
                'label' => $size->name
            ];
        });

        $colors = collect(Color::where('status', 'active')->get())->map(function($color){
            return [
                'value' => $color->id,
                'label' => $color->name,
                'color' => $color->code
            ];
        });

        return Inertia::render('Backend/Product/Edit', [
            'product' => $product->load(['sizes', 'colors']),
            'categories' => Category::where('status', 'active')->get(),
            'sizes' => $sizes,
            'colors' => $colors
        ]);
    }

    public function update()
    {
    }

    public function productUpdate(Request $request, Product $product)
    {
  
        $request->validate([
            'name' => 'required|unique:products,name,' . $product->id,
            'regular_price' => 'required',
            'sale_price' => 'nullable',
            'quantity' => 'required',
            'description' => 'required',
            'sumary' => 'nullable',
            'category_id' => 'required',
            'sizes' => 'required',
            'colors' => 'required'
        ]);

        $slug = Str::slug($request->name);
        $product->update([
            'name' => $request->name,
            'slug' => $slug,
            'regular_price' => $request->regular_price,
            'sale_price' => $request->sale_price,
            'quantity' => $request->quantity,
            'description' => $request->description,
            'sumary' => $request->sumary,
            'category_id' => $request->category_id,
        ]);

        $product->sizes()->sync(collect($request->sizes)->pluck('value'));
        $product->colors()->sync(collect($request->colors)->pluck('value'));

        return redirect()->route('backend.products.index');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('backend.products.index');
    }

    public function updateStatus(Product $product)
    {
        $product->update([
            'status' => $product->status == 'active' ? 'unactive' : 'active'
        ]);

        return redirect()->route('backend.products.index');
    }
}
