# Deployment

This document speaks about how to deploy the app to different servers.

## Deployment to IONOS:

Deploying a **Laravel + React (Vite)** app to **IONOS with SSH/SFTP** access is possible, but you need to understand a few constraints:

---

### 🚨 IONOS Hosting Considerations

Most **IONOS web hosting plans** (especially shared hosting):
- ❌ Don't allow running `artisan serve`, `npm`, `composer`, or Vite directly on the server.
- ✅ Do support **PHP**, **MySQL**, and basic **SSH**.
- ✅ You can upload pre-built files and configure Laravel to run via Apache (or Nginx on VPS).

---

### 🛠️ Deployment Strategy Overview

We’ll:

1. ✅ Build the React frontend **locally**.
2. ✅ Upload the Laravel app (with frontend already compiled) to the server via **SFTP**.
3. ✅ Configure Laravel to run under Apache (`public/` as the root).
4. ✅ Set proper file permissions and `.env`.
5. ✅ Migrate database if needed.

---

### ✅ Step-by-Step Deployment to IONOS via SFTP/SSH

#### 1. 🔧 Build Frontend (React via Vite) Locally

In your project root:

```bash
npm run build
```

➡️ This creates production-ready frontend assets in `public/build/`.

---

#### 2. 💻 Prepare Laravel for Production

**Still on your local machine:**

```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

#### 3. 🌐 Upload Files to IONOS

Use **FileZilla** or another SFTP tool:

- Upload **everything** **except**:
  - `node_modules/`
  - `tests/`
  - `.git/`

🎯 Your Laravel app **must be placed outside `public_html/`** except for the `public/` folder. Ibn out case we set the domain to refer to `/devsearch/public` so please everything in the same structure as the local.

📁 Recommended structure on server:
```
    devsearch/        ← All Laravel files here
        public/      ← Only contents of /devsearch/public go here
```

### ✅ STEP-BY-STEP: Initialize Laravel on IONOS Shared Hosting 

Since IONOS gives you **CLI access with a specific PHP binary** (like `/usr/bin/php8.2-cli`), you can now **initialize Laravel properly and fully on the server.**

Here’s your **full Laravel initialization guide for IONOS shared hosting**, step by step. This will configure your app **securely for production**, including key generation, cache setup, migrations, and permissions.

---

#### ✅ 1. **SSH Into Your Server**

Use your terminal or any SSH client (like PuTTY or MobaXterm):

```bash
ssh your-username@your-domain.com
```

Once connected:

```bash
cd ~/devsearch
```

---

#### ✅ 2. **Set Correct File Permissions**

Laravel needs write access to some folders:

```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache

```

> ✅ You can use `chmod -R 777` during setup for testing, but **revert to 775** after confirming everything works.

---

#### ✅ 3. **Generate the APP_KEY**

Run:

```bash
/usr/bin/php8.2-cli artisan key:generate
```

✅ This updates your `.env` with a valid `APP_KEY`

---

#### ✅ 4. **Update Your `.env` File for Production**

Make sure `.env` contains:

```env
APP_NAME=DevSearch
APP_ENV=production
APP_KEY=
APP_DEBUG=false                # ⛔️ Turn off debug in production!
APP_URL=https://devsearch.ca

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

# ✅ Logging: Keep enabled, write to logs only (no debug on frontend)
LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=debug                 # 🔁 Change from 'debug' to 'info'
LOG_DEPRECATIONS_CHANNEL=null

# ✅ Database
DB_CONNECTION=mysql
DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

# ✅ Sessions
SESSION_DRIVER=file            # Prefer 'file' for shared hosting
SESSION_LIFETIME=120
SESSION_ENCRYPT=true           # 🔐 Enable session encryption
SESSION_PATH=/
SESSION_DOMAIN=devsearch.ca    # Update from 'null'
SESSION_SECURE_COOKIE=true

# ✅ Queues
QUEUE_CONNECTION=sync          # Use 'sync' unless you use queue workers

# ✅ Cache
CACHE_DRIVER=file              # Use 'file' to avoid DB table issues
CACHE_STORE=file

# Redis/Memcached (not used on IONOS shared hosting)
#MEMCACHED_HOST=127.0.0.1
#REDIS_CLIENT=phpredis
#REDIS_HOST=127.0.0.1
#REDIS_PASSWORD=null
#REDIS_PORT=6379

# ✅ Email (logging only)
MAIL_MAILER=log
MAIL_FROM_ADDRESS=hello@devsearch.ca
MAIL_FROM_NAME="DevSearch"

# AWS - Unused (optional)
#AWS_ACCESS_KEY_ID=
#AWS_SECRET_ACCESS_KEY=
#AWS_DEFAULT_REGION=us-east-1
#AWS_BUCKET=
#AWS_USE_PATH_STYLE_ENDPOINT=false

# ✅ Vite frontend
VITE_APP_NAME="${APP_NAME}"

```

Use `file` drivers to avoid needing cache/session database tables.

---

#### ✅ 5. **Clear Any Old Cache**

```bash
/usr/bin/php8.2-cli artisan optimize:clear
```

or

```bash
/usr/bin/php8.2-cli artisan config:clear
/usr/bin/php8.2-cli artisan cache:clear
/usr/bin/php8.2-cli artisan route:clear
/usr/bin/php8.2-cli artisan view:clear
```

---

#### ✅ 6. **Rebuild Cache for Production**

```bash
/usr/bin/php8.2-cli artisan config:cache
/usr/bin/php8.2-cli artisan route:cache
/usr/bin/php8.2-cli artisan view:cache
```

✅ These will generate optimized cache files in `bootstrap/cache/`.

---

#### ✅ 7. **Run Migrations (if you use MySQL)**

```bash
/usr/bin/php8.2-cli artisan migrate --force
```

> `--force` is required in production to run without confirmation.

For migrate and seeding:

```bash
/usr/bin/php8.2-cli artisan migrate:fresh --seed
```

For only seeding:
```bash
/usr/bin/php8.2-cli  artisan db:seed
```

---

#### ✅ 8. **Build Frontend (if using Vite/React)**

Vite won’t run on shared hosting, so do this locally:

```bash
npm run build
```

Then upload the resulting `public/build/` (or whatever your Vite config outputs) to your server via SFTP.

---

#### ✅ 9. **Ensure `.htaccess` Is Present in `public/`**

The file `public/.htaccess` must contain the following based on this [link](https://laracasts.com/discuss/channels/laravel/unable-to-deploy-laravel-app-to-ionos-shared-hosting):

```apache
<IfModule mod_rewrite.c>

    RewriteBase /

    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ index.php [QSA,L]
    
</IfModule>
```

✅ This ensures routes like `/login` work.

---

#### ✅ 10. **Visit Your Website**

Go to:

```
https://devsearch.ca
```

🎉 Your Laravel app should now be working in production mode!

---

### ✅ OPTIONAL: Test Logging

You can test logging with:

```bash
/usr/bin/php8.2-cli artisan tinker
>>> \Log::info("Log works!");
```

Then check `cat storage/logs/laravel.log`.

---

### 🧩 Final Notes

| Task | Command |
|------|---------|
| Laravel CLI | `/usr/bin/php8.2-cli artisan` |
| Set permissions | `chmod -R 775 storage bootstrap/cache` |
| View logs | `vi storage/logs/laravel.log` or download via SFTP |
| Rebuild everything | Run key:generate + cache clear + cache build + migrate |

---

Would you like me to bundle all these into a one-line `init.sh` script you can run on the server?