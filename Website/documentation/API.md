# API

This document speaks about API related stuffs.

## I. Making APIs from scratch

Make the controller lives under `**app/Http/Controllers/Api**`.

---

### ✅ Step 1: Create a Model (if not done yet)

```bash
php artisan make:model NewsItem
```

---

### ✅ Step 2: Create an API Controller

```bash
php artisan make:controller Api/NewsItemController
```

---

### ✅ Step 3: Add Route in `routes/api.php`

Add this at the bottom of `routes/api.php`:

```php
use App\Http\Controllers\Api\NewsItemController;

Route::get('/news', [NewsItemController::class, 'latest']);
```

This makes your API accessible at:  
**`GET /api/news`**

---

### ✅ Step 4: Implement the controller method

Edit `app/Http/Controllers/Api/NewsItemController.php`:

```php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use Illuminate\Http\JsonResponse;

class NewsItemController extends Controller
{
    public function latest(): JsonResponse
    {
        $latestNews = NewsItem::orderBy('timestamp', 'desc')
            ->take(10)
            ->get();

        return response()->json($latestNews);
    }
}
```

---

### ✅ Step 5: Test the API

Start the Laravel dev server:

```bash
php artisan serve
```

Then visit:

```
http://localhost:8000/api/news
```

You’ll get a JSON array of the 10 most recent news items based on the `timestamp` column.

---

### 💡 Optional Improvements

- **Add Resource Formatting**: Use Laravel resources to format the API response.
- **Pagination Support**: Use `->paginate(10)` instead of `->take(10)`.
- **Validation or Filtering**: Add filters by tag, date range, etc.

---

Would you like to wrap the response in a consistent structure (like `{ data: [...], status: 200 }`) or format the date into something like `"2 hours ago"` on the backend?





## II. 404 Troubleshoting 
Got it! A 404 from `api.php` means Laravel **isn't recognizing your route** — here’s how to troubleshoot and fix it step-by-step:

---

### ✅ 1. **Double-check your route definition**

Make sure `routes/api.php` includes this:

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsItemController;

Route::get('/news', [NewsItemController::class, 'latest']);
```

---

### ✅ 2. **Verify Controller Path and Method**

Make sure the file exists at:

```
app/Http/Controllers/Api/NewsItemController.php
```

And contains this method:

```php
public function latest(): \Illuminate\Http\JsonResponse
{
    return response()->json(\App\Models\NewsItem::orderBy('timestamp', 'desc')->take(10)->get());
}
```

---

### ✅ 3. **Restart the development server**

If you're using `php artisan serve`, stop it (CTRL+C) and restart:

```bash
php artisan serve
```

Sometimes route caching or server state causes temporary 404s.

---

### ✅ 4. **Check your URL**

When using `api.php`, your routes are automatically prefixed with `/api`.

So this route:

```php
Route::get('/news', ...);
```

Will be accessible at:

```
http://localhost:8000/api/news
```

Make sure you’re not hitting `/news` directly.

---

### ✅ 5. **Clear route cache (if in production or deployed)**

If you’re deploying or running on a live server (like uberspace), clear the route cache:

```bash
php artisan route:clear
```

Or if you did `php artisan route:cache` before, run:

```bash
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

You can rebuild them using:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### ✅ 6. **Debug with route:list**

Check if your route is registered at all:

```bash
php artisan route:list
```

Look for this line in the output:

```
GET|HEAD  api/news  ...  App\Http\Controllers\Api\NewsItemController@latest
```


## III. Swagger (Documentation)

Swagger Setup and Documentation for Laravel

### 1. Setting Up Swagger in Laravel

#### Step 1: Install Swagger (L5-Swagger)
Run the following command to install the L5-Swagger package:

```bash
composer require "darkaonline/l5-swagger"
```

#### Step 2: Publish the Configuration
Publish the configuration file using:

```bash
php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
```

#### Step 3: Configure Your `.env` File
(This can be done in the future)
Set the following environment variables in your `.env` file:

```env
L5_SWAGGER_GENERATE_ALWAYS=true  # Auto-generate docs on each request in development
L5_SWAGGER_UI_DARK_MODE=true     # Enable dark mode for the UI
```

### 2. Adding Swagger Annotations to Your Controllers

#### Example 1.: `NewsItemController`

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

#### Example 2.: `SearchController`

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

### 3. Defining Models in Swagger

#### Example: Defining `NewsItem` Model

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

### 4. Generate and Test the API Documentation

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
http://127.0.0.1:8000/api/docs
```

This will open Swagger UI.


### 5. Common Annotations Reference

- `@OA\Info`: API metadata.
- `@OA\Get`, `@OA\Post`, `@OA\Put`, `@OA\Delete`: HTTP methods.
- `@OA\Parameter`: Define query, header, or path parameters.
- `@OA\Response`: Describe response format.
- `@OA\Schema`: Define data models.
