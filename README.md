A website for presenting our component search tool. 


## How to run the dev

### 🔁 Step 1: Start Vite's Dev Server

In the root of your Laravel app, run:

```bash
npm run dev
```

This launches the **Vite dev server**, which:
- Watches changes in your `resources/js/*.tsx` files
- Rebuilds automatically
- Injects the updates into the browser (Hot Module Replacement)

---

### 🧠 Tip: Use `php artisan serve` in another terminal

So your **workflow during development** looks like this:

```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

You can then visit:  
👉 [http://localhost:8000](http://localhost:8000)  
Vite will inject the latest React bundle automatically via Blade’s `@vite(...)`.
