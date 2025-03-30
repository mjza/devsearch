<?php

use App\Http\Controllers\Api\NewsItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::get('/news', [NewsItemController::class, 'latest']);
});