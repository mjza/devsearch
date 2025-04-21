<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about-us', function () {
    return Inertia::render('information/about_us');
})->name('about');

Route::get('/cookie-policy', function () {
    return Inertia::render('information/cookie_policy');
})->name('cookie.policy');

Route::get('/privacy-policy', function () {
    return Inertia::render('information/privacy_policy');
})->name('privacy.policy');

Route::get('/terms', function () {
    return Inertia::render('information/terms');
})->name('terms');

Route::get('/contact', function () {
    return Inertia::render('information/contact');
})->name('contact');

Route::get('/careers', function () {
    return Inertia::render('information/career');
})->name('careers');

Route::get('/funders', function () {
    return Inertia::render('information/funders');
})->name('funders');

Route::get('/result', function () {
    return Inertia::render('result');
})->name('result');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/api.php';