<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProjectsSeeder extends Seeder
{
    public function run()
    {
        $csvFile = base_path('database/data/projects_202503281038.csv'); // Adjust the file path

        if (($handle = fopen($csvFile, 'r')) !== false) {
            // Skip the header row
            fgetcsv($handle);

            // Loop through each row in the CSV and insert into the 'projects' table
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (count($data) != 9) {
                    // Skip invalid rows with missing data
                    continue;
                }

                DB::table('projects')->insert([
                    'name' => $data[1],
                    'platform' => $data[2],
                    'description' => $data[3],
                    'homepage' => $data[4],
                    'language' => $data[5],
                    'repository_url' => $data[6],
                    'keywords' => $data[7],
                    'normalized_licenses' => $data[8],
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
