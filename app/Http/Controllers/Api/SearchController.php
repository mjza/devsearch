<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectTopAttribute;

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
     *                     @OA\Property(property="homepage", type="string", example="https://github.com/example/project"),
     *                     @OA\Property(property="language", type="string", example="PHP"),
     *                     @OA\Property(property="repository_url", type="string", example="https://github.com/example/project"),
     *                     @OA\Property(property="keywords", type="string", example="api,laravel,swagger"),
     *                     @OA\Property(property="normalized_licenses", type="string", example="MIT"),
     *                     @OA\Property(property="total_score", type="number", format="float", example=85.5),
     *                     @OA\Property(property="quality_attributes", type="object", example={"usability": -68.2, "versioning": 23.0}),
     *                     @OA\Property(
     *                         property="issue_ids",
     *                         type="object",
     *                         example={
     *                             "usability": {
     *                                 { "issue_id": 49850241, "score": -68.214 },
     *                                 { "issue_id": 41190406, "score": -52.781 }
     *                             },
     *                             "versioning": {
     *                                 { "issue_id": 127008841, "score": 23.041 }
     *                             }
     *                         }
     *                     )
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=1),
     *                 @OA\Property(property="per_page", type="integer", example=10),
     *                 @OA\Property(property="total", type="integer", example=1)
     *             )
     *         )
     *     )
     * )
     */
    public function search(Request $request)
    {
        $query = strtolower($request->input('q'));

        if (!$query) {
            return response()->json([]);
        }

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

        $terms = array_map('trim', $terms);

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
        ->whereIn('id', ProjectTopAttribute::distinct()->pluck('project_id'))
        ->paginate(50);

        $results = [];

        foreach ($projects->items() as $project) {
            $topAttrs = ProjectTopAttribute::where('project_id', $project->id)->get();

            $qualityData = [];
            $issueIdMap = [];

            foreach ($topAttrs as $attr) {
                $qualityData[$attr->criteria] = $attr->avg_similarity_score;
                $issueIdMap[$attr->criteria] = $attr->issue_ids ?? [];
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
                'quality_attributes' => $qualityData,
                'issue_ids' => $issueIdMap,
            ];
        }

        usort($results, fn($a, $b) => $b['total_score'] <=> $a['total_score']);
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
