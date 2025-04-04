<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Project",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="platform", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="homepage", type="string"),
 *     @OA\Property(property="language", type="string"),
 *     @OA\Property(property="repository_url", type="string"),
 *     @OA\Property(property="keywords", type="string"),
 *     @OA\Property(property="normalized_licenses", type="string")
 * )
 */
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'platform',
        'description',
        'homepage',
        'language',
        'repository_url',
        'keywords',
        'normalized_licenses',
    ];

    /**
     * Relationships
     */
    public function topQualityAttributes()
    {
        return $this->hasMany(TopQualityAttribute::class);
    }
}
