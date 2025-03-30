<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\QualityAnalysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Retrieve the query parameter
        $query = $request->input('q');
        
        // If no query is provided, return an empty array
        if (!$query) {
            return response()->json([]);
        }

        $projects = Project::where('name', 'LIKE', "%$query%")
            ->orWhere('description', 'LIKE', "%$query%")
            ->get();

        // Initialize an array to hold the results
        $results = [];

        foreach ($projects as $project) {
            $qualityAnalyses = QualityAnalysis::where('project_id', $project->id)->get();

            $qualityAttributes = [];
            foreach ($qualityAnalyses as $analysis) {
                $qualityAttributes[$analysis->quality_attribute] = $analysis->similarity_score;
            }
            arsort($qualityAttributes);

            // Get the top 10 quality attributes (if applicable)
            $topQualityAttributes = array_slice($qualityAttributes, 0, 10, true);

            // Build the result for this project
            $results[] = [
                'project_name' => $project->name,
                'quality_attributes' => $topQualityAttributes,
            ];
        }

        return response()->json($results);
    }
}
