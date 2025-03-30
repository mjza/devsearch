<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\QualityAnalysis;

class SearchController extends Controller
{
    /**
     * Search projects and return project name with quality attributes.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request->input('q');


        if (!$query) {
            return response()->json([]);
        }

        // Build the query to search projects by name or description
        $projectsQuery = Project::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%");

        // Use pagination to limit the number of projects loaded per request
        $projects = $projectsQuery->paginate(50);

        // just mock can change thisd datastructure to get what we want
        $desiredAttributes = [
            'performance',
            'usability',
            'security',
            'maintainability',
        ];

        $results = [];

        foreach ($projects->items() as $project) {

            $qualityData = array_fill_keys($desiredAttributes, null);

            $analyses = QualityAnalysis::where('project_id', $project->id)->get();

            foreach ($analyses as $analysis) {
                $attribute = $analysis->quality_attribute;
                if (in_array($attribute, $desiredAttributes)) {
                    $qualityData[$attribute] = $analysis->similarity_score;
                }
            }
            $totalScore = array_sum(array_filter($qualityData));

            $results[] = array_merge(['name' => $project->name, 'total_score' => $totalScore], $qualityData);
        }

        // Sort the results by total similarity score in descending order
        usort($results, function ($a, $b) {
            return $b['total_score'] <=> $a['total_score'];
        });

        // Take the top 10 results
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
