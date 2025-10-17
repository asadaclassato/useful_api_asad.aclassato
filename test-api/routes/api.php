<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;

use App\Http\Controllers\ModulesController;



/* Route::get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/modules', [ModulesController::class, 'index']);

Route::get('/modules/{id}', [ModulesController::class, 'show']);
