<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::sorting($request->query('sorting'))->search($request->query('search'))->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
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
        ]);

        $slug = Str::slug($request->name);

        Category::create([
            'name' => $request->name,
            'slug' => $slug
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

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $slug = Str::slug($request->name);
        $category->update([
            'name' => $request->name,
            'slug' => $slug
        ]);

        return redirect()->route('backend.categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('backend.categories.index');
    }
}
