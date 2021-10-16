<?php

use App\Http\Controllers\Backend\CategoryController;
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

    Route::get('/dashboard/categories/search', [CategoryController::class, 'search'])->name('categories.search');
    Route::resource('categories', CategoryController::class)->scoped([
        'category' => 'slug'
    ]);
});

require __DIR__.'/auth.php';
