<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class QualityAnalysesSeeder extends Seeder
{
    public function run()
    {
        $csvFile = base_path('database/data/quality_attribute_analysis.csv'); // Adjust the file path

        if (($handle = fopen($csvFile, 'r')) !== false) {
            // Skip the header row
            fgetcsv($handle);

            // Loop through each row in the CSV and insert into the 'quality_analyses' table
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (count($data) != 7) {
                    // Skip invalid rows with missing data
                    continue;
                }

                DB::table('quality_analyses')->insert([
                    'project_id' => $data[1],
                    'quality_attribute' => $data[2],
                    'sentiment' => $data[3],
                    'similarity_score' => $data[4],
                    'issue_id' => $data[5],
                    'reasoning' => $data[6],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            fclose($handle);
        } else {
            $this->command->error('CSV file not found.');
        }
    }
}
