<?php

use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ColorController;
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
    Route::get('/dashboard/categories/search', [CategoryController::class, 'search'])->name('categories.search');
    Route::post('/dashboard/categories/{category}/update', [CategoryController::class, 'categoryUpdate'])->name('categories.categoryUpdate');
    Route::post('/dashboard/categories/{category}/status', [CategoryController::class, 'updateStatus'])->name('categories.updateStatus');
    Route::resource('categories', CategoryController::class)->scoped([
        'category' => 'slug'
    ]);

    // Colors
    Route::get('/dashboard/colors/search', [ColorController::class, 'search'])->name('colors.search');
    Route::post('/dashboard/colors/{category}/update', [ColorController::class, 'colorUpdate'])->name('colors.categoryUpdate');
    Route::post('/dashboard/colors/{category}/status', [ColorController::class, 'updateStatus'])->name('colors.updateStatus');
    Route::resource('colors', ColorController::class)->scoped([
        'color' => 'slug'
    ]);
});

require __DIR__.'/auth.php';
