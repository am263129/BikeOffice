<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TypoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("register",[AuthController::class,'Register'])->name("Register");
Route::post("signin",[AuthController::class,'signin'])->name("signin");

Route::post('auth.password.sendlink',[AuthController::class,'sendLink'])->name("password.sendlink");
Route::post('auth.password.reset',[AuthController::class,'resetPassword'])->name("password.reset");

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
