# Database

This document speaks about related items to database.

## SETUP DB Connection

### ✅ 1. Configure Database in `.env`

If using MySQL from XAMPP, set this in your `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devsearch
DB_USERNAME=root
DB_PASSWORD=
```

> Create the `devsearch` database via **phpMyAdmin** or **MySQL CLI**.

---

### ✅ 2. Run Migrations

```bash
php artisan migrate
```

Or:

```bash
"C:\xampp\php\php.exe" artisan migrate
```

### ✅ 3. Troubleshooting

In case the system remembers the path DB settings, try to clean up caches:

```bash
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## CREATE A NEW TABEL

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

## SQL SCRIPTS FOR POSTGRES

### ✅ 1. **Feeding top_quality_attributes table**

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

### ✅ 2. **Feeding top_quality_attributes table**

```sql
/* -------------------------------------------------------------
   1.  TABLE DEFINITION
   ------------------------------------------------------------- */
DROP TABLE IF EXISTS project_top_attributes;

CREATE TABLE project_top_attributes (
    project_id        INTEGER      NOT NULL,
    criteria          TEXT         NOT NULL,
    avg_similarity_score  NUMERIC(12,3) NOT NULL,
    issue_ids         JSONB        NOT NULL,     -- array of {issue_id, score}
    diff_from_mean    NUMERIC(12,6) NOT NULL,    -- keeps the distance value
    PRIMARY KEY (project_id, criteria)
);

/* Optional but handy: quickly get “most extreme” attributes per project */
CREATE INDEX idx_pta_project_absdiff
        ON project_top_attributes (project_id, ABS(diff_from_mean) DESC);

/* -------------------------------------------------------------
   2.  POPULATE THE TABLE
   ------------------------------------------------------------- */
TRUNCATE project_top_attributes;

INSERT INTO project_top_attributes (
        project_id,
        criteria,
        avg_similarity_score,
        issue_ids,
        diff_from_mean
)
-- Variant A – show the average score per issue
WITH raw AS (
    SELECT  project_id,
            criteria,
            issue_id,
            /* Multiply by -1 if semantic='-' */
            similarity_score * CASE WHEN semantic = '-' THEN -1 ELSE 1 END
                   AS signed_score
    FROM    quality_attribute_analysis
),
/* 1) Per-criterion average */
criterion_stats AS (
    SELECT  project_id,
            criteria,
            AVG(signed_score) AS avg_score  -- double precision
    FROM    raw
    GROUP BY project_id, criteria
),
/* 2) Project-wide mean of those averages */
project_stats AS (
    SELECT  project_id,
            AVG(avg_score) AS overall_avg
    FROM    criterion_stats
    GROUP BY project_id
),
/* 3) Distance from project mean (no ROW_NUMBER yet) */
criterion_diff AS (
    SELECT  cs.project_id,
            cs.criteria,
            cs.avg_score,
            cs.avg_score - ps.overall_avg      AS diff_from_mean,
            ABS(cs.avg_score - ps.overall_avg) AS abs_diff
    FROM    criterion_stats cs
    JOIN    project_stats   ps USING (project_id)
),
/* 4) We apply ROW_NUMBER in a separate step */
ranked_diff AS (
    SELECT  cd.*,
            ROW_NUMBER() OVER (
                PARTITION BY cd.project_id
                ORDER BY cd.abs_diff DESC
            ) AS rn
    FROM    criterion_diff cd
),
/* 5) Keep only the top 10 per project */
top_attr AS (
    SELECT  *
    FROM    ranked_diff
    WHERE   rn <= 10
),
/* 6) Within those top-10 criteria, compute the average score per issue */
issue_averages AS (
    SELECT  t.project_id,
            t.criteria,
            r.issue_id,
            AVG(r.signed_score) AS contrib_score
    FROM    raw r
    JOIN    top_attr t
      ON    r.project_id = t.project_id
     AND    r.criteria   = t.criteria
    GROUP BY t.project_id, t.criteria, r.issue_id
),
/* 7) Rank them by absolute average (top 3 issues) */
ranked_contrib AS (
    SELECT  ia.*,
            ROW_NUMBER() OVER (
                PARTITION BY ia.project_id, ia.criteria
                ORDER BY ABS(ia.contrib_score) DESC
            ) AS rnk
    FROM    issue_averages ia
)
/* 8) Final SELECT: for each attribute, gather the top-3 issues */
SELECT  
    t.project_id,
    t.criteria,
    ROUND(t.avg_score::numeric, 3) AS avg_similarity_score,
    jsonb_agg(
        jsonb_build_object(
            'issue_id', issue_id,
            'score',    ROUND(contrib_score::numeric, 3)
        )
        ORDER BY ABS(contrib_score) DESC
    ) AS issue_ids,
    t.diff_from_mean
FROM   top_attr       t
JOIN   ranked_contrib c
   ON  c.project_id = t.project_id
  AND  c.criteria   = t.criteria
WHERE  c.rnk <= 3
GROUP BY
    t.project_id,
    t.criteria,
    t.avg_score,
    t.diff_from_mean
ORDER BY
    t.project_id,
    ABS(t.diff_from_mean) DESC;
```