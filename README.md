# Dashboard Aggregator API

This project is a RESTful API built with Node.js and Express.js that aggregates user profile data and posts from external legacy APIs into a single, optimized response.

## Features

- **Data Aggregation**: Combines user details and posts.
- **Caching**: Simple in-memory cache for repeated requests.
- **error Handling**: Centralized error management with clean responses.
- **Security**: Basic protection with `helmet` and `cors`.
- **Documentation**: Integrated Swagger UI for API exploration.

## Quick Start

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run in Development**:

   ```bash
   npm run dev
   ```

3. **API Documentation**:
   Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view the interactive Swagger documentation.

## Main Endpoint

- `GET /api/dashboard/:userId`: Returns aggregated data for the specified user.

## Detailed Documentation

For more detailed information on structure and notes, see [docs/README.md](./docs/README.md).
