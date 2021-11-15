<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TypoController;
use Illuminate\Support\Facades\Route;

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

Route::get('/{path?}', function () {
    return view('welcome');
});

// Route::view('/{path?}', 'welcome');

Route::post("register",[AuthController::class,'Register'])->name("Register");
Route::post("signin",[AuthController::class,'signin'])->name("signin");

Route::post('typo.create',[TypoController::class,'create'])->name('typo.create');
Route::post('typo.get',[TypoController::class, 'getTypos'])->name('typo.get');
Route::post('typo.delete',[TypoController::class, 'delete'])->name('typo.delete');

Route::post('city.create',[CityController::class,'create'])->name('city.create');
Route::post('city.get',[CityController::class, 'getCities'])->name('city.get');
Route::post('city.delete',[CityController::class, 'delete'])->name('city.delete');

Route::post('course.create',[CourseController::class,'create'])->name('course.create');
Route::post('course.get',[CourseController::class, 'getCourse'])->name('course.get');
Route::post('course.update',[CourseController::class, 'updateCourse'])->name('course.update');
Route::post('course.delete',[CourseController::class, 'delete'])->name('course.delete');