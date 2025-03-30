<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
