<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
