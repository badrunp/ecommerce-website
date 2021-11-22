<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Backend\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name', 'slug','is_home', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Category/Category', [
            'categories' => $category,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Category/Create');
    }

    public function store(CategoryRequest $request)
    {

        $datas = $request->all();
        $datas['image'] = $request->hasFile('image') ? $request->file('image')->store('images/category') : null;

        Category::create($datas);
        
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

    public function categoryUpdate(CategoryRequest $request, Category $category)
    {
        if($request->hasFile('newimage')){
            $image = $request->file('newimage')->store('images/category');
            if($request->has('image')){
                Storage::delete($request->image);
            }
        }else{
            $image = $request->has('image') ? $request->image : null;
        }

        $datas = $request->all();
        $datas['image'] = $image;
        $category->update($datas);

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
