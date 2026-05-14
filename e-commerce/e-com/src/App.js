import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useState, useEffect, useCallback } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

import Home from './Pages/Home';
import Listing from './Pages/Listing';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/OrderSuccess';
import Orders from './Pages/Orders';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Search from './Pages/Search';

const MyContext = createContext();

const CART_KEY = 'emartCart';
const USER_KEY = 'emartUser';

function App() {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [modalProduct, setModalProduct] = useState(null);

  // Auth
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
    catch { return null; }
  });

  // Cart — persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const login = useCallback((userData, token) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem('userToken', token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('userToken');
    setUser(null);
    toast.info('Logged out');
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i._id === product._id);
      if (existing) {
        toast.success(`${product.name} quantity updated`, { autoClose: 1500 });
        return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i);
      }
      toast.success(`${product.name} added to cart`, { autoClose: 1500 });
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => {
      const item = prev.find(i => i._id === id);
      if (item) toast.info(`${item.name} removed`, { autoClose: 1200 });
      return prev.filter(i => i._id !== id);
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const values = {
    user,
    isLogin: !!user,
    login,
    logout,
    isOpenProductModal,
    setIsOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    modalProduct,
    setModalProduct,
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHeaderFooterShow && <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:id" element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
        </Routes>

        {isHeaderFooterShow && <Footer />}
        {isOpenProductModal && <ProductModal />}

        <ToastContainer position="bottom-right" newestOnTop closeOnClick pauseOnHover={false} theme="light" />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
