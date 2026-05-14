import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import QuantityDrop from "../../components/QuantityDrop";
import { IoClose } from "react-icons/io5";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { MyContext } from "../../App";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(MyContext);
  const subtotal = cartItems?.reduce((sum, i) => sum + i.price * i.qty, 0) || 0;

  return (
    <section className="section cartPage">
      <div className="container">
        <h2 className="hd mb-0">Your Cart</h2>
        <p>
          There are <b>{cartItems?.length || 0}</b> products in your cart
        </p>
        <div className="row">
          <div className="col-md-9 pr-5">
            {!cartItems || cartItems.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Your cart is empty.</p>
                <Link to="/">
                  <Button
                    variant="contained"
                    style={{ background: "#2bbef9", color: "#fff", marginTop: 16 }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/product/${item._id}`}>
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img
                                  src={
                                    item.images?.[0] ||
                                    "https://via.placeholder.com/80"
                                  }
                                  className="w-100"
                                  alt={item.name}
                                />
                              </div>
                              <div className="info px-3">
                                <h6>{item.name}</h6>
                                <Rating
                                  name="read-only"
                                  value={item.rating || 0}
                                  precision={0.5}
                                  size="small"
                                  readOnly
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>₹{item.price?.toFixed(2)}</td>
                        <td className="quantity-col">
                          <QuantityDrop
                            qty={item.qty}
                            onChange={(q) => updateQty(item._id, q)}
                          />
                        </td>
                        <td>₹{(item.price * item.qty).toFixed(2)}</td>
                        <td>
                          <span
                            className="remove"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <IoClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="col-md-3">
            <div className="card border p-3 cartDetails">
              <h4>CART TOTALS</h4>

              <div className="d-flex align-items-center mb-3">
                <span>Subtotal</span>
                <span
                  className="ml-auto text-red"
                  style={{ fontWeight: "bold" }}
                >
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Shipping</span>
                <span className="ml-auto">
                  <b>Free</b>
                </span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <span>Total</span>
                <span
                  className="ml-auto text-red"
                  style={{ fontWeight: "bold" }}
                >
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <Button
                className="btn-lg btn-big"
                style={{ background: "#2bbef9", color: "#fff" }}
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
