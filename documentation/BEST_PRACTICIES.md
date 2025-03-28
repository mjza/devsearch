# Best Practices

## Add a new page
Since it is using **Inertia.js with Laravel + React**, for adding a `/newpage` follow these steps:

---

## ✅ How Inertia Routing Works (Quick Recap)

Inertia’s `createInertiaApp` **doesn't automatically make frontend pages available as routes** — instead, you define routes in **Laravel (`routes/web.php`)**, and each route returns an Inertia response that loads your React page.

---

## ✅ Step-by-Step Actions

### 1️⃣ **Define the Route in `routes/web.php`**

Open your `routes/web.php` and add:

```php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/newurl', function () {
    return Inertia::render('newpage'); // matches /pages/newpage.tsx automatically
})->name('newpage');
```

Make sure `'newpage'` matches exactly the component filename (`newpage.tsx`) in `/pages`.

---

### 2️⃣ **Visit `/newurl` in the browser**

Now that the Laravel route is defined, visiting `/newurl` should load the `newpage.tsx` component you created. If not make sure you clear the cache:

```
php artisan optimize:clear
```

---

### 3️⃣ (Optional) **Navigate via Inertia**

If you're using Inertia `Link` or `router`, you can do this:

```tsx
import { Link } from '@inertiajs/react';

<Link href={route('newurl')}>Go to Results</Link>
```

Or programmatically:

```tsx
import { router } from '@inertiajs/react';

router.visit(route('newurl', { query: 'react' }));
```

You can read query params using:

```tsx
import { usePage } from '@inertiajs/react';

const { url } = usePage();
const query = new URLSearchParams(url.split('?')[1]);
```

