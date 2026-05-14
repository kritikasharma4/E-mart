# E-Mart — Full Stack E-Commerce Application

A complete e-commerce platform built with React, Node.js, Express, and MongoDB. Includes a customer-facing storefront, a separate admin dashboard for managing products, categories, and orders, and a full JWT-based authentication system.

---

## Live URLs

| Service | URL |
|---------|-----|
| Customer Store | https://e-com-hazel-one.vercel.app |
| Admin Dashboard | https://admin-nine-blush-32.vercel.app |
| Backend API | https://e-mart-backend-5ake.onrender.com |

---

## Tech Stack

### Backend
- **Node.js** + **Express.js** — REST API server
- **MongoDB** + **Mongoose** — Database and ODM
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **Cloudinary** — Image storage and upload
- **CORS** — Cross-origin request handling
- **Dotenv** — Environment variable management
- **p-limit** — Concurrent upload rate limiting

### Customer Frontend
- **React 19** + **React Router v7** — SPA with client-side routing
- **Axios** — HTTP client
- **React Toastify** — Toast notifications
- **React Slick** — Product carousels
- **Swiper** — Banner/category slider
- **React Inner Image Zoom** — Product image zoom
- **React Range Slider Input** — Price range filter
- **React Icons** — Icon library

### Admin Dashboard
- **React 18** + **React Router v7** — SPA with client-side routing
- **Material-UI v7** — UI component library
- **Axios** — HTTP client
- **React Toastify** — Toast notifications
- **Bootstrap 5** — Utility CSS

---

## Project Structure

```
E-mart/
├── app.js                          # Express server entry point
├── seed.js                         # Script to seed 43 products
├── package.json                    # Backend dependencies
├── render.yaml                     # Render deployment config
├── middleware/
│   └── auth.js                     # JWT auth + admin middleware
├── models/
│   ├── category.js                 # Category schema
│   ├── products.js                 # Product schema
│   ├── user.js                     # User schema (bcrypt password)
│   ├── order.js                    # Order schema with status history
│   └── review.js                   # Review schema (unique per user+product)
├── routes/
│   ├── categories.js               # Category CRUD routes
│   ├── products.js                 # Product CRUD routes
│   ├── users.js                    # Auth routes (register, login, profile)
│   ├── orders.js                   # Order routes with tracking
│   └── reviews.js                  # Product review routes
├── Dashboard/
│   └── admin/                      # Admin dashboard (React)
│       ├── src/
│       │   ├── App.js
│       │   ├── components/
│       │   │   ├── Header/
│       │   │   └── Sidebar/
│       │   ├── pages/
│       │   │   ├── Dashboard/      # Real stats from API
│       │   │   ├── Orders/         # Order list with search + filters
│       │   │   ├── OrderDetail/    # Order tracking timeline + status update
│       │   │   ├── ProductList/    # Product CRUD
│       │   │   ├── ProductUpload/  # Add new product
│       │   │   ├── CategoryList/   # Category CRUD
│       │   │   ├── CategoryAdd/    # Add new category
│       │   │   ├── ProductDetails/
│       │   │   ├── Login/          # Admin login (JWT)
│       │   │   └── Register/       # Admin register
│       │   └── utils/
│       │       └── api.js
│       └── package.json
└── e-commerce/
    └── e-com/                      # Customer storefront (React)
        ├── src/
        │   ├── App.js              # Context, cart persistence, auth state
        │   ├── Pages/
        │   │   ├── Home/
        │   │   ├── Listing/        # Real pagination + working filters
        │   │   ├── ProductDetails/ # Reviews, add to cart, related products
        │   │   ├── Cart/
        │   │   ├── Checkout/       # Address form + order placement
        │   │   ├── OrderSuccess/   # Post-order confirmation
        │   │   ├── Orders/         # My order history
        │   │   ├── Search/         # Live search results
        │   │   ├── SignIn/         # Real JWT login
        │   │   └── SignUp/         # Real JWT register
        │   ├── components/
        │   │   ├── Header/         # User menu, search, cart count
        │   │   ├── Footer/
        │   │   ├── HomeBanner/
        │   │   ├── HomeCat/
        │   │   ├── ProductItem/
        │   │   ├── ProductModal/
        │   │   ├── ProductZoom/
        │   │   ├── QuantityDrop/
        │   │   └── Sidebar/        # Price/brand/stock filters
        │   └── utils/
        │       └── api.js
        └── package.json
```

---

## API Reference

**Base URL:** `https://e-mart-backend-5ake.onrender.com`

### Auth — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/users/register` | None | Register new user, returns JWT |
| POST | `/api/users/login` | None | Login, returns JWT |
| GET | `/api/users/profile` | User | Get own profile |
| GET | `/api/users/my-orders` | User | Get own order history |
| GET | `/api/users` | Admin | List all users |

### Categories — `/api/category`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/category` | None | Get all categories |
| GET | `/api/category/:id` | None | Get category by ID |
| POST | `/api/category/create` | None | Create category (Cloudinary upload) |
| POST | `/api/category/seed` | None | Create category with pre-hosted image URL |
| PUT | `/api/category/:id` | None | Update category |
| DELETE | `/api/category/:id` | None | Delete category |

### Products — `/api/products`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | None | Get all products (supports filters) |
| GET | `/api/products/featured` | None | Get featured products |
| GET | `/api/products/:id` | None | Get product by ID |
| POST | `/api/products/create` | None | Create product (Cloudinary upload) |
| POST | `/api/products/seed` | None | Create product with pre-hosted image URLs |
| PUT | `/api/products/:id` | None | Update product |
| DELETE | `/api/products/:id` | None | Delete product |

**Query Parameters for `GET /api/products`:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | number | Number of products to return (default: 12) |
| `skip` | number | Number of products to skip for pagination |
| `category` | string | Filter by category ID |
| `brand` | string | Filter by brand name |
| `search` | string | Search by product name or brand |

### Orders — `/api/orders`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | User | Place a new order |
| GET | `/api/orders` | Admin | Get all orders (filter by status, search) |
| GET | `/api/orders/stats` | Admin | Get revenue, totals, status counts |
| GET | `/api/orders/:id` | User/Admin | Get single order with full details |
| PUT | `/api/orders/:id/status` | Admin | Update order status + append to history |

### Reviews — `/api/reviews`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reviews/:productId` | None | Get all reviews for a product |
| POST | `/api/reviews/:productId` | User | Submit a review (one per user per product) |
| DELETE | `/api/reviews/:id` | User | Delete own review |

---

## Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/kritikasharma4/E-mart.git
cd E-mart
```

### 2. Backend

```bash
npm install

# Create .env file
cp .env.example .env
# Fill in your values (see Environment Variables section)

npm run dev
```

Server runs at `http://localhost:4000`

### 3. Customer Frontend

```bash
cd e-commerce/e-com
npm install
echo "REACT_APP_BASE_URL=http://localhost:4000" > .env
npm start
```

App runs at `http://localhost:3000`

### 4. Admin Dashboard

```bash
cd Dashboard/admin
npm install
echo "REACT_APP_BASE_URL=http://localhost:4000" > .env
npm start
```

Dashboard runs at `http://localhost:3001`

### 5. Seed Products (optional)

```bash
# From repo root — populates 43 products across the seeded categories
node seed.js
```

---

## Environment Variables

### Backend (root `.env`)

```env
PORT=4000
CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Customer Frontend (`e-commerce/e-com/.env`)

```env
REACT_APP_BASE_URL=https://e-mart-backend-5ake.onrender.com
```

### Admin Dashboard (`Dashboard/admin/.env`)

```env
REACT_APP_BASE_URL=https://e-mart-backend-5ake.onrender.com
```

---

## Features

### Customer Store
- Browse 11 categories: beauty, groceries, men, women, kids, electronics, footwear, sports, home & kitchen, watches, bags
- Feature strip on homepage — free delivery, secure payment, 24/7 support, easy returns
- Gradient promo banner cards between product sections (no external image dependencies)
- Featured products carousel on homepage
- Product detail page with image zoom and related products
- Customer reviews with star ratings (one per user per product)
- Filter products by price range, brand, and stock availability
- Add to cart with quantity management
- Cart persisted to localStorage (survives page refresh)
- Search products by name or brand
- Full JWT auth — Sign Up / Sign In with token stored in browser
- Checkout with shipping address form and payment method selection
- Order confirmation page with full order details
- My Orders page with order status history
- Toast notifications for cart and auth actions
- Responsive design (mobile, tablet, desktop)

### Admin Dashboard
- Protected routes — only `isAdmin: true` accounts can access
- Login / Register with JWT (admin flag enforced at API level)
- Dashboard with live stats — total products, orders, revenue, pending count
- **Order Management:**
  - Order list with search (name/email/order ID) and status filter
  - Status chips with color coding
  - Order detail page with visual tracking timeline
  - Update order status with optional note (courier name, tracking number, etc.)
  - Customer info, shipping address, items table, payment details per order
- Product management — list, search, edit, delete
- Product upload — add products with image URLs
- Category management — list, add, edit, delete
- Sidebar navigation with collapsible menus and logout

---

## Deployment

### Backend — Render
- Connected to GitHub repo (`kritikasharma4/E-mart`)
- Auto-deploys on push to `main`
- Start command: `npm start`
- Required environment variables set via Render dashboard: `CONNECTION_STRING`, `JWT_SECRET`, `CLOUDINARY_*`

### Frontend — Vercel
- Customer store and admin dashboard deployed as separate Vercel projects
- Both point to the Render backend via `REACT_APP_BASE_URL`
- Auto-deploys on push to `main`

---

## Author

**Kritika Sharma**
- GitHub: [@kritikasharma4](https://github.com/kritikasharma4)
- Email: sharmakritika247k@gmail.com
