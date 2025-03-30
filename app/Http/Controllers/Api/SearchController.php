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
        // Get the search query parameter
        $query = $request->input('q');

        // If no query provided, return an empty array
        if (!$query) {
            return response()->json([]);
        }

        // Build the query to search projects by name or description
        $projectsQuery = Project::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%");

        // Use pagination to limit the number of projects loaded per request
        $projects = $projectsQuery->paginate(50);

        // Define the desired quality attributes
        $desiredAttributes = [
            'performance',
            'usability',
            'security',
            'maintainability',
        ];

        $results = [];

        // Iterate only over the current page's projects
        foreach ($projects->items() as $project) {
            // Initialize quality data with default null values
            $qualityData = array_fill_keys($desiredAttributes, null);

            // Retrieve all quality analyses for the current project
            $analyses = QualityAnalysis::where('project_id', $project->id)->get();

            // Assign similarity score for each desired quality attribute if available
            foreach ($analyses as $analysis) {
                $attribute = $analysis->quality_attribute;
                if (in_array($attribute, $desiredAttributes)) {
                    $qualityData[$attribute] = $analysis->similarity_score;
                }
            }

            // Calculate the total similarity score for sorting purposes
            $totalScore = array_sum(array_filter($qualityData));

            // Build the result object for this project
            $results[] = array_merge(['name' => $project->name, 'total_score' => $totalScore], $qualityData);
        }

        // Sort the results by total similarity score in descending order
        usort($results, function ($a, $b) {
            return $b['total_score'] <=> $a['total_score'];
        });

        // Take the top 10 results
        $topResults = array_slice($results, 0, 10);

        // Return the results along with pagination meta data
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
