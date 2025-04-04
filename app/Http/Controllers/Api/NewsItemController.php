<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NewsItem;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Info(title="API Documentation", version="1.0")
 * @OA\Tag(name="News", description="News related operations")
 */
class NewsItemController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/news",
     *     summary="Get the latest news",
     *     tags={"News"},
     *     @OA\Response(
     *         response=200,
     *         description="The latest news retrieved successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="title", type="string", example="Sample news title"),
     *                 @OA\Property(property="content", type="string", example="This is the content of the news item."),
     *                 @OA\Property(property="timestamp", type="string", format="date-time", example="2025-04-03T12:00:00Z"),
     *             )
     *         )
     *     )
     * )
     */
    public function latest(): JsonResponse
    {
        $latestNews = NewsItem::where('is_valid', true)
            ->orderBy('timestamp', 'desc')
            ->take(10)
            ->get();

        return response()->json($latestNews);
    }
}
