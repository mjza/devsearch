<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="ProjectTopAttribute",
 *     type="object",
 *     required={"project_id", "criteria", "issue_ids"},
 *     @OA\Property(property="project_id", type="integer", example=232),
 *     @OA\Property(property="criteria", type="string", example="usability"),
 *     @OA\Property(property="avg_similarity_score", type="number", format="float", nullable=true, example=-10.153),
 *     @OA\Property(
 *         property="issue_ids",
 *         type="array",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(property="issue_id", type="integer", example=49850241),
 *              @OA\Property(property="issue_number", type="integer", example=5),
 *             @OA\Property(property="score", type="number", format="float", example=-68.214)
 *         )
 *     ),
 *     @OA\Property(property="diff_from_mean", type="number", format="float", nullable=true, example=-9.401991)
 * )
 */

class ProjectTopAttribute extends Model
{
    public $timestamps = false; // Optional, remove if using timestamps

    protected $table = 'project_top_attributes';

    protected $fillable = [
        'project_id',
        'criteria',
        'avg_similarity_score',
        'issue_ids',
        'diff_from_mean',
    ];

    protected $casts = [
        'issue_ids' => 'array', // Automatically cast JSON to PHP array
        'avg_similarity_score' => 'float',
        'diff_from_mean' => 'float',
    ];

    /**
     * Relationships
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
