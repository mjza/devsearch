This Laravel project provides two API endpoints:

- **GET `/api/news`**  
  Returns the 10 most recent news items based on their timestamp.
  
- **GET `/api/search`**  
  Searches for projects by name or description and returns a list of projects with their quality attributes (e.g., performance, usability, security, maintainability) based on similarity scores.

---
## Run Database Migrations (and Seed if needed)


`php artisan migrate`

## Running the Application
Start the Laravel development server:

`php artisan serve`
Your application will be available at:
http://localhost:8000

# API Endpoints
1. News API
Endpoint: GET /api/news

Description:
Returns the 10 most recent news items from the NewsItem model, sorted by the timestamp field.

Testing:
Open your browser or an API client (like Postman) and visit:


`http://localhost:8000/api/news`
2. Search API
Endpoint: GET /api/search

Query Parameter:

q (required) – The search query used to find projects by their name or description.

Description:
Searches the Project model based on the query string and then retrieves related quality analyses from the QualityAnalysis model to return the project's quality attributes (performance, usability, security, maintainability).

Testing:
Use a browser or an API client like Postman and pass a query parameter. For example:


`http://localhost:8000/api/search?q=React`
The response will be a JSON array similar to:

```json
[
  {
    "name": "React.js",
    "performance": 0.92,
    "usability": 0.88,
    "security": 0.75,
    "maintainability": 0.80
  },
  {
    "name": "Vue.js",
    "performance": 0.89,
    "usability": 0.85,
    "security": 0.78,
    "maintainability": 0.83
  }
]
```



