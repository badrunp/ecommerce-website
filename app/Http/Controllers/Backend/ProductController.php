<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Category;
use App\Models\Backend\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')->sorting($request->query('sorting'))->search($request->query('search'))->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Product/Product', [
            'products' => $products,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Product/Create', [
            'categories' => Category::where('status', 'active')->get()
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
        ]);

        $slug = Str::slug($request->name);

        Product::create([
            'name' => $request->name,
            'slug' => $slug,
            'regular_price' => $request->regular_price,
            'sale_price' => $request->sale_price,
            'quantity' => $request->quantity,
            'description' => $request->description,
            'sumary' => $request->sumary,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('backend.products.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Product $product)
    {
        return Inertia::render('Backend/Product/Edit', [
            'product' => $product,
            'categories' => Category::where('status', 'active')->get()
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
