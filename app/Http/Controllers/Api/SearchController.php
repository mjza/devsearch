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

        // Search for projects by name or description
        $projects = Project::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        // Define the desired quality attributes
        $desiredAttributes = [
            'performance',
            'usability',
            'security',
            'maintainability',
        ];

        $results = [];

        foreach ($projects as $project) {
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

            // Build the result object for this project
            $results[] = array_merge(
                ['name' => $project->name],
                $qualityData
            );
        }

        // Return the results as JSON
        return response()->json($results);
    }
}
