<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QualityAnalysis;

class DataSeeder extends Seeder
{
    public function run(): void
    {
        // Open CSV file for quality analysis
        $qaCsv = fopen(base_path('database/data/quality_attribute_analysis.csv'), 'r');
        
        // Skip the header row (if there's a header)
        fgetcsv($qaCsv);
        
        // Loop through the CSV rows
        while (($data = fgetcsv($qaCsv, 1000, ',')) !== FALSE) {
            // Insert each row into the database
            QualityAnalysis::create([
                'project_id' => (int) $data[1], // Ensure project_id is cast to an integer
                'quality_attribute' => $data[2],
                'sentiment' => substr($data[3], 0, 10), // Ensure sentiment is max 10 characters
                'similarity_score' => (float) $data[4], // Ensure similarity_score is a float
                'issue_id' => (int) $data[5], // Ensure issue_id is cast to an integer
                'reasoning' => $data[6],
            ]);
        }

        fclose($qaCsv);
    }
}
