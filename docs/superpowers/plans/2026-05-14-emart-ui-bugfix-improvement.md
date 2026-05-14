# E-mart UI Improvement, Bug Fix & Deployment Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all known bugs, modernize the UI for both the customer frontend and admin dashboard, improve code quality, and deploy both apps to new live URLs.

**Architecture:** The project has three parts — an Express/MongoDB backend (deployed on Render), a React customer frontend (deployed on Vercel), and a React admin dashboard (deployed on Vercel). Changes are isolated per app. The backend API URL is already live at `https://e-commm-ui4k.onrender.com` and will be reused.

**Tech Stack:** Express.js, MongoDB/Mongoose, React 18/19, Material-UI v7, React Router v7, Axios, Bootstrap 5, Cloudinary, Vercel (frontend deploys), Render (backend)

---

## Task 1: Fix Critical Bugs — Customer Frontend App.js

**Files:**
- Modify: `e-commerce/e-com/src/App.js`

- [ ] Fix `res.data.data` → `res.data` in `getCountry` (restcountries API returns array directly at `.data`, not `.data.data`)

```js
// In getCountry function, change:
setCountryList(res.data.data);
// To:
setCountryList(res.data);
```

- [ ] Remove the stale console.log lines from getCountry

- [ ] Add `MyContext` export of `setModalProduct` to context values so ProductItem can set modal product

```js
const [modalProduct, setModalProduct] = useState(null);
// add to values object:
modalProduct,
setModalProduct,
```

- [ ] Commit

```bash
cd /Users/kritikasharma/E-mart
git add e-commerce/e-com/src/App.js
git commit -m "fix: correct restcountries API parsing and add modalProduct to context"
```

---

## Task 2: Fix Critical Bugs — Customer Frontend Header

**Files:**
- Modify: `e-commerce/e-com/src/components/Header/index.js`

- [ ] Fix `MyContext.isLogin !== true` → `context.isLogin !== true` (MyContext is the context object, not its value)

```js
// Change:
MyContext.isLogin!==true?
// To:
context.isLogin!==true?
```

- [ ] Add `isLogin` to destructured context:

```js
const { countryList, isLogin } = useContext(MyContext);
```

- [ ] Remove duplicate `<CountryDropdown />` — keep only one, conditionally rendered:

```js
// Remove both existing CountryDropdown renders and replace with:
{countryList?.length > 0 && <CountryDropdown />}
```

- [ ] Fix broken `/SignIn` route link — should be `/signIn` (lowercase s) to match App.js route

- [ ] Commit

```bash
git add e-commerce/e-com/src/components/Header/index.js
git commit -m "fix: correct context usage, remove duplicate CountryDropdown, fix SignIn route case"
```

---

## Task 3: Fix Critical Bugs — SignIn Page (JSX className)

**Files:**
- Modify: `e-commerce/e-com/src/Pages/SignIn/index.js`

- [ ] Fix all `class=` → `className=` in JSX (HTML attribute not valid in JSX):

```jsx
// Line ~20: change
<div class="shape-bottom">
// to
<div className="shape-bottom">

// SVG attributes — change class= to className= on all svg/path elements inside shape-bottom
```

- [ ] Fix the "Not Registered? SignUp" link — currently `<Link to="">` should be `<Link to="/signUp">`:

```jsx
<Link to="/signUp" className="border-effect">SignUp</Link>
```

- [ ] Commit

```bash
git add e-commerce/e-com/src/Pages/SignIn/index.js
git commit -m "fix: replace class with className in SignIn JSX, fix SignUp link"
```

---

## Task 4: Make Listing Page Dynamic

**Files:**
- Modify: `e-commerce/e-com/src/Pages/Listing/index.js`

- [ ] Add state and useEffect to fetch products from API based on category from URL params:

```js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  // ...existing state
```

- [ ] Fetch products in useEffect:

```js
useEffect(() => {
  setLoading(true);
  const url = id
    ? `/api/products?category=${id}&limit=${perPage}&skip=0`
    : `/api/products?limit=${perPage}&skip=0`;
  fetchDataFromApi(url).then((res) => {
    setProducts(res.products || []);
    setLoading(false);
  });
}, [id, perPage]);
```

- [ ] Replace the 20 hardcoded `<ProductItem />` renders with a dynamic map:

```jsx
<div className={`productListing ${productView}`}>
  {loading ? (
    <p className="text-center w-100 py-5">Loading products...</p>
  ) : products.length === 0 ? (
    <p className="text-center w-100 py-5">No products found.</p>
  ) : (
    products.map((product) => (
      <ProductItem key={product._id} product={product} itemView={productView} />
    ))
  )}
</div>
```

- [ ] Wire up the Show per page dropdown to update `perPage` state:

```jsx
<MenuItem onClick={() => { setPerPage(10); handleClose(); }}>10</MenuItem>
<MenuItem onClick={() => { setPerPage(20); handleClose(); }}>20</MenuItem>
<MenuItem onClick={() => { setPerPage(30); handleClose(); }}>30</MenuItem>
<MenuItem onClick={() => { setPerPage(40); handleClose(); }}>40</MenuItem>
```

- [ ] Update the "Show 10" button text dynamically:

```jsx
<Button onClick={handleClick}>Show {perPage} <VscTriangleDown /></Button>
```

- [ ] Commit

```bash
git add e-commerce/e-com/src/Pages/Listing/index.js
git commit -m "feat: make Listing page dynamic — fetch products from API by category and perPage"
```

---

## Task 5: Add Cart Context State Management

**Files:**
- Modify: `e-commerce/e-com/src/App.js`
- Modify: `e-commerce/e-com/src/Pages/Cart/index.js`

- [ ] Add cart state to App.js context:

```js
const [cartItems, setCartItems] = useState([]);

const addToCart = (product) => {
  setCartItems(prev => {
    const existing = prev.find(i => i._id === product._id);
    if (existing) {
      return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i);
    }
    return [...prev, { ...product, qty: 1 }];
  });
};

const removeFromCart = (id) => {
  setCartItems(prev => prev.filter(i => i._id !== id));
};

const updateQty = (id, qty) => {
  if (qty < 1) return;
  setCartItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
};

// Add to values:
cartItems, addToCart, removeFromCart, updateQty,
```

- [ ] Rewrite Cart page to use context cart state:

```jsx
import { useContext } from 'react';
import { MyContext } from '../../App';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(MyContext);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <section className="section cartPage">
      <div className="container">
        <h2 className="hd mb-0">Your Cart</h2>
        <p>There are <b>{cartItems.length}</b> products in your cart</p>
        <div className="row">
          <div className="col-md-9 pr-5">
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <p>Your cart is empty.</p>
                <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/product/${item._id}`}>
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src={item.images?.[0] || 'https://via.placeholder.com/80'} className="w-100" alt={item.name} />
                              </div>
                              <div className="info px-3">
                                <h6>{item.name}</h6>
                                <Rating name="read-only" value={item.rating || 0} precision={0.5} size='small' readOnly />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>₹{item.price?.toFixed(2)}</td>
                        <td className="quantity-col">
                          <QuantityDrop qty={item.qty} onChange={(q) => updateQty(item._id, q)} />
                        </td>
                        <td>₹{(item.price * item.qty).toFixed(2)}</td>
                        <td><span className='remove' onClick={() => removeFromCart(item._id)}><IoClose /></span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <div className='card border p-3 cartDetails'>
              <h4>CART TOTALS</h4>
              <div className='d-flex align-items-center mb-3'>
                <span>Subtotal</span>
                <span className='ml-auto text-red' style={{fontWeight:'bold'}}>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span>Shipping</span>
                <span className='ml-auto'><b>Free</b></span>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span>Total</span>
                <span className='ml-auto text-red' style={{fontWeight:'bold'}}>₹{subtotal.toFixed(2)}</span>
              </div>
              <Button className='btn-lg btn-big' style={{background:'#2bbef9', color:'#fff'}}>Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] Update QuantityDrop to accept `qty` and `onChange` props:

```jsx
// e-commerce/e-com/src/components/QuantityDrop/index.js
const QuantityDrop = ({ qty = 1, onChange }) => {
  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={() => onChange?.(qty - 1)}>-</Button>
      <span className="qty">{qty}</span>
      <Button onClick={() => onChange?.(qty + 1)}>+</Button>
    </div>
  );
};
```

- [ ] Commit

```bash
git add e-commerce/e-com/src/App.js e-commerce/e-com/src/Pages/Cart/index.js e-commerce/e-com/src/components/QuantityDrop/index.js
git commit -m "feat: add cart state management via context, make Cart page functional"
```

---

## Task 6: UI Overhaul — Customer Frontend CSS

**Files:**
- Modify: `e-commerce/e-com/src/App.css`

- [ ] Replace the full App.css with a modernized version that improves:
  - Product cards: hover shadow, smooth transitions, better badge styling
  - Listing page grid: proper responsive grid for one/three/four views
  - Cart page: cleaner table, remove button styling
  - SignIn page: centered card with better padding and shadow
  - Header: tighten spacing, cleaner search box
  - Footer: ensure adequate padding
  - Add utility classes: `.text-red`, `.hd`, `.viewAllBtn`, `.btn-blue`

Full replacement content:

```css
/* Reset and base */
* { margin: 0; padding: 0; box-sizing: border-box; }

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css');

body { font-family: "Lato", sans-serif; font-size: 16px; overflow-x: hidden; background: #f7f8fa; }

@media (min-width: 1300px) {
  .container, .container-lg, .container-md, .container-sm { max-width: 1400px; }
}

/* Utilities */
.text-red { color: #e53935 !important; }
.hd { font-size: 20px; font-weight: 700; color: #111; }
.cursor { cursor: pointer; }
.text-sml { font-size: 13px; color: #888; }

/* Top strip */
.bg-purple { background: #233a95; }
.headerWrapper { border-bottom: 1px solid rgba(0,0,0,0.1); background: #fff; }
.headerWrapper .top-strip { padding: 8px 0; }
.headerWrapper .top-strip p { color: #fff; font-size: 12px; font-weight: 500; }

/* Header */
.headerWrapper .header { width: 100%; padding: 18px 0; background: #fff; }
.logoWrapper img { width: 100%; max-width: 90px; }
.part2 { gap: 12px; flex-wrap: nowrap; display: flex; align-items: center; }

/* Country Dropdown */
.countryDrop { width: 160px; height: 55px; border: 1px solid rgba(0,0,0,0.15); border-radius: 8px; background: #fff; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; color: #000; cursor: pointer; transition: border-color 0.2s; }
.countryDrop:hover { border-color: #233a95; }
.countryDrop .label { font-size: 11px; color: rgba(0,0,0,0.5); }
.countryDrop .name { font-size: 13px; color: #233a95; font-weight: 700; }

/* Search */
.headerWrapper .header .part2 .headerSearch { flex: 1; height: 55px; background: #f3f4f7; padding: 0 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.1); display: flex; align-items: center; transition: border-color 0.2s; }
.headerWrapper .header .part2 .headerSearch:focus-within { border-color: #233a95; background: #fff; }
.headerWrapper .header .part2 .headerSearch input { flex-grow: 1; border: none; background: transparent; outline: none; font-size: 16px; color: rgba(0,0,0,0.8); }
.headerWrapper .header .part2 .headerSearch .searchBtn { min-width: 40px; color: #233a95 !important; }

/* Cart */
.headerWrapper .part3 .cartTab { display: flex; align-items: center; gap: 8px; position: relative; }
.headerWrapper .part3 .cartTab .price { font-size: 14px; font-weight: 700; color: rgba(0,0,0,0.8); margin: 0 8px; }
.headerWrapper .part3 .cartTab .circle { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background-color: #fff1ee; border: 1px solid rgba(0,0,0,0.1); cursor: pointer; transition: background 0.2s; }
.headerWrapper .part3 .cartTab .circle:hover { background: #ffd8d0; }
.headerWrapper .part3 .cartTab .circle svg { font-size: 20px; color: #ea2b0f; }
.headerWrapper .part3 .cartTab .count { position: absolute; top: -5px; right: -5px; width: 18px; height: 18px; background: #ff0000; color: #fff; font-size: 10px; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

/* Navigation */
nav .allCatTab { background: #2bbef9; padding: 8px 18px !important; border-radius: 30px !important; }
nav .allCatTab * { color: #fff; }
nav .allCatTab .text { font-weight: 600; }
nav .allCatTab .icon1 svg { font-size: 20px; }
nav .navLinks a { font-size: 14px; font-weight: 600; color: #333; text-decoration: none; transition: color 0.2s; }
nav .navLinks a:hover { color: #2bbef9; }

/* Product Item */
.productItem { display: block; text-decoration: none; color: inherit; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #eee; transition: box-shadow 0.25s, transform 0.25s; cursor: pointer; }
.productItem:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.12); transform: translateY(-3px); }
.productItem .imgWrapper { position: relative; overflow: hidden; background: #f9f9f9; aspect-ratio: 1; }
.productItem .imgWrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.productItem:hover .imgWrapper img { transform: scale(1.05); }
.productItem .badge-custom { position: absolute; top: 10px; left: 10px; background: #e53935; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.productItem .actions { position: absolute; bottom: -50px; left: 0; right: 0; display: flex; justify-content: center; gap: 8px; padding: 10px; transition: bottom 0.3s; }
.productItem:hover .actions { bottom: 0; }
.productItem .actions button { background: #fff !important; border-radius: 50% !important; min-width: 36px !important; width: 36px; height: 36px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
.productItem .info { padding: 12px 14px 16px; }
.productItem .info h4 { font-size: 14px; font-weight: 600; color: #222; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.productItem .info .oldPrice { font-size: 13px; }
.productItem .info .netPrice { font-size: 15px; }

/* Product grid layouts */
.productListing { display: grid; gap: 16px; }
.productListing.four { grid-template-columns: repeat(4, 1fr); }
.productListing.three { grid-template-columns: repeat(3, 1fr); }
.productListing.one { grid-template-columns: 1fr; }
.productListing.one .productItem { display: flex; flex-direction: row; }
.productListing.one .productItem .imgWrapper { width: 180px; flex-shrink: 0; aspect-ratio: auto; }
.productListing.one .productItem .info { flex: 1; display: flex; flex-direction: column; justify-content: center; }

/* Listing page */
.product_Listing_Page { padding: 30px 0; }
.productListing { display: flex; gap: 20px; }
.content_right { flex: 1; }
.content_right > img { border-radius: 12px; object-fit: cover; max-height: 200px; width: 100%; }
.showBy .btnWrapper button { min-width: 38px; width: 38px; height: 38px; border-radius: 8px !important; color: #555 !important; border: 1px solid #ddd !important; }
.showBy .btnWrapper button.act { background: #233a95 !important; color: #fff !important; border-color: #233a95 !important; }
.showByFilter button { border: 1px solid #ddd !important; border-radius: 8px !important; color: #555 !important; font-size: 13px !important; }

/* Home products section */
.homeProducts { padding: 40px 0; }
.homeProducts .hd { font-size: 22px; }
.viewAllBtn { font-size: 13px !important; color: #2bbef9 !important; font-weight: 600 !important; text-transform: none !important; }
.custom-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 36px; height: 36px; background: #fff; border-radius: 50%; box-shadow: 0 2px 10px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.custom-arrow:hover { background: #2bbef9; color: #fff; }
.custom-arrow.next { right: -18px; }
.custom-arrow.prev { left: -18px; }
.product_row { position: relative; padding: 0 20px; }

/* Newsletter section */
.newsLetterSection { background: linear-gradient(135deg, #233a95 0%, #2bbef9 100%); padding: 50px 0; border-radius: 16px; margin: 40px 0; }
.newsLetterSection h3 { color: #fff; font-size: 28px; font-weight: 700; }
.newsLetterSection p { color: rgba(255,255,255,0.85); font-size: 15px; }
.newsLetterSection .form-control { border-radius: 8px 0 0 8px; height: 50px; border: none; font-size: 15px; }
.newsLetterSection .btn { border-radius: 0 8px 8px 0; height: 50px; background: #ff5722; color: #fff; font-weight: 600; border: none; padding: 0 24px; }
.newsLetterSection .btn:hover { background: #e64a19; }

/* Cart page */
.cartPage { padding: 30px 0; }
.cartPage h2.hd { font-size: 26px; margin-bottom: 4px; }
.cartItemimgWrapper .imgWrapper { width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 1px solid #eee; flex-shrink: 0; }
.cartItemimgWrapper .imgWrapper img { width: 100%; height: 100%; object-fit: cover; }
.cartItemimgWrapper .info h6 { font-size: 14px; font-weight: 600; color: #222; margin-bottom: 4px; }
.remove { cursor: pointer; color: #e53935; font-size: 20px; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #ffeaea; transition: background 0.2s; }
.remove:hover { background: #ffcccc; }
.cartDetails { border-radius: 12px !important; background: #fff; }
.cartDetails h4 { font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #333; }
.quantityDrop { border: 1px solid #eee; border-radius: 8px; overflow: hidden; display: inline-flex; align-items: center; }
.quantityDrop button { min-width: 32px !important; width: 32px; height: 32px; background: #f5f5f5 !important; color: #333 !important; font-size: 16px !important; border-radius: 0 !important; }
.quantityDrop .qty { padding: 0 12px; font-weight: 600; font-size: 14px; }

/* Sign In page */
.signInPage { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #233a95 0%, #2bbef9 100%); padding: 40px 0; position: relative; }
.signInPage .shape-bottom { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; }
.signInPage .shape-bottom svg { width: 100%; }
.signInPage .container { position: relative; z-index: 2; }
.signInPage .box { max-width: 440px; margin: 0 auto; border-radius: 16px !important; padding: 36px !important; }
.auth-logo { width: 80px; height: 80px; object-fit: contain; border-radius: 50%; background: #f5f5f5; padding: 8px; }
.signInPage h2 { font-size: 24px; font-weight: 700; color: #222; }
.signInPage .form-group { margin-bottom: 20px; text-align: left; }
.signInPage .border-effect { color: #233a95; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-block; margin: 12px 0; cursor: pointer; }
.signInPage .border-effect:hover { text-decoration: underline; }
.action-button { width: 100% !important; height: 44px !important; font-weight: 600 !important; border-radius: 8px !important; text-transform: none !important; font-size: 15px !important; }
.button-group { display: flex; gap: 12px; margin: 20px 0 16px; }
.cancel-button { border-color: #ddd !important; color: #555 !important; }
.social-icons { display: flex; justify-content: center; gap: 16px; margin: 12px 0; }
.social-icon { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #fff; transition: opacity 0.2s; }
.social-icon:hover { opacity: 0.85; }
.social-icon.facebook { background: #1877f2; }
.social-icon.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.social-icon.twitter { background: #000; }
.google-auth-button { display: flex; align-items: center; justify-content: center; gap: 10px; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 10px 16px; font-size: 14px; font-weight: 600; color: #333; cursor: pointer; transition: box-shadow 0.2s; }
.google-auth-button:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
.google-icon { width: 20px; height: 20px; }

/* Home Banner */
.homeBannerSection { padding: 20px 0; }

/* Home Categories */
.homeCat { padding: 20px 0 30px; }
.homeCat .item { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: transform 0.2s; }
.homeCat .item:hover { transform: translateY(-4px); }
.homeCat .item .img { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; border: 3px solid #eee; }
.homeCat .item .img img { width: 100%; height: 100%; object-fit: cover; }
.homeCat .item h6 { font-size: 13px; font-weight: 600; color: #333; text-align: center; }

/* Footer */
footer { background: #1a1a2e; color: #ccc; padding: 40px 0 20px; margin-top: 50px; }
footer h5 { color: #fff; font-weight: 700; margin-bottom: 16px; font-size: 15px; }
footer a { color: #aaa; text-decoration: none; font-size: 14px; display: block; margin-bottom: 8px; transition: color 0.2s; }
footer a:hover { color: #2bbef9; }
footer .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 30px; padding-top: 20px; text-align: center; font-size: 13px; color: #777; }

/* Responsive */
@media (max-width: 992px) {
  .productListing.four { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .productListing.four, .productListing.three { grid-template-columns: repeat(2, 1fr); }
  .headerWrapper .header .part2 .headerSearch { width: 100%; }
  .countryDrop { display: none; }
}
@media (max-width: 576px) {
  .productListing.four, .productListing.three, .productListing.one { grid-template-columns: 1fr; }
}
```

- [ ] Commit

```bash
git add e-commerce/e-com/src/App.css
git commit -m "style: modernize customer frontend CSS — cards, grid, signin, cart, nav"
```

---

## Task 7: Fix Admin Dashboard — DashboardBox Labels & Sidebar Logout

**Files:**
- Modify: `Dashboard/admin/src/pages/Dashboard/index.js`
- Modify: `Dashboard/admin/src/components/Sidebar/index.js`

- [ ] Fix the four DashboardBox components to have correct labels (currently all say "Total Users"):

```jsx
<DashboardBox gradientClass="greenGradient" icon="👤" label="Total Users" value="277" />
<DashboardBox gradientClass="pinkGradient" icon="🛒" label="Total Orders" value="134" />
<DashboardBox gradientClass="blueGradient" icon="🎁" label="Total Gifts" value="89" />
<DashboardBox gradientClass="orangeGradient" icon="⭐" label="Avg Rating" value="4.5" />
```

- [ ] Wire the Best Selling Products table to load real products from the API — add useEffect + fetch:

```jsx
import { useEffect, useState } from "react";
import { getProducts } from "../../utils/api";

const [products, setProducts] = useState([]);
useEffect(() => {
  getProducts({ limit: 12 }).then(res => setProducts(res.data?.products || []));
}, []);
```

- [ ] Replace the hardcoded 8-row dummy table body with dynamic product rows:

```jsx
{products.map((p, i) => (
  <tr key={p._id}>
    <td>#{i + 1}</td>
    <td>
      <div className="productInfo d-flex align-items-center gap-2">
        <img src={p.images?.[0]} alt={p.name} width={40} height={40} style={{borderRadius:6, objectFit:'cover'}} />
        <span style={{fontSize:13}}>{p.name}</span>
      </div>
    </td>
    <td>{p.category?.name || '—'}</td>
    <td>{p.brand || '—'}</td>
    <td>₹{p.price}</td>
    <td>{p.countInStock}</td>
    <td>{p.rating}</td>
    <td>—</td>
    <td>—</td>
    <td>
      <div className="d-flex gap-1">
        <Link to={`/product`}><Button size="small" variant="outlined">View</Button></Link>
        <Button size="small" variant="outlined" color="error">Del</Button>
      </div>
    </td>
  </tr>
))}
```

- [ ] Add logout handler in Sidebar (navigate to /login):

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
// In logout button onClick:
onClick={() => navigate('/login')}
```

- [ ] Commit

```bash
git add Dashboard/admin/src/pages/Dashboard/index.js Dashboard/admin/src/components/Sidebar/index.js
git commit -m "fix: correct dashboard box labels, load real products in table, wire sidebar logout"
```

---

## Task 8: UI Overhaul — Admin Dashboard CSS

**Files:**
- Modify: `Dashboard/admin/src/App.css`

- [ ] Improve the admin dashboard CSS:
  - Modernize card/box designs
  - Improve table hover states and row styling
  - Better form styling for upload pages
  - Smoother sidebar transitions
  - Cleaner header

Key additions to append to the existing App.css:

```css
/* Dashboard boxes */
.dashboardBoxWrapper .box { border-radius: 14px !important; padding: 20px !important; transition: transform 0.2s, box-shadow 0.2s; }
.dashboardBoxWrapper .box:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important; }
.dashboardBoxWrapper .box .icon { font-size: 32px; margin-bottom: 8px; }
.dashboardBoxWrapper .box h4 { font-size: 28px; font-weight: 700; color: #fff; }
.dashboardBoxWrapper .box span { font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 500; }

/* Tables */
.bestSellingTable thead th { font-size: 12px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #f0f0f0; padding: 12px 8px; }
.bestSellingTable tbody tr { transition: background 0.15s; }
.bestSellingTable tbody tr:hover { background: #f8f9ff !important; }
.bestSellingTable tbody td { font-size: 13px; color: #333; vertical-align: middle; padding: 10px 8px; border-bottom: 1px solid #f5f5f5; }
.productInfo img { border-radius: 6px; object-fit: cover; }

/* Sidebar improvements */
.sidebar { background: #fff !important; border-right: 1px solid #f0f0f0; }
.menu-item .MuiListItemButton-root.active { background: #e8f4fd !important; border-radius: 8px; }
.menu-item .MuiListItemButton-root:hover { background: #f5f9ff !important; border-radius: 8px; }

/* Form pages */
.uploadSection .card, .categoryAdd .card { border-radius: 14px !important; border: none !important; box-shadow: 0 2px 12px rgba(0,0,0,0.07) !important; }
.uploadSection .form-control, .categoryAdd .form-control, .uploadSection .form-select { border-radius: 8px; border: 1px solid #e0e0e0; font-size: 14px; padding: 10px 14px; transition: border-color 0.2s; }
.uploadSection .form-control:focus, .categoryAdd .form-control:focus { border-color: #2bbef9; box-shadow: 0 0 0 3px rgba(43,190,249,0.15); }

/* Product list page */
.productListPage .card { border-radius: 14px !important; border: none !important; box-shadow: 0 2px 12px rgba(0,0,0,0.07) !important; }
```

- [ ] Commit

```bash
git add Dashboard/admin/src/App.css
git commit -m "style: improve admin dashboard CSS — cards, tables, sidebar, forms"
```

---

## Task 9: Update API Base URLs for Production

**Files:**
- Modify: `e-commerce/e-com/.env` (or create if missing)
- Modify: `Dashboard/admin/.env`

- [ ] Set customer frontend to use the live backend URL:

```
REACT_APP_BASE_URL=https://e-commm-ui4k.onrender.com
```

- [ ] Set admin dashboard to use the live backend URL (check what env var name admin uses):

In `Dashboard/admin/src/utils/api.js`, confirm BASE_URL uses env var. If not, update:

```js
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://e-commm-ui4k.onrender.com";
```

- [ ] Commit

```bash
git add e-commerce/e-com/.env Dashboard/admin/.env Dashboard/admin/src/utils/api.js
git commit -m "config: point both frontends to production backend URL"
```

---

## Task 10: Build Customer Frontend

**Files:** `e-commerce/e-com/`

- [ ] Install dependencies and build:

```bash
cd /Users/kritikasharma/E-mart/e-commerce/e-com
npm install
npm run build
```

Expected: `build/` folder created with no errors. Fix any errors before proceeding.

- [ ] Commit build artifacts if needed (Vercel will build from source so this may not be needed):

```bash
cd /Users/kritikasharma/E-mart
git add e-commerce/e-com/
git commit -m "build: customer frontend production build"
```

---

## Task 11: Build Admin Dashboard

**Files:** `Dashboard/admin/`

- [ ] Install dependencies and build:

```bash
cd /Users/kritikasharma/E-mart/Dashboard/admin
npm install
npm run build
```

Expected: `build/` folder created with no errors. Fix any errors before proceeding.

---

## Task 12: Deploy Customer Frontend to Vercel

- [ ] Install Vercel CLI if not present:

```bash
npm install -g vercel
```

- [ ] Deploy customer frontend:

```bash
cd /Users/kritikasharma/E-mart/e-commerce/e-com
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (new project)
- Project name: `e-mart-store` (or similar)
- Root directory: `.` (current)
- Build command: `npm run build`
- Output directory: `build`

- [ ] Note the deployed URL and share with user

---

## Task 13: Deploy Admin Dashboard to Vercel

- [ ] Deploy admin dashboard:

```bash
cd /Users/kritikasharma/E-mart/Dashboard/admin
vercel --prod
```

When prompted:
- New project name: `e-mart-admin`
- Root directory: `.`
- Build command: `npm run build`
- Output directory: `build`

- [ ] Note the deployed URL and share with user

---

## Task 14: Final Verification

- [ ] Open deployed customer frontend URL — verify home page loads products
- [ ] Open deployed admin dashboard URL — verify dashboard loads, sidebar works
- [ ] Check listing page loads products from API
- [ ] Check cart adds/removes items correctly
- [ ] Check SignIn page renders without errors
- [ ] Report both live URLs to user
