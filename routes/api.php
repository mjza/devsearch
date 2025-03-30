<?php

use App\Http\Controllers\Api\NewsItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/news', [NewsItemController::class, 'latest']);
});