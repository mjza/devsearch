<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\QualityAnalysis;

class DataSeeder extends Seeder
{
    public function run(): void
    {
        // Path to the CSV file
        $csvFile = base_path('database/data/projects_202503281038.csv');

        // Open the CSV file
        if (($handle = fopen($csvFile, 'r')) !== false) {
            // Skip the header row
            fgetcsv($handle);

            // Loop through the file, read data and insert into database
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                DB::table('projects')->insert([
                    'name' => $data[0],
                    'platform' => $data[1],
                    'description' => $data[2],
                    'homepage' => $data[3],
                    'language' => $data[4],
                    'repository_url' => $data[5],
                    'keywords' => $data[6],
                    'normalized_licenses' => $data[7],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Close the file
            fclose($handle);
        }
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
