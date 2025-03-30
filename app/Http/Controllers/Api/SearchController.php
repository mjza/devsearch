<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class SearchController extends Controller
{
    /**
     * Search projects and return project name with quality attributes.
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json([]);
        }

        // Only get projects that have at least one related top_quality_attribute
        $projects = Project::where(function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%")
                  ->orWhere('description', 'LIKE', "%{$query}%");
            })
            ->whereHas('topQualityAttributes') // ensures only projects with related records
            ->with('topQualityAttributes')     // eager-load relationship
            ->paginate(50);

        $results = [];

        foreach ($projects->items() as $project) {
            $qualityData = [];

            foreach ($project->topQualityAttributes as $analysis) {
                $attribute = $analysis->quality_attribute;
                $qualityData[$attribute] = $analysis->similarity_score;
            }

            $totalScore = array_sum(array_filter($qualityData));

            $results[] = array_merge(
                ['name' => $project->name, 'total_score' => $totalScore],
                $qualityData
            );
        }

        // Sort results by total score descending
        usort($results, fn ($a, $b) => $b['total_score'] <=> $a['total_score']);

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
