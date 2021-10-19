<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name', 'slug', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Category/Category', [
            'categories' => $category,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Category/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'nullable|mimes:jpg,png,jpeg|max:1024'
        ]);

        $slug = Str::slug($request->name);

        Category::create([
            'name' => $request->name,
            'slug' => $slug,
            'image' => $request->hasFile('image') ? $request->file('image')->store('images/category') : null
        ]);
        
        return redirect()->route('backend.categories.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Category $category)
    {
        return Inertia::render('Backend/Category/Edit', [
            'category' => $category
        ]);
    }

    public function update(){}

    public function categoryUpdate(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
            'newImage' => 'nullable|mimes:jpg,png,jpeg|max:1024'
        ]);

        if($request->hasFile('newimage')){
            $image = $request->file('newimage')->store('images/category');
            if($request->has('image')){
                Storage::delete($request->image);
            }
        }else{
            $image = $request->has('image') ? $request->image : null;
        }

        $slug = Str::slug($request->name);
        $category->update([
            'name' => $request->name,
            'slug' => $slug,
            'image' => $image
        ]);

        return redirect()->route('backend.categories.index');
    }

    public function destroy(Category $category)
    {
        if($category->image !== null){
            Storage::delete($category->image);
        }

        $category->delete();

        return redirect()->route('backend.categories.index');
    }
    
    public function updateStatus(Category $category){
        $category->update([
            'status' => $category->status == 'active' ? 'unactive' : 'active'
        ]);
        
        return redirect()->route('backend.categories.index');
    }
}
