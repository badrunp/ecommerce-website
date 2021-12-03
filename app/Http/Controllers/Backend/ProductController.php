<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Backend\Category;
use App\Models\Backend\Color;
use App\Models\Backend\Product;
use App\Models\Backend\ProductImages;
use App\Models\Backend\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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

    private function sizes()
    {
        return collect(Size::select(['id', 'name'])->where('status', 'active')->get())->map(function ($size) {
            return [
                'value' => $size->id,
                'label' => $size->name
            ];
        });
    }

    private function colors()
    {
        return collect(Color::select(['id', 'name', 'code'])->where('status', 'active')->get())->map(function ($color) {
            return [
                'value' => $color->id,
                'label' => $color->name,
                'color' => $color->code
            ];
        });
    }

    public function create()
    {
        return Inertia::render('Backend/Product/Create', [
            'categories' => Category::select(['id', 'name'])->where('status', 'active')->get(),
            'colors' => $this->colors(),
            'sizes' => $this->sizes(),
        ]);
    }

    public function store(ProductRequest $request)
    {
        DB::transaction(function () use ($request) {

            $product = Product::create($request->except(['sizes', 'colors']));

            $product->sizes()->sync($request->sizes);
            $product->colors()->sync($request->colors);

            foreach ($request->images as $image) {
                ProductImages::create([
                    'image' => $image->store('images/products'),
                    'product_id' => $product->id
                ]);
            }
        });

        return redirect()->route('backend.products.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Product $product)
    {
        return Inertia::render('Backend/Product/Edit', [
            'product' => $product->load(['sizes', 'colors', 'images']),
            'categories' => Category::where('status', 'active')->get(),
            'sizes' => $this->sizes(),
            'colors' => $this->colors()
        ]);
    }

    public function productUpdate(ProductRequest $request, Product $product)
    {

        DB::beginTransaction();

        $product->update($request->except(['sizes', 'colors']));

        $product->sizes()->sync(collect($request->sizes)->pluck('value'));
        $product->colors()->sync(collect($request->colors)->pluck('value'));

        $imagesId = [];

        foreach ($request->images as $image) {
            if (!is_array($image)) {
                $newImage = ProductImages::create([
                    'image' => $image->store('images/products'),
                    'product_id' => $product->id
                ]);

                $imagesId[] = $newImage->id;
            } else {
                $imagesId[] = $image['id'];
            }
        }

        $isImagesDelete = $product->images()->where('product_id', $product->id)->whereNotIn('id', $imagesId)->get();
        $isImagesActive = $product->images()->where('product_id', $product->id)->whereIn('id', $imagesId)->get();

        if (count($isImagesActive) > 0) {
            if (count($isImagesDelete) > 0) {
                foreach ($isImagesDelete as $isImageDelete) {
                    if (Storage::exists($isImageDelete->image)) {
                        Storage::delete($isImageDelete->image);
                    }
                }
            }

            $product->images()->where('product_id', $product->id)->whereNotIn('id', $imagesId)->delete();
        } else {
            DB::rollBack();
            return redirect()->route('backend.products.edit', $product)->with([
                'images' => 'The images field is required.'
            ]);
        }

        DB::commit();

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
