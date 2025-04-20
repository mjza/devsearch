# Run Dev
This document speaks about how to run dev server.

## Update the libraries

For updating the libraries run the following commands in the root of the project:

```bash
npm update
composer update
```

## How to run the dev server

You need 2 terminals for the following steps:

### 🔁 Step 1: Start Vite's Dev Server

In the root of your Laravel app, run:

```bash
npm run dev
```

This launches the **Vite dev server**, which:
- Watches changes in your `resources/js/*.tsx` files
- Rebuilds the front-end automatically
- Injects the updates into the browser (Hot Module Replacement)

---

### 🔁 Step 2: Run Laravel server in another terminal

```bash
php artisan serve
```

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
