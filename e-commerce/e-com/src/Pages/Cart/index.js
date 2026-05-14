import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import QuantityDrop from "../../components/QuantityDrop";
import { IoClose } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { MyContext } from "../../App";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(MyContext);
  const subtotal = cartItems?.reduce((sum, i) => sum + i.price * i.qty, 0) || 0;
  const itemCount = cartItems?.length || 0;

  return (
    <section className="cartPage">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          You have <b>{itemCount}</b> {itemCount === 1 ? "item" : "items"} in your cart
        </p>

        {itemCount === 0 ? (
          <div className="cart-empty">
            <IoBagOutline />
            <h4>Your cart is empty</h4>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/">
              <Button className="btn-shop">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-9 mb-4">
              <div className="cart-table-wrap">
                <table className="table table-borderless mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/product/${item._id}`} className="cartItemimgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={item.images?.[0] || "https://via.placeholder.com/80"}
                                alt={item.name}
                              />
                            </div>
                            <div className="info">
                              <h6>{item.name}</h6>
                              <Rating
                                name="read-only"
                                value={item.rating || 0}
                                precision={0.5}
                                size="small"
                                readOnly
                              />
                            </div>
                          </Link>
                        </td>
                        <td>₹{item.price?.toFixed(2)}</td>
                        <td>
                          <QuantityDrop
                            qty={item.qty}
                            onChange={(q) => updateQty(item._id, q)}
                          />
                        </td>
                        <td style={{ fontWeight: 700 }}>₹{(item.price * item.qty).toFixed(2)}</td>
                        <td>
                          <span
                            className="remove"
                            onClick={() => removeFromCart(item._id)}
                            title="Remove"
                          >
                            <IoClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="cart-summary">
                <h4>Order Summary</h4>
                <div className="summary-row">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: "var(--success)", fontWeight: 700 }}>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹0.00</span>
                </div>
                <div className="total-row">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <Button className="checkout-btn">Proceed to Checkout</Button>
                <Link to="/" style={{ display: "block", textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--accent2)", textDecoration: "none" }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
