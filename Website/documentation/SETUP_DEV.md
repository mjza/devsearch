
# Dev setup

This document speaks about how to run development environment. 

## Windows

You need to install **XAMPP** on your machine in `c:\xammp` and your project must be in `C:\Users\username\Git\GitHub\devsearch`, it will guide you step-by-step from **Composer installation** to **running your Laravel + React project**.

---

### ✅ 1. Install Composer (if not yet installed)

1. Download the Windows installer:  
   👉 [https://getcomposer.org/Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)

2. **During installation**, make sure to select the correct PHP path from your XAMPP installation:  
   For XAMPP:  
   ```
   C:\xampp\php\php.exe
   ```

3. After installation, confirm it works:  
   Open **Command Prompt** and run:

   ```bash
   composer --version
   ```

   You should see the Composer version printed.

---

### ✅ 2. Navigate to Your Project Folder

Open **Command Prompt** (CMD), **PowerShell**, or **Git Bash** and run:

```bash
cd C:\Users\username\Git\GitHub\devsearch
```

---

### ✅ 3. Install Laravel Dependencies

```bash
composer install
```

---

### ✅ 4. Set Up Environment File

If you don’t already have a `.env` file in the root of your project:

```bash
copy .env.example .env
```

---

### ✅ 5. Generate Laravel App Key

```bash
php artisan key:generate
```

> If `php` is not recognized, make sure `C:\xampp\php` is in your system's PATH.  
You can also call it directly:

```bash
"C:\xampp\php\php.exe" artisan key:generate
```

---

### ✅ 6. Configure Database in `.env`

If using MySQL from XAMPP, set this in your `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devsearch_db
DB_USERNAME=root
DB_PASSWORD=
```

> Create the `devsearch_db` database via **phpMyAdmin** or **MySQL CLI**.

---

### ✅ 7. Run Migrations

```bash
php artisan migrate
```

Or:

```bash
"C:\xampp\php\php.exe" artisan migrate
```

---

### ✅ 8. Install Node.js and npm (for React)

1. Download Node.js from:  
   👉 [https://nodejs.org](https://nodejs.org)  
   (Choose the LTS version.)

2. Confirm it's working:

```bash
node -v
npm -v
```

---

### ✅ 9. Install Frontend Dependencies

In your project root:

```bash
npm install
```

---

### ✅ 10. Run the Frontend server (React)

```bash
npm run dev
```

> Or use `npm run watch` for live-rebuilding.

---

### ✅ 11. Start Laravel Server

```bash
php artisan serve
```

> If `php` isn’t globally available, use the full path:

```bash
"C:\xampp\php\php.exe" artisan serve
```

---

##### 🎉 Done!

Go to your browser and visit:  
👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

You should see your Laravel + React app running.

---

