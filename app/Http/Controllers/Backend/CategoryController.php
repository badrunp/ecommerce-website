<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return  Inertia::render('Backend/Category/Category', [
            'categories' => Category::latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Backend/Category/Create');
    }

    public function store(Request $request)
    {
        $category = $request->validate([
            'name' => 'required',
            'slug' => 'required'
        ]);

        Category::create($category);

        return redirect()->route('backend.categories.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('backend.categories.index');
    }
}
