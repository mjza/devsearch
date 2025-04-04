# Swagger Setup and Documentation for Laravel

## 1. Setting Up Swagger in Laravel

### Step 1: Install Swagger (L5-Swagger)
Run the following command to install the L5-Swagger package:

```bash
composer require "darkaonline/l5-swagger"
```

### Step 2: Publish the Configuration
Publish the configuration file using:

```bash
php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
```

### Step 3: Configure Your `.env` File
(This can be done in the future)
Set the following environment variables in your `.env` file:

```env
L5_SWAGGER_GENERATE_ALWAYS=true  # Auto-generate docs on each request in development
L5_SWAGGER_UI_DARK_MODE=true     # Enable dark mode for the UI
```

### Step 4: Generate Swagger Documentation
Generate the Swagger documentation:

## 2. Adding Swagger Annotations to Your Controllers

### Example: `NewsItemController`

```php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\NewsItem;

/**
 * @OA\Info(title="DevSearch API", version="1.0")
 */
class NewsItemController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/news",
     *     summary="Get the latest news",
     *     tags={"News"},
     *     @OA\Response(
     *         response=200,
     *         description="List of latest news items",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/NewsItem"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid request"
     *     )
     * )
     */
    public function latest(): JsonResponse
    {
        $latestNews = NewsItem::where('is_valid', true)
            ->orderBy('timestamp', 'desc')
            ->take(10)
            ->get();

        return response()->json($latestNews);
    }
}
```

### Example: `SearchController`

```php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

/**
 * @OA\Info(title="DevSearch API", version="1.0")
 */
class SearchController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/search",
     *     summary="Search for projects by name or description",
     *     tags={"Search"},
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         description="Search query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Search results",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Project"))
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request"
     *     )
     * )
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        // Search logic...
    }
}
```

## 3. Defining Models in Swagger

### Example: Defining `NewsItem` Model

```php
/**
 * @OA\Schema(
 *     schema="NewsItem",
 *     type="object",
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="title", type="string"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="timestamp", type="string", format="date-time"),
 *     @OA\Property(property="is_valid", type="boolean")
 * )
 */
class NewsItem extends Model
{
    // Model code here...
}
```

## 4. Generate and Test the API Documentation

Run the following command to regenerate the Swagger JSON file:

```bash
php artisan l5-swagger:generate
```

Start your Laravel server:

```bash
php artisan serve
```

Navigate to:

```
http://127.0.0.1:8000/api/documentation
```

This will open Swagger UI.


## 5. Common Annotations Reference

- `@OA\Info`: API metadata.
- `@OA\Get`, `@OA\Post`, `@OA\Put`, `@OA\Delete`: HTTP methods.
- `@OA\Parameter`: Define query, header, or path parameters.
- `@OA\Response`: Describe response format.
- `@OA\Schema`: Define data models.
