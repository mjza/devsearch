<?php

use App\Http\Controllers\Api\NewsItemController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\ProjectController;

Route::prefix('api')->group(function () {
    Route::get('/news', [NewsItemController::class, 'latest']);
    Route::get('/search', [SearchController::class, 'search']) ->name('search');
    Route::get('/projects', [ProjectController::class, 'projects']);
});