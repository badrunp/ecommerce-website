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
        if ($request->has('sorting')) {
            switch ($request->query('sorting')) {
                case 'oldlatest':
                    $category = Category::orderBy('created_at', 'ASC');
                    break;
                default:
                    $category = Category::orderBy('created_at', 'DESC');
            }
        }
        $category = $category->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Category/Category', [
            'categories' => $category,
            'limit' => $request->query('limit', 5),
            'sorting' => $request->query('sorting', 'latest'),
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
