# Dodge.Fit - Fitness E-commerce Platform

A modern full-stack fitness e-commerce platform with premium gear, community features, and workout tracking.

## Project Structure

```
Doge.fit-main/
├── frontend/          # React + TypeScript + Vite frontend
│   └── src/assets/    # Images and assets
├── backend/           # FastAPI Python backend
└── README.md         # This file
```

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Query
- Wouter (Routing)

**Backend:**
- FastAPI
- Python 3.8+
- JWT Authentication
- SQLite/PostgreSQL ready

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip

### Installation

1. **Install Frontend Dependencies:**
```bash
npm install
```

2. **Install Backend Dependencies:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Environment Variables

Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

Create a `.env` file in `backend/` folder (optional):
```env
SECRET_KEY=your-secret-key-change-in-production
PORT=8000
```

### Running the Project

**Option 1: Run Both Together (Recommended)**
```bash
npm run dev
```

**Option 2: Run Separately**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

## Access Points

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Features

✅ User Authentication (Email/Password + Google OAuth)
✅ Product Catalog with Shopping Cart
✅ Secure Checkout with Coupon System
✅ FastAPI Backend with JWT Authentication
✅ Responsive Design
✅ Indian Rupee (₹) Pricing
✅ Review Slider with Indian Members

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login (returns JWT token)
- `GET /api/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID

### Other
- `POST /api/leads` - Submit lead form
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/verify-coupon` - Verify coupon code
- `POST /api/checkout` - Process checkout (requires auth)

## Building for Production

```bash
npm run build
```

The frontend will be built in the `dist/public` folder.

## License

MIT
