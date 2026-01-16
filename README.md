# Interview-1

> **Task: User Dashboard Aggregation API**
> **Time Limit:** 60 Minutes
>
> **Objective:** Build a RESTful API using Node.js and Express.js that aggregates data from multiple external sources into a single optimized dashboard response.
>
> **Scenario:**
> You are building the backend for a user dashboard. The frontend needs to display a user's profile and their latest posts. The data lives in two separate legacy APIs.
>
> **Requirements:**
> 1.  **GET /api/dashboard/:userId**
>     *   Fetch User details from `https://jsonplaceholder.typicode.com/users/:id`
>     *   Fetch User's Posts from `https://jsonplaceholder.typicode.com/posts?userId=:id`
>     *   **Merge** the data into a single JSON response:
>         ```json >         { >           "id": 1, >           "name": "Leanne Graham", >           "email": "Sincere@april.biz", >           "company": "Romaguera-Crona", >           "posts": [ >             { "id": 1, "title": "...", "body": "..." }, >             ... >           ] >         } >         ```
>
> 2.  **Error Handling:**
>     *   If the user ID does not exist (external API returns 404), your API must return a clean 404 with a message `{"error": "User not found"}`.
>     *   Handle cases where the external API is down or times out.
>
> 3.  **Bonus (Expectation for Senior Devs):**
>     *   Implement a simple in-memory cache (e.g., global object or Map) so repeated requests for the same ID don't hit the external API.
>
> **Stack:** Node.js, Express.js (Standard JavaScript, ES6+ features encouraged).
