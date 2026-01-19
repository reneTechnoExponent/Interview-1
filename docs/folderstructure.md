Interview-1/
├── src/
│   ├── config/             # Configuration (Axios instances, constants)
│   ├── controllers/        # Request handling & orchestration
│   ├── services/           # Business logic & External API communication
│   ├── routes/             # API Route definitions
│   ├── middlewares/        # Global error handler, caching, etc.
│   ├── utils/              # Reusable helpers (ApiError, ApiResponse)
│   └── app.js              # Express app configuration
├── server.js               # Entry point (Server listener)
├── .env                    # Environment variables
└── package.json            # Scripts and dependencies

How to use:
Development: npm run dev (Uses nodemon with the new structure).
Production: npm start.
Endpoint: GET http://localhost:5000/api/dashboard/:userId