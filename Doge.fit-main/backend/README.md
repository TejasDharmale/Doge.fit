# Backend - MVC Structure

FastAPI backend with proper MVC (Model-View-Controller) architecture.

## Structure

```
backend/
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration (SQLAlchemy)
├── init_db.py          # Initialize database tables
├── seed.py             # Seed initial data
├── requirements.txt    # Python dependencies
│
├── models/             # Database Models (MVC - Model)
│   ├── __init__.py
│   ├── user.py
│   ├── product.py
│   ├── order.py
│   ├── coupon.py
│   ├── lead.py
│   └── newsletter.py
│
├── schemas/            # Pydantic Schemas (Request/Response models)
│   ├── __init__.py
│   ├── user.py
│   ├── product.py
│   ├── order.py
│   └── lead.py
│
├── controllers/        # Business Logic (MVC - Controller)
│   ├── __init__.py
│   ├── auth_controller.py
│   ├── product_controller.py
│   ├── order_controller.py
│   ├── coupon_controller.py
│   ├── lead_controller.py
│   └── newsletter_controller.py
│
└── routes/            # API Routes (MVC - View)
    ├── __init__.py
    ├── auth.py
    ├── products.py
    ├── orders.py
    ├── coupons.py
    ├── leads.py
    └── newsletter.py
```

## Setup

1. **Install Dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Initialize Database:**
```bash
python init_db.py
```

3. **Seed Initial Data:**
```bash
python seed.py
```

4. **Run Server:**
```bash
python main.py
# or
uvicorn main:app --reload --port 8000
```

## Database

- **Default**: SQLite (development) - `dodgefit.db`
- **Production**: PostgreSQL (set `DATABASE_URL` env variable)

The database file will be created in the `backend/` directory.

## API Endpoints

All endpoints are prefixed with `/api`:

- **Auth**: `/api/register`, `/api/login`, `/api/me`
- **Products**: `/api/products`, `/api/products/{id}`
- **Orders**: `/api/checkout`
- **Coupons**: `/api/verify-coupon`
- **Leads**: `/api/leads`
- **Newsletter**: `/api/newsletter`

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-secret-key-change-in-production
DATABASE_URL=sqlite:///./dodgefit.db
PORT=8000
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

