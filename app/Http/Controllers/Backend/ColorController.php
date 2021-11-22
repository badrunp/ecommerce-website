<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ColorRequest;
use App\Models\Backend\Color;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ColorController extends Controller
{
    
    public function index(Request $request)
    {
        $colors = Color::sorting($request->query('sorting'))->search($request->query('search'))->select(['id', 'name', 'slug', 'code', 'status'])->paginate($request->has('limit') ? $request->query('limit') : 10)->withQueryString();
        return  Inertia::render('Backend/Color/Color', [
            'colors' => $colors,
            'queries' => $request->query()
        ]);
    }
    public function create()
    {
        return Inertia::render('Backend/Color/Create');
    }

    public function store(ColorRequest $request)
    {
        Color::create($request->all());
        
        return redirect()->route('backend.colors.index');
    }

    public function show($id)
    {
        //
    }

    public function edit(Color $color)
    {
        return Inertia::render('Backend/Color/Edit', [
            'color' => $color
        ]);
    }

    public function update(){}

    public function colorUpdate(ColorRequest $request, Color $color)
    {
        $color->update($request->all());

        return redirect()->route('backend.colors.index');
    }

    public function destroy(Color $color)
    {
        $color->delete();

        return redirect()->route('backend.colors.index');
    }
    
    public function updateStatus(Color $color){
        $color->update([
            'status' => $color->status == 'active' ? 'unactive' : 'active'
        ]);
        
        return redirect()->route('backend.colors.index');
    }
}
