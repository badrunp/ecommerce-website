<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name','is_home', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Brand/Brand', [
            'brands' => $brands,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Brand/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'nullable|mimes:jpg,png,jpeg|max:1024'
        ]);

        $slug = Str::slug($request->name);

        Brand::create([
            'name' => $request->name,
            'slug' => $slug,
            'status' => 'active',
            'image' => $request->hasFile('image') ? $request->file('image')->store('images/brands') : null,
            'is_home' => $request->boolean('is_home')
        ]);
        
        return redirect()->route('backend.brands.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Backend/Brand/Edit', [
            'brand' => $brand
        ]);
    }

    public function update(){}

    public function brandUpdate(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required',
            'newImage' => 'nullable|mimes:jpg,png,jpeg|max:1024'
        ]);

        if($request->hasFile('newimage')){
            $image = $request->file('newimage')->store('images/brands');
            if($request->has('image')){
                Storage::delete($request->image);
            }
        }else{
            $image = $request->has('image') ? $request->image : null;
        }

        $slug = Str::slug($request->name);
        $brand->update([
            'name' => $request->name,
            'slug' => $slug,
            'image' => $image,
            'is_home' => $request->boolean('is_home')
        ]);

        return redirect()->route('backend.brands.index');
    }

    public function destroy(Brand $brand)
    {
        if($brand->image !== null){
            Storage::delete($brand->image);
        }

        $brand->delete();

        return redirect()->route('backend.brands.index');
    }
    
    public function updateStatus(Brand $brand){
        $brand->update([
            'status' => $brand->status == 'active' ? 'unactive' : 'active'
        ]);
        
        return redirect()->route('backend.brands.index');
    }
}
