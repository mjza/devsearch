<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('news_items')->insert([
            [
                'id' => 1,
                'tag' => 'Frontend · React',
                'title' => '18.0 Released',
                'description' => 'New features include automatic batching, concurrent rendering, and improved suspense support.',
                'timestamp' => '2 hours ago',
                'link' => '#',
                'is_valid' => true,
            ],
            [
                'id' => 2,
                'tag' => 'Tooling · Webpack',
                'title' => 'Webpack 6 Beta',
                'description' => 'The first beta version of Webpack 6 is out. Includes faster builds and improved tree-shaking.',
                'timestamp' => '1 day ago',
                'link' => '#',
                'is_valid' => true,
            ],
            [
                'id' => 3,
                'tag' => 'Community',
                'title' => 'DevSearch Now Open Source',
                'description' => 'Our core search engine is now open source under the MIT License. Contributions welcome!',
                'timestamp' => '3 days ago',
                'link' => '#',
                'is_valid' => true,
            ],
        ]);
    }
}
