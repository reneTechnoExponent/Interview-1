# Dashboard Aggregator API Documentation

This project is a technical assessment implementation for a User Dashboard Aggregation API.

## Project Overview

The API aggregates data from two external sources:

1. **User Profile**: Fetched from `https://jsonplaceholder.typicode.com/users/{userId}`
2. **User Posts**: Fetched from `https://jsonplaceholder.typicode.com/posts?userId={userId}`

## How to Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Interview-1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**: runs with `nodemon`
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The server will be listening on port `3000` by default (or the value of `PORT` in your `.env` file, here it is 5000).

## API Documentation

Once the server is running, you can access the Swagger documentation at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### Main Endpoint

- **GET** `/api/dashboard/:userId`
  - Fetches and aggregates user details and their posts.
  - Implements in-memory caching for performance.
  - Returns a clean `404` error if the user is not found.

## Notes & Future Improvements

- **Dashboard API**: This is currently a dashboard aggregator. It can be extended later to include other modules like authentication, merchant management, etc.
- **Caching**: The current implementation uses a simple in-memory cache. For production, consider using Redis.
- **Security**: Basic security headers are implemented using `helmet` and `cors`.
- **Error Handling**: Centralized error handling returns consistent JSON responses.
- **IP Blocking**: A placeholder middleware `ipBolckerShort` is included for future implementation of IP-based restrictions.
- **Activity Logging**: A basic activity logger is integrated into the request lifecycle.
