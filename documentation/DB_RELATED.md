
## CREATE TABEL

To create a migration file in Laravel for your `news_items` table, follow these steps:

---

### ✅ 1. **Run the Artisan command:**

Open your terminal, navigate to your Laravel project root, and run:

```bash
php artisan make:migration create_news_items_table
```

This will generate a new migration file in `database/migrations/`, with a name like:

```
2025_03_29_123456_create_news_items_table.php
```

---

### ✅ 2. **Edit the generated migration file**

Open it and paste the migration code I gave you earlier:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsItemsTable extends Migration
{
    public function up(): void
    {
        Schema::create('news_items', function (Blueprint $table) {
            $table->id();
            $table->string('tag');
            $table->string('title');
            $table->text('description');
            $table->timestamp('timestamp');
            $table->string('link')->nullable();
            $table->boolean('is_valid')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news_items');
    }
}
```

---

### ✅ 3. **Run the migration**

Execute the following command to apply your migration to the database:

```bash
php artisan migrate
```
To re-run the migration after any changes in the structure:
```
php artisan migrate:fresh
```

---

### ✅ 4. **Create a Seeder**

Run:

```bash
php artisan make:seeder NewsItemsTableSeeder
```

This will create `database/seeders/NewsItemsTableSeeder.php`.

Edit it like this:

```php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewsItemsTableSeeder extends Seeder
{
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
```

---

### ✅ 5. **Register the seeder**

In `DatabaseSeeder.php`, call the seeder:

```php
public function run(): void
{
    $this->call([
        NewsItemsTableSeeder::class,
    ]);
}
```

---

### ✅ 6. **Run the seeder**

Now run:

```bash
php artisan db:seed
```

If you want to reset everything and re-run migrations and seeders:

```bash
php artisan migrate:fresh --seed
```

---

### ✅ 7. **Feeding top_quality_attributes table**

```sql
-- Step 1: Create the new table to store AI results
CREATE TABLE quality_analyses (
    id SERIAL PRIMARY KEY,
    project_id INT,
    quality_attribute TEXT,
    sentiment TEXT,
    similarity_score FLOAT,
    issue_id INT,
    reasoning TEXT
);

-- Step 1: Create the new table to store top results
CREATE TABLE top_quality_attributes (
    id SERIAL PRIMARY KEY,  -- optional
    project_id INT,
    quality_attribute TEXT,
    sentiment TEXT,
    similarity_score FLOAT,
    issue_id INT,
    reasoning TEXT
);


-- Insert top 10 positive attributes per project
INSERT INTO top_quality_attributes (project_id, quality_attribute, sentiment, similarity_score, issue_id, reasoning)
SELECT project_id, quality_attribute, sentiment, similarity_score, issue_id, reasoning
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY project_id, sentiment ORDER BY similarity_score DESC) AS rank
    FROM quality_analyses
    WHERE sentiment = '+'
        AND typeof(issue_id) = 'integer'
) sub
WHERE rank <= 10;


-- Insert top 10 negative attributes per project
INSERT INTO top_quality_attributes (id, project_id, quality_attribute, sentiment, similarity_score, issue_id, reasoning)
SELECT id, project_id, quality_attribute, sentiment, -1 * similarity_score AS similarity_score, issue_id, reasoning
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY project_id, sentiment ORDER BY similarity_score DESC) AS rank
    FROM quality_analyses
    WHERE sentiment = '-'
    	AND typeof(issue_id) = 'integer'
) sub
WHERE rank <= 10;


```