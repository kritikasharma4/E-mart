import { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { IoClose } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import QuantityDrop from "../../components/QuantityDrop";
import { MyContext } from "../../App";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(MyContext);
  const subtotal = cartItems?.reduce((s, i) => s + i.price * i.qty, 0) || 0;
  const count = cartItems?.length || 0;

  if (count === 0) {
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
          You have <b>{count}</b> {count === 1 ? "item" : "items"} in your cart
        </p>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Table */}
          <div style={{ flex: 1, minWidth: 0 }}>
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
                              <img src={item.images?.[0] || "https://via.placeholder.com/76"} alt={item.name} />
                            </div>
                          </Link>
                          <div>
                            <div className="em-cart-item-name">{item.name}</div>
                            <div className="em-cart-item-rating">
                              <Rating value={item.rating || 0} precision={0.5} size="small" readOnly />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="em-price-cell">₹{item.price?.toFixed(2)}</td>
                      <td>
                        <QuantityDrop qty={item.qty} onChange={q => updateQty(item._id, q)} />
                      </td>
                      <td className="em-sub-cell">₹{(item.price * item.qty).toFixed(2)}</td>
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
          </div>

          {/* Summary */}
          <div style={{ width: 300, flexShrink: 0 }}>
            <div className="em-order-summary">
              <h3>Order Summary</h3>
              <div className="em-summary-line">
                <span>Subtotal ({count} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="em-summary-line">
                <span>Shipping</span>
                <span style={{ color: "var(--success)", fontWeight: 700 }}>Free</span>
              </div>
              <div className="em-summary-line">
                <span>Discount</span>
                <span>₹0.00</span>
              </div>
              <div className="em-summary-total">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button className="em-checkout-btn">Proceed to Checkout</button>
              <Link to="/" className="em-continue-link">← Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
