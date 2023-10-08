<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HallsController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\SeatsController;
use App\Http\Controllers\TypesController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/signout', [AuthController::class, 'signout']);
    Route::get('/current', [AuthController::class, 'current']);
    Route::apiResource('movies', MoviesController::class);
    Route::apiResource('halls', HallsController::class);
    Route::apiResource('types', TypesController::class);
    Route::apiResource('seats', SeatsController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);