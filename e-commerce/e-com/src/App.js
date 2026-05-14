import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Pages/Home";
import Header from "./components/Header";
import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import Listing from "./Pages/Listing";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isHeaderFooterShow, setisHeaderFooterShow] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCountry("https://restcountries.com/v3.1/all");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      setCountryList(res.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

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

  const values = {
    countryList,
    setIsOpenProductModal,
    isOpenProductModal,
    isHeaderFooterShow,
    setisHeaderFooterShow,
    isLogin,
    setIsLogin,
    modalProduct,
    setModalProduct,
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {
          isHeaderFooterShow===true && <Header />
        }
        
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/cat/:id" exact={true} element={<Listing />} />
          <Route path="/product/:id" exact={true} element={<ProductDetails/>} />
          <Route path="/cart" exact={true} element={<Cart/>} />
          <Route path="/signIn" exact={true} element={<SignIn/>} />
          <Route path="/signUp" exact={true} element={<SignUp/>} />
        </Routes>
        {
          isHeaderFooterShow===true && <Footer/>
        }
        {isOpenProductModal===true && <ProductModal />}
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
