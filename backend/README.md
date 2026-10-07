# Event Hive Backend

RESTful API backend for Event Hive event booking platform built with Express.js, MongoDB (Mongoose), and Node.js.

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js    # Auth & Profile logic
│   │   ├── eventController.js   # Event CRUD operations & search
│   │   └── bookingController.js # Ticket booking & cancellation
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Authentication & route protection
│   │   └── errorMiddleware.js   # 404 & Global error handlers
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Event.js             # Event schema
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth routes
│   │   ├── eventRoutes.js       # /api/events routes
│   │   └── bookingRoutes.js     # /api/bookings routes
│   ├── utils/
│   │   └── apiResponse.js       # Standardized response formatters
│   └── app.js                  # Express app & middleware setup
├── .env                         # Local environment variables
├── .env.example                 # Example environment variables
├── .gitignore                   # Ignored files (node_modules, .env)
├── package.json                 # Dependencies & scripts
└── server.js                    # Server entry point
```

## Getting Started

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Configure `.env`:
   Make sure MongoDB URI and PORT are set properly in `.env`.

4. Run the server:
   - For development (with nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## API Endpoints

- **Health Check**: `GET /api/health`
- **Auth**:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/profile`
- **Events**:
  - `GET /api/events` (query: `?search=...&category=...&city=...`)
  - `GET /api/events/:id`
  - `POST /api/events`
  - `PUT /api/events/:id`
  - `DELETE /api/events/:id`
- **Bookings**:
  - `POST /api/bookings`
  - `GET /api/bookings/user/:userId`
  - `PUT /api/bookings/:id/cancel`
