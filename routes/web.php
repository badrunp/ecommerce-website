<?php

use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ColorController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\SizeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');

Route::get('/test', function(){
    dd('test');
})->name('test');

Route::prefix('dashboard')->middleware(['auth'])->name('backend.')->group(function(){
    Route::get('/home', function(){
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Category
    Route::get('/dashboard/products/categories/search', [CategoryController::class, 'search'])->name('categories.search');
    Route::post('/dashboard/products/categories/{category}/update', [CategoryController::class, 'categoryUpdate'])->name('categories.categoryUpdate');
    Route::post('/dashboard/products/categories/{category}/status', [CategoryController::class, 'updateStatus'])->name('categories.updateStatus');
    Route::resource('/products/categories', CategoryController::class)->scoped([
        'category' => 'slug'
    ]);

    // Colors
    Route::get('/dashboard/products/colors/search', [ColorController::class, 'search'])->name('colors.search');
    Route::post('/dashboard/products/colors/{color}/update', [ColorController::class, 'colorUpdate'])->name('colors.colorUpdate');
    Route::post('/dashboard/products/colors/{color}/status', [ColorController::class, 'updateStatus'])->name('colors.updateStatus');
    Route::resource('/products/colors', ColorController::class)->scoped([
        'color' => 'slug'
    ]);

    // Sizes
    Route::get('/dashboard/products/sizes/search', [SizeController::class, 'search'])->name('sizes.search');
    Route::post('/dashboard/products/sizes/{size}/update', [SizeController::class, 'sizeUpdate'])->name('sizes.sizeUpdate');
    Route::post('/dashboard/products/sizes/{size}/status', [SizeController::class, 'updateStatus'])->name('sizes.updateStatus');
    Route::resource('/products/sizes', SizeController::class)->scoped([
        'size' => 'slug'
    ]);

    // Brands
    Route::get('/dashboard/products/brands/search', [BrandController::class, 'search'])->name('brands.search');
    Route::post('/dashboard/products/brands/{brand}/update', [BrandController::class, 'brandUpdate'])->name('brands.brandUpdate');
    Route::post('/dashboard/products/brands/{brand}/status', [BrandController::class, 'updateStatus'])->name('brands.updateStatus');
    Route::resource('/products/brands', BrandController::class)->scoped([
        'brand' => 'slug'
    ]);

    // Products
    Route::get('/dashboard/products/show/search', [ProductController::class, 'search'])->name('products.search');
    Route::post('/dashboard/products/show/{product}/update', [ProductController::class, 'productUpdate'])->name('products.productUpdate');
    Route::post('/dashboard/products/show/{product}/status', [ProductController::class, 'updateStatus'])->name('products.updateStatus');
    Route::resource('/products/show', ProductController::class)->scoped([
        'product' => 'slug'
    ])->parameters([
        'show' => 'product'
    ])->names([
        'create' => 'products.create',
        'index' => 'products.index',
        'edit' => 'products.edit',
        'destroy' => 'products.destroy'
    ]);
});

require __DIR__.'/auth.php';
