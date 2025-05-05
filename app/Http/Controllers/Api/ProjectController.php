<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectTopAttribute;

/**
 * @OA\Tag(name="Projects", description="Search projects")
 */
class ProjectController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/projects",
     *     summary="Get all projects that have entries in ProjectTopAttribute",
     *     description="Returns a paginated list of projects that have at least one top attribute entry.",
     *     operationId="getProjectsWithTopAttributes",
     *     tags={"Projects"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=false,
     *         description="Page number for pagination",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         required=false,
     *         description="Number of projects per page",
     *         @OA\Schema(type="integer", default=20)
     *     ),
     *     @OA\Parameter(
     *        name="q",
     *        in="query",
     *        required=false,
     *        description="Search query for project name or description",
     *        @OA\Schema(type="string", example="laravel")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Paginated list of projects",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="name", type="string", example="Project 1"),
     *                     @OA\Property(property="description", type="string", example="A sample project"),
     *                     @OA\Property(property="homepage", type="string", example="https://example.com"),
     *                     @OA\Property(property="language", type="string", example="PHP"),
     *                     @OA\Property(property="repository_url", type="string", example="https://github.com/example/project"),
     *                     @OA\Property(property="keywords", type="string", example="api,laravel"),
     *                     @OA\Property(property="normalized_licenses", type="string", example="MIT")
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=5),
     *                 @OA\Property(property="per_page", type="integer", example=20),
     *                 @OA\Property(property="total", type="integer", example=100)
     *             )
     *         )
     *     )
     * )
     */
    public function projects(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $page = $request->input('page', 1);
        $query = strtolower($request->input('q', ''));

        $projectIds = ProjectTopAttribute::distinct()->pluck('project_id');

        $projectsQuery = Project::whereIn('id', $projectIds);

        if (!empty($query)) {
            $projectsQuery->where(function ($q) use ($query) {
                $q->whereRaw('LOWER(name) LIKE ?', ["%$query%"])
                ->orWhereRaw('LOWER(description) LIKE ?', ["%$query%"]);
            });
        }

        $paginatedProjects = $projectsQuery->paginate(
            $perPage,
            ['*'],
            'page',
            $page
        );

        $results = [];

        foreach ($paginatedProjects->items() as $project) {
            $results[] = [
                'name' => $project->name,
                'description' => $project->description,
                'homepage' => $project->homepage,
                'language' => $project->language,
                'repository_url' => $project->repository_url,
                'keywords' => $project->keywords,
                'normalized_licenses' => $project->normalized_licenses
            ];
        }

        return response()->json([
            'data' => $results,
            'meta' => [
                'current_page' => $paginatedProjects->currentPage(),
                'last_page' => $paginatedProjects->lastPage(),
                'per_page' => $paginatedProjects->perPage(),
                'total' => $paginatedProjects->total(),
            ],
        ]);
    }
}

