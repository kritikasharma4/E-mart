import { Link } from "react-router-dom";
import Logo from "../../Assets/images/e-com.png";
import CountryDropdown from "../CountryDropdown";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { countryList, isLogin, cartItems } = useContext(MyContext);
  const navigate = useNavigate();

  const cartCount = cartItems?.reduce((sum, i) => sum + i.qty, 0) || 0;
  const cartTotal = cartItems?.reduce((sum, i) => sum + i.price * i.qty, 0) || 0;

  return (
    <div className="headerWrapper">
      {/* Announcement bar */}
      <div className="top-strip">
        <div className="container">
          <p className="mb-0 text-center">
            Free shipping on orders over <b>₹999</b> — Shop now!
          </p>
        </div>
      </div>

      {/* Main header row */}
      <header className="header">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

            {/* Logo */}
            <Link to="/" style={{ flexShrink: 0 }}>
              <img src={Logo} alt="E-Mart" className="logoImg" />
            </Link>

            {/* Country dropdown (hidden on mobile) */}
            {countryList?.length > 0 && (
              <div className="countryDropWrap">
                <CountryDropdown />
              </div>
            )}

            {/* Search box */}
            <div className="headerSearch" style={{ flex: 1 }}>
              <input type="text" placeholder="Search for products, brands and more..." />
              <button className="searchIconBtn" type="button">
                <FaSearch />
              </button>
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              {isLogin ? (
                <button className="headerIconBtn" title="Account">
                  <FaUser />
                </button>
              ) : (
                <Link to="/signIn" className="signInBtn">Sign In</Link>
              )}

              <button className="cartBtn" onClick={() => navigate("/cart")}>
                <span className="cartIcon">
                  <FaCartShopping />
                  {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
                </span>
                <span className="cartPrice">₹{cartTotal.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
