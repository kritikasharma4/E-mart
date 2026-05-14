# E-Mart — Full Stack E-Commerce Application

A complete e-commerce platform built with React, Node.js, Express, and MongoDB. Includes a customer-facing storefront and a separate admin dashboard for managing products and categories.

---

## Live URLs

| Service | URL |
|---------|-----|
| Customer Store | https://e-com-hazel-one.vercel.app |
| Admin Dashboard | https://admin-dsv2q08aq-kritikas-projects-36fc5c41.vercel.app |
| Backend API | https://e-mart-backend-5ake.onrender.com |

---

## Tech Stack

### Backend
- **Node.js** + **Express.js** — REST API server
- **MongoDB** + **Mongoose** — Database and ODM
- **Cloudinary** — Image storage and upload
- **CORS** — Cross-origin request handling
- **Dotenv** — Environment variable management
- **p-limit** — Concurrent upload rate limiting

### Customer Frontend
- **React 19** + **React Router v7** — SPA with client-side routing
- **Material-UI v7** — UI component library
- **Axios** — HTTP client
- **React Slick** — Product carousels
- **Swiper** — Banner slider
- **Bootstrap 5** — Utility CSS
- **React Icons** — Icon library

### Admin Dashboard
- **React 18** + **React Router v7** — SPA with client-side routing
- **Material-UI v7** — UI component library
- **Recharts** — Sales data visualization
- **Axios** — HTTP client
- **React Toastify** — Toast notifications
- **Bootstrap 5** — Utility CSS

---

## Project Structure

```
E-mart/
├── app.js                      # Express server entry point
├── package.json                # Backend dependencies
├── render.yaml                 # Render deployment config
├── models/
│   ├── category.js             # Category schema
│   └── products.js             # Product schema
├── routes/
│   ├── categories.js           # Category CRUD routes
│   └── products.js             # Product CRUD routes
├── Dashboard/
│   └── admin/                  # Admin dashboard (React)
│       ├── src/
│       │   ├── App.js
│       │   ├── components/
│       │   │   ├── Header/
│       │   │   └── Sidebar/
│       │   ├── pages/
│       │   │   ├── Dashboard/
│       │   │   ├── ProductList/
│       │   │   ├── ProductUpload/
│       │   │   ├── CategoryList/
│       │   │   ├── CategoryAdd/
│       │   │   ├── ProductDetails/
│       │   │   ├── Login/
│       │   │   └── Register/
│       │   └── utils/
│       │       └── api.js
│       └── package.json
└── e-commerce/
    └── e-com/                  # Customer storefront (React)
        ├── src/
        │   ├── App.js
        │   ├── Pages/
        │   │   ├── Home/
        │   │   ├── Listing/
        │   │   ├── ProductDetails/
        │   │   ├── Cart/
        │   │   ├── SignIn/
        │   │   └── SignUp/
        │   ├── components/
        │   │   ├── Header/
        │   │   ├── Footer/
        │   │   ├── HomeBanner/
        │   │   ├── HomeCat/
        │   │   ├── ProductItem/
        │   │   ├── ProductModal/
        │   │   ├── ProductZoom/
        │   │   ├── ProductTabs/
        │   │   ├── QuantityDrop/
        │   │   ├── Sidebar/
        │   │   └── CountryDropdown/
        │   └── utils/
        │       └── api.js
        └── package.json
```

---

## API Reference

**Base URL:** `https://e-mart-backend-5ake.onrender.com`

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/category` | Get all categories |
| GET | `/api/category/:id` | Get category by ID |
| POST | `/api/category/create` | Create new category |
| PUT | `/api/category/:id` | Update category |
| DELETE | `/api/category/:id` | Delete category |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports filters) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products/create` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

**Query Parameters for `GET /api/products`:**

| Param | Type | Description |
|-------|------|-------------|
| `limit` | number | Number of products to return (default: 12) |
| `skip` | number | Number of products to skip for pagination |
| `category` | string | Filter by category ID |
| `brand` | string | Filter by brand name |
| `search` | string | Search by product name or brand |

**Example:**
```
GET /api/products?limit=10&skip=0&category=684ab310df4c53b8d8042392
```

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
# Install dependencies
npm install

# Create .env file at root
cp .env.example .env
# Fill in your values (see Environment Variables section)

# Start development server
npm run dev
```

Server runs at `http://localhost:4000`

### 3. Customer Frontend

```bash
cd e-commerce/e-com

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_BASE_URL=http://localhost:4000" > .env

# Start development server
npm start
```

App runs at `http://localhost:3000`

### 4. Admin Dashboard

```bash
cd Dashboard/admin

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_BASE_URL=http://localhost:4000" > .env

# Start development server
npm start
```

Dashboard runs at `http://localhost:3001`

---

## Environment Variables

### Backend (root `.env`)

```env
PORT=4000
CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
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
- Browse products by category
- Featured products carousel on homepage
- Product detail page with image zoom
- Filter products by price, brand, stock status
- Add to cart with quantity management
- Persistent cart state across pages
- Sign In / Sign Up pages
- Responsive design (mobile, tablet, desktop)

### Admin Dashboard
- Overview dashboard with stats and best-selling products table
- Product management — list, add, edit, delete
- Category management — list, add, edit, delete
- Image uploads via Cloudinary
- Search and filter across products
- Sidebar navigation with collapsible menus

---

## Deployment

### Backend — Render
- Connected to GitHub repo (`kritikasharma4/E-mart`)
- Auto-deploys on push to `main`
- Build command: `npm install --legacy-peer-deps`
- Start command: `npm start`
- Environment variables set via Render dashboard

### Frontend — Vercel
- Customer store and admin dashboard deployed as separate Vercel projects
- Both point to the Render backend via `REACT_APP_BASE_URL`
- Auto-deploys on push to `main`

---

## Author

**Kritika Sharma**
- GitHub: [@kritikasharma4](https://github.com/kritikasharma4)
- Email: sharmakritika247k@gmail.com
