<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\QualityAnalysis;

class DataSeeder extends Seeder
{
    public function run(): void
    {
        // Load quality_analysis from CSV
        $qaCsv = fopen(base_path('database/data/quality_attribute_analysis.csv'), 'r');
        while (($data = fgetcsv($qaCsv, 1000, ',')) !== FALSE) {
            QualityAnalysis::create([
                'project_id' => (int)$data[0],
                'quality_attribute' => $data[1],
                'sentiment' => $data[2],
                'similarity_score' => (float)$data[3],
                'issue_id' => (int)$data[4],
                'reasoning' => $data[5],
            ]);
        }
        fclose($qaCsv);
    }
}
