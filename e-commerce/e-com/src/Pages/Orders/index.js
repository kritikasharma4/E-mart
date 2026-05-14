import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { getAuthData } from '../../utils/api';

const STATUS_COLOR = {
  Pending: '#d97706',
  Confirmed: '#2563eb',
  Shipped: '#7c3aed',
  Delivered: '#16a34a',
  Cancelled: '#dc2626',
};

const Orders = () => {
  const { isLogin } = useContext(MyContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLogin) { navigate('/signIn'); return; }
    getAuthData('/api/users/my-orders').then(data => {
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, [isLogin, navigate]);

  if (loading) return <div className="em-pd-loading"><div className="em-spinner" /><p>Loading orders…</p></div>;

  return (
    <div className="em-orders em-container">
      <h2 className="em-orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="em-orders-empty">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="em-btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="em-orders-list">
          {orders.map(order => (
            <div key={order._id} className="em-order-card">
              <div className="em-order-head">
                <div>
                  <span className="em-order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="em-order-date">{new Date(order.dateCreated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <span className="em-order-status" style={{ color: STATUS_COLOR[order.status] || '#64748b' }}>
                  {order.status}
                </span>
              </div>

              <div className="em-order-items">
                {order.items?.map((item, i) => (
                  <div key={i} className="em-order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <span>Qty: {item.qty} · ₹{item.price?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="em-order-foot">
                <span>Payment: <b>{order.paymentMethod}</b></span>
                <span>Total: <b>₹{order.totalPrice?.toLocaleString()}</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
