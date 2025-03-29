<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QualityAnalysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id', 'quality_attribute', 'sentiment',
        'similarity_score', 'issue_id', 'reasoning',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}