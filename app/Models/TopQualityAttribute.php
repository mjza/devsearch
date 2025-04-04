<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="TopQualityAttribute",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="project_id", type="integer"),
 *     @OA\Property(property="quality_attribute", type="string"),
 *     @OA\Property(property="sentiment", type="string"),
 *     @OA\Property(property="similarity_score", type="number", format="float"),
 *     @OA\Property(property="issue_id", type="integer"),
 *     @OA\Property(property="reasoning", type="string")
 * )
 */
class TopQualityAttribute extends Model
{
    use HasFactory;

    protected $table = 'top_quality_attributes';

    protected $fillable = [
        'project_id',
        'quality_attribute',
        'sentiment',
        'similarity_score',
        'issue_id',
        'reasoning',
    ];

    /**
     * Relationships
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
