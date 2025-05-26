<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="NewsItem",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="tag", type="string"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="timestamp", type="string", format="date-time"),
 *     @OA\Property(property="link", type="string"),
 *     @OA\Property(property="is_valid", type="boolean")
 * )
 */
class NewsItem extends Model
{
    protected $table = 'news_items';

    // Allow mass assignment for these fields
    protected $fillable = [
        'tag',
        'title',
        'description',
        'timestamp',
        'link',
        'is_valid',
    ];

    // If you don't use created_at/updated_at columns
    public $timestamps = false;

    // Cast fields to native types
    protected $casts = [
        'is_valid' => 'boolean',
        'timestamp' => 'datetime',
    ];
}
