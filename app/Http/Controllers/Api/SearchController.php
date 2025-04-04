<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
/**
 * @OA\Tag(name="Search", description="Search related operations")
 */
class SearchController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/search",
     *     summary="Search projects based on query string",
     *     tags={"Search"},
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         description="Search query string",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Search results",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", 
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="name", type="string", example="Project 1"),
     *                     @OA\Property(property="description", type="string", example="Description of the project"),
     *                     @OA\Property(property="total_score", type="number", format="float", example=85.5)
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=10),
     *                 @OA\Property(property="total", type="integer", example=100)
     *             )
     *         )
     *     )
     * )
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json([]);
        }

        // Only get projects that have at least one related top_quality_attribute
        $query = strtolower($request->input('q'));

        if (!$query) {
            return response()->json([]);
        }

        // Detect query type
        $searchMode = 'single';
        $terms = [$query];

        if (str_contains($query, ' or ')) {
            $searchMode = 'or';
            $terms = explode(' or ', $query);
        } elseif (str_contains($query, ' and ')) {
            $searchMode = 'and';
            $terms = explode(' and ', $query);
        } elseif (str_contains($query, ' vs ')) {
            $searchMode = 'vs';
            $terms = explode(' vs ', $query);
        }

        // Trim terms
        $terms = array_map('trim', $terms);

        // Build query based on mode
        $projects = Project::where(function ($q) use ($terms, $searchMode) {
            if ($searchMode === 'or' || $searchMode === 'vs') {
                foreach ($terms as $term) {
                    $q->orWhere('name', 'LIKE', "%{$term}%")
                        ->orWhere('description', 'LIKE', "%{$term}%");
                }
            } elseif ($searchMode === 'and') {
                foreach ($terms as $term) {
                    $q->where(function ($subQ) use ($term) {
                        $subQ->where('name', 'LIKE', "%{$term}%")
                            ->orWhere('description', 'LIKE', "%{$term}%");
                    });
                }
            } else {
                $term = $terms[0];
                $q->where('name', 'LIKE', "%{$term}%")
                    ->orWhere('description', 'LIKE', "%{$term}%");
            }
        })
            ->whereHas('topQualityAttributes')
            ->with('topQualityAttributes')
            ->paginate(50);

        $results = [];

        foreach ($projects->items() as $project) {
            $qualityData = [];

            foreach ($project->topQualityAttributes as $analysis) {
                $attribute = $analysis->quality_attribute;
                $qualityData[$attribute] = $analysis->similarity_score;
            }

            $totalScore = array_sum(array_filter($qualityData));

            $results[] = [
                'name' => $project->name,
                'description' => $project->description,
                'homepage' => $project->homepage,
                'language' => $project->language,
                'repository_url' => $project->repository_url,
                'keywords' => $project->keywords,
                'normalized_licenses' => $project->normalized_licenses,
                'total_score' => $totalScore,
                'quality_attributes' => $qualityData
            ];
        }

        // Sort results by total score descending
        usort($results, fn($a, $b) => $b['total_score'] <=> $a['total_score']);

        // Take top 10 results
        $topResults = array_slice($results, 0, 10);

        return response()->json([
            'data' => $topResults,
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
            ],
        ]);
    }
}
