<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'platform', 'description', 'homepage',
        'language', 'repository_url', 'keywords', 'normalized_licenses',
    ];

    public function qualityAnalyses()
    {
        return $this->hasMany(QualityAnalysis::class, 'project_id');
    }
}