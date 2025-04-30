<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\KolekcijaController;
use App\Http\Controllers\ProizvodController;
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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/proizvodi', [ProizvodController::class, 'store']);
    Route::put('/proizvodi/{id}', [ProizvodController::class, 'update']);
    Route::delete('/proizvodi/{id}', [ProizvodController::class, 'destroy']);
});

Route::get('/proizvodi', [ProizvodController::class, 'index']);
Route::get('/proizvodi/{id}', [ProizvodController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/kolekcije', [KolekcijaController::class, 'store']);
    Route::put('/kolekcije/{id}', [KolekcijaController::class, 'update']);
    Route::delete('/kolekcije/{id}', [KolekcijaController::class, 'destroy']);
});

Route::get('/kolekcije', [KolekcijaController::class, 'index']);
Route::get('/kolekcije/{id}', [KolekcijaController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('blog-posts', BlogPostController::class);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
    Route::get('/statistics', [AdminController::class, 'getStatistics']);

});