import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { MyContext } from "../../App";
import Navigation from "./Navigation";
import CountryDropdown from "../CountryDropdown";
import Logo from "../../Assets/images/e-com.png";

const Header = () => {
  const { countryList, isLogin, cartItems } = useContext(MyContext);
  const navigate = useNavigate();

  const cartCount = cartItems?.reduce((s, i) => s + i.qty, 0) || 0;
  const cartTotal = cartItems?.reduce((s, i) => s + i.price * i.qty, 0) || 0;

  return (
    <div className="em-header-wrap">
      {/* Announcement */}
      <div className="em-topbar">
        Free delivery on orders over <b>₹999</b> &nbsp;·&nbsp; New arrivals every week!
      </div>

      {/* Main header */}
      <header className="em-header em-container">
        {/* Logo */}
        <Link to="/" className="em-logo" style={{ flexShrink: 0 }}>
          <img src={Logo} alt="E-Mart" />
        </Link>

        {/* Country */}
        {countryList?.length > 0 && (
          <div style={{ flexShrink: 0 }}>
            <CountryDropdown />
          </div>
        )}

        {/* Search */}
        <div className="em-search">
          <input type="text" placeholder="Search products, brands…" />
          <button className="em-search-btn" type="button">
            <FaSearch />
          </button>
        </div>

        {/* Actions */}
        <div className="em-header-actions">
          {isLogin ? (
            <button className="em-icon-btn" title="My Account">
              <FaUser />
            </button>
          ) : (
            <Link to="/signIn" className="em-signin-btn">
              <FaUser /> Sign In
            </Link>
          )}

          <button className="em-cart-btn" onClick={() => navigate("/cart")}>
            <span className="em-cart-icon">
              <FaCartShopping />
              {cartCount > 0 && <span className="em-cart-badge">{cartCount}</span>}
            </span>
            <span className="em-cart-info">
              <span className="em-cart-label">My Cart</span>
              <span className="em-cart-price">₹{cartTotal.toFixed(2)}</span>
            </span>
          </button>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
