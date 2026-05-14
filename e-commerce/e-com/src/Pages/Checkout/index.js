import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { postAuthData } from '../../utils/api';
import { toast } from 'react-toastify';

const STATES = ['Andhra Pradesh','Assam','Bihar','Delhi','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

const Checkout = () => {
  const { cartItems, clearCart, isLogin, user } = useContext(MyContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const itemsTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingPrice = itemsTotal >= 999 ? 0 : 49;
  const totalPrice = itemsTotal + shippingPrice;

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) return toast.error('Please sign in to place an order');
    if (!cartItems.length) return toast.error('Your cart is empty');
    const { fullName, phone, address, city, pincode, state } = form;
    if (!fullName || !phone || !address || !city || !pincode || !state)
      return toast.error('Please fill all shipping fields');

    setLoading(true);
    const res = await postAuthData('/api/orders', {
      items: cartItems.map(i => ({
        product: i._id,
        name: i.name,
        image: i.images?.[0],
        price: i.price,
        qty: i.qty,
      })),
      shippingAddress: form,
      paymentMethod,
    });
    setLoading(false);

    if (res?._id) {
      clearCart();
      navigate(`/order-success/${res._id}`);
    } else {
      toast.error(res?.message || 'Failed to place order. Please try again.');
    }
  };

  if (!cartItems.length) {
    return (
      <div className="em-checkout-empty">
        <p>Your cart is empty.</p>
        <Link to="/" className="em-btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="em-checkout em-container">
      <h1 className="em-checkout-title">Checkout</h1>
      <div className="em-checkout-layout">
        {/* Left: Shipping form */}
        <div className="em-checkout-left">
          {!isLogin && (
            <div className="em-checkout-notice">
              <Link to="/signIn">Sign in</Link> to save your order history.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="em-checkout-section">
              <h3>Shipping Address</h3>
              <div className="em-field-row">
                <div className="em-field">
                  <label>Full name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="em-field">
                  <label>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" required />
                </div>
              </div>

              <div className="em-field">
                <label>Street address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="House no., street, area" required />
              </div>

              <div className="em-field-row">
                <div className="em-field">
                  <label>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" required />
                </div>
                <div className="em-field">
                  <label>Pincode</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" required maxLength={6} />
                </div>
              </div>

              <div className="em-field">
                <label>State</label>
                <select name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="em-checkout-section">
              <h3>Payment Method</h3>
              <div className="em-payment-options">
                <label className={`em-pay-option ${paymentMethod === 'COD' ? 'active' : ''}`}>
                  <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                  <span>Cash on Delivery</span>
                </label>
                <label className={`em-pay-option ${paymentMethod === 'UPI' ? 'active' : ''}`}>
                  <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                  <span>UPI / Net Banking</span>
                  <small>(Pay on delivery simulation)</small>
                </label>
              </div>
            </div>

            <button type="submit" className="em-checkout-submit" disabled={loading}>
              {loading ? 'Placing order…' : `Place Order — ₹${totalPrice.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Right: Order summary */}
        <div className="em-checkout-right">
          <h3 className="em-summary-title">Order Summary</h3>
          <div className="em-summary-items">
            {cartItems.map(item => (
              <div key={item._id} className="em-summary-item">
                <img src={item.images?.[0]} alt={item.name} />
                <div className="em-summary-item-info">
                  <p>{item.name}</p>
                  <span>Qty: {item.qty}</span>
                </div>
                <span className="em-summary-item-price">₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="em-summary-row">
            <span>Items ({cartItems.reduce((s,i) => s + i.qty, 0)})</span>
            <span>₹{itemsTotal.toLocaleString()}</span>
          </div>
          <div className="em-summary-row">
            <span>Shipping</span>
            <span>{shippingPrice === 0 ? <em className="em-free">Free</em> : `₹${shippingPrice}`}</span>
          </div>
          <div className="em-summary-total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          {itemsTotal < 999 && (
            <p className="em-free-ship-hint">Add ₹{(999 - itemsTotal).toLocaleString()} more for free shipping</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
