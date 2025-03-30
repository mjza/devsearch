## Making APIs for site

Make the controller lives under `**app/Http/Controllers/Api**`.

---

## ✅ Step 1: Create a Model (if not done yet)

```bash
php artisan make:model NewsItem
```

---

## ✅ Step 2: Create an API Controller

```bash
php artisan make:controller Api/NewsItemController
```

---

## ✅ Step 3: Add Route in `routes/api.php`

Add this at the bottom of `routes/api.php`:

```php
use App\Http\Controllers\Api\NewsItemController;

Route::get('/news', [NewsItemController::class, 'latest']);
```

This makes your API accessible at:  
**`GET /api/news`**

---

## ✅ Step 4: Implement the controller method

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

## ✅ Step 5: Test the API

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





## 404 Troubleshoting 
Got it! A 404 from `api.php` means Laravel **isn't recognizing your route** — here’s how to troubleshoot and fix it step-by-step:

---

## ✅ 1. **Double-check your route definition**

Make sure `routes/api.php` includes this:

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsItemController;

Route::get('/news', [NewsItemController::class, 'latest']);
```

---

## ✅ 2. **Verify Controller Path and Method**

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

## ✅ 3. **Restart the development server**

If you're using `php artisan serve`, stop it (CTRL+C) and restart:

```bash
php artisan serve
```

Sometimes route caching or server state causes temporary 404s.

---

## ✅ 4. **Check your URL**

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

## ✅ 5. **Clear route cache (if in production or deployed)**

If you’re deploying or running on a live server (like uberspace), clear the route cache:

```bash
php artisan route:clear
```

Or if you did `php artisan route:cache` before, run:

```bash
php artisan optimize:clear
```

---

## ✅ 6. **Debug with route:list**

Check if your route is registered at all:

```bash
php artisan route:list
```

Look for this line in the output:

```
GET|HEAD  api/news  ...  App\Http\Controllers\Api\NewsItemController@latest
```
