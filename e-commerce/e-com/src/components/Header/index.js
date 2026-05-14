import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaCartShopping, FaClipboardList } from 'react-icons/fa6';
import { MyContext } from '../../App';
import Navigation from './Navigation';
import Logo from '../../Assets/images/e-com.png';

const Header = () => {
  const { isLogin, user, logout, cartItems } = useContext(MyContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef();

  const cartCount = cartItems?.reduce((s, i) => s + i.qty, 0) || 0;
  const cartTotal = cartItems?.reduce((s, i) => s + i.price * i.qty, 0) || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="em-header-wrap">
      <div className="em-topbar">
        Free delivery on orders over <b>₹999</b> &nbsp;·&nbsp; New arrivals every week!
      </div>

      <header className="em-header em-container">
        <Link to="/" className="em-logo" style={{ flexShrink: 0 }}>
          <img src={Logo} alt="E-Mart" />
        </Link>

        <form className="em-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products, brands…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="em-search-btn" type="submit">
            <FaSearch />
          </button>
        </form>

        <div className="em-header-actions">
          {isLogin ? (
            <div className="em-user-menu" ref={dropRef}>
              <button className="em-user-btn" onClick={() => setDropOpen(s => !s)}>
                <FaUser />
                <span className="em-user-name">{user?.name?.split(' ')[0]}</span>
              </button>
              {dropOpen && (
                <div className="em-user-drop">
                  <Link to="/orders" className="em-drop-item" onClick={() => setDropOpen(false)}>
                    <FaClipboardList /> My Orders
                  </Link>
                  <button className="em-drop-item em-drop-logout" onClick={() => { logout(); setDropOpen(false); }}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signIn" className="em-signin-btn">
              <FaUser /> Sign In
            </Link>
          )}

          <button className="em-cart-btn" onClick={() => navigate('/cart')}>
            <span className="em-cart-icon">
              <FaCartShopping />
              {cartCount > 0 && <span className="em-cart-badge">{cartCount}</span>}
            </span>
            <span className="em-cart-info">
              <span className="em-cart-label">My Cart</span>
              <span className="em-cart-price">₹{cartTotal.toLocaleString()}</span>
            </span>
          </button>
        </div>
      </header>

      <Navigation />
    </div>
  );
};

export default Header;
