import { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MyContext } from "../../App";

const ProductItem = ({ product }) => {
  const context = useContext(MyContext);
  if (!product) return null;

  const { _id, name, images, countInStock, rating, price, oldPrice } = product;
  const discount = oldPrice && price < oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const handleQuickView = (e) => {
    e.preventDefault();
    context.setIsOpenProductModal(true);
    context.setModalProduct?.(product);
  };

  return (
    <Link to={`/product/${_id}`} className="em-product-card">
      <div className="em-card-img">
        <img
          src={images?.[0] || "https://via.placeholder.com/300?text=No+Image"}
          alt={name || "Product"}
        />
        {discount && <span className="em-card-badge">{discount}% OFF</span>}
        {!countInStock && <span className="em-card-badge out">Out of Stock</span>}
        <div className="em-card-actions">
          <button className="em-card-action-btn" onClick={handleQuickView} title="Quick View">
            <BsArrowsFullscreen />
          </button>
          <button className="em-card-action-btn" onClick={e => e.preventDefault()} title="Wishlist">
            <FaRegHeart />
          </button>
        </div>
      </div>
      <div className="em-card-body">
        <div className="em-card-name">{name || "Unnamed Product"}</div>
        <div className="em-card-rating">
          <Rating value={rating || 0} precision={0.5} readOnly size="small" />
        </div>
        <span className={`em-card-stock ${countInStock > 0 ? "in" : "out"}`}>
          {countInStock > 0 ? `In Stock (${countInStock})` : "Out of Stock"}
        </span>
        <div className="em-card-prices">
          {oldPrice && price < oldPrice && (
            <span className="em-card-old">₹{oldPrice.toFixed(2)}</span>
          )}
          <span className="em-card-price">₹{price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
