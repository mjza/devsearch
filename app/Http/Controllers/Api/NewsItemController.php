<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NewsItem;
use Illuminate\Http\JsonResponse;

class NewsItemController extends Controller
{
    public function latest(): JsonResponse
    {
        $latestNews = NewsItem::where('is_valid', true)
            ->orderBy('timestamp', 'desc')
            ->take(10)
            ->get();

        return response()->json($latestNews);
    }
}
