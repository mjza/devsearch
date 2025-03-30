<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
