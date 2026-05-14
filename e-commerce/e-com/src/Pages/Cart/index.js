import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { IoBagHandleOutline } from 'react-icons/io5';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import QuantityDrop from '../../components/QuantityDrop';
import { MyContext } from '../../App';

const Stars = ({ value = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<FaStar key={i} />);
    else if (value >= i - 0.5) stars.push(<FaStarHalf key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return <span className="em-stars" style={{ fontSize: 12 }}>{stars}</span>;
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(MyContext);
  const navigate = useNavigate();
  const itemsTotal = cartItems?.reduce((s, i) => s + i.price * i.qty, 0) || 0;
  const shippingPrice = itemsTotal >= 999 ? 0 : 49;
  const totalPrice = itemsTotal + shippingPrice;
  const count = cartItems?.reduce((s, i) => s + i.qty, 0) || 0;

  if (!cartItems?.length) {
    return (
      <div className="em-cart">
        <div className="em-container">
          <div className="em-cart-empty">
            <IoBagHandleOutline />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="em-shop-btn">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="em-cart">
      <div className="em-container">
        <h1 className="em-cart-title">Shopping Cart</h1>
        <p className="em-cart-subtitle">
          You have <b>{count}</b> {count === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="em-cart-layout">
          <div className="em-cart-table-wrap">
            <table className="em-cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="em-cart-item-info">
                        <Link to={`/product/${item._id}`}>
                          <div className="em-cart-thumb">
                            <img src={item.images?.[0]} alt={item.name} />
                          </div>
                        </Link>
                        <div>
                          <Link to={`/product/${item._id}`} className="em-cart-item-name">{item.name}</Link>
                          <div><Stars value={item.rating || 0} /></div>
                          {item.brand && <div className="em-cart-item-brand">{item.brand}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="em-price-cell">₹{item.price?.toLocaleString()}</td>
                    <td>
                      <QuantityDrop
                        value={item.qty}
                        onChange={q => updateQty(item._id, q)}
                        max={item.countInStock || 99}
                      />
                    </td>
                    <td className="em-sub-cell">₹{(item.price * item.qty).toLocaleString()}</td>
                    <td>
                      <button className="em-remove-btn" onClick={() => removeFromCart(item._id)} title="Remove">
                        <IoClose />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="em-order-summary">
            <h3>Order Summary</h3>
            <div className="em-summary-line">
              <span>Items ({count})</span>
              <span>₹{itemsTotal.toLocaleString()}</span>
            </div>
            <div className="em-summary-line">
              <span>Shipping</span>
              <span style={{ color: shippingPrice === 0 ? 'var(--success)' : 'inherit', fontWeight: 700 }}>
                {shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}
              </span>
            </div>
            <div className="em-summary-total">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            {itemsTotal < 999 && (
              <p className="em-free-ship-hint">Add ₹{(999 - itemsTotal).toLocaleString()} more for free shipping</p>
            )}
            <button className="em-checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <Link to="/" className="em-continue-link">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
