<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\QualityAnalysis;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['error' => 'Query parameter "q" is required'], 400);
        }

        // Step 1: Find projects where similarity_score is highest for the search term
        $topProjects = QualityAnalysis::where('quality_attribute', 'LIKE', "%$query%")
            ->orderByDesc('similarity_score')
            ->limit(10)
            ->pluck('project_id');

        if ($topProjects->isEmpty()) {
            return response()->json(['message' => 'No matching projects found'], 404);
        }

        // Step 2: Get all quality attributes dynamically
        $attributes = QualityAnalysis::distinct()->pluck('quality_attribute');

        // Step 3: Fetch project details with dynamic attributes
        $selectStatements = ['projects.name'];

        foreach ($attributes as $attribute) {
            $selectStatements[] = DB::raw("
                MAX(CASE WHEN quality_analysis.quality_attribute = '$attribute' THEN quality_analysis.similarity_score END) as `$attribute`
            ");
        }

        $results = Project::whereIn('projects.id', $topProjects)
            ->leftJoin('quality_analysis', 'projects.id', '=', 'quality_analysis.project_id')
            ->select($selectStatements)
            ->groupBy('projects.id', 'projects.name')
            ->orderByDesc('projects.id')
            ->get();

        return response()->json($results);
    }
}
