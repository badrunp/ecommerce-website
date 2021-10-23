<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Size;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SizeController extends Controller
{
    public function index(Request $request)
    {
        $sizes = Size::sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name', 'slug', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Size/Size', [
            'sizes' => $sizes,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Size/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:sizes,name',
        ]);

        $slug = Str::slug($request->name);

        Size::create([
            'name' => strtoupper($request->name),
            'slug' => $slug,
        ]);
        
        return redirect()->route('backend.sizes.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Size $size)
    {
        return Inertia::render('Backend/Size/Edit', [
            'size' => $size
        ]);
    }

    public function update(){}

    public function sizeUpdate(Request $request, Size $size)
    {
        $request->validate([
            'name' => 'required|unique:sizes,name,' . $size->id,
        ]);

        $slug = Str::slug($request->name);
        $size->update([
            'name' => strtoupper($request->name),
            'slug' => $slug,
        ]);

        return redirect()->route('backend.sizes.index');
    }

    public function destroy(Size $size)
    {
        $size->delete();

        return redirect()->route('backend.sizes.index');
    }
    
    public function updateStatus(Size $size){
        $size->update([
            'status' => $size->status == 'active' ? 'unactive' : 'active'
        ]);
        
        return redirect()->route('backend.sizes.index');
    }
}
