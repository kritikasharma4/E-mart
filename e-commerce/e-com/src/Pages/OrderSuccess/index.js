import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuthData } from '../../utils/api';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getAuthData(`/api/orders/${id}`).then(setOrder);
  }, [id]);

  return (
    <div className="em-order-success em-container">
      <div className="em-success-card">
        <FaCheckCircle className="em-success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been received.</p>

        {order && (
          <div className="em-success-details">
            <div className="em-success-row">
              <span>Order ID</span>
              <strong>#{order._id?.slice(-8).toUpperCase()}</strong>
            </div>
            <div className="em-success-row">
              <span>Payment</span>
              <strong>{order.paymentMethod}</strong>
            </div>
            <div className="em-success-row">
              <span>Status</span>
              <strong className="em-status-badge">{order.status}</strong>
            </div>
            <div className="em-success-row">
              <span>Total</span>
              <strong>₹{order.totalPrice?.toLocaleString()}</strong>
            </div>

            <div className="em-success-address">
              <p>Shipping to:</p>
              <address>
                {order.shippingAddress?.fullName}<br />
                {order.shippingAddress?.address}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.pincode}<br />
                📞 {order.shippingAddress?.phone}
              </address>
            </div>

            <div className="em-success-items">
              {order.items?.map((item, i) => (
                <div key={i} className="em-success-item">
                  <img src={item.image} alt={item.name} />
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="em-success-actions">
          <Link to="/orders" className="em-btn-outline">View My Orders</Link>
          <Link to="/" className="em-btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
