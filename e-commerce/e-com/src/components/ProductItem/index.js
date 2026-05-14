import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const ProductItem = ({ product }) => {
  const context = useContext(MyContext);

  if (!product) return null;

  const { _id, name, images, countInStock, rating, price, oldPrice } = product;

  const discountPct =
    oldPrice && price < oldPrice
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const handleExpand = (e) => {
    e.preventDefault();
    context.setIsOpenProductModal(true);
    context.setModalProduct?.(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
  };

  return (
    <Link to={`/product/${_id}`} className="productItem">
      <div className="imgWrapper">
        <img
          src={images?.[0] || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={name || "Product"}
        />
        {discountPct !== null && (
          <span className="badge-custom">{discountPct}% OFF</span>
        )}
        <div className="actions">
          <Button onClick={handleExpand} title="Quick view">
            <BsArrowsFullscreen />
          </Button>
          <Button onClick={handleWishlist} title="Wishlist">
            <FaRegHeart style={{ fontSize: "18px" }} />
          </Button>
        </div>
      </div>

      <div className="info">
        <h4>{name || "Unnamed Product"}</h4>
        <span className={`stock-badge ${countInStock > 0 ? "in" : "out"}`}>
          {countInStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <Rating
          name="rating-read"
          value={rating || 0}
          precision={0.5}
          readOnly
          size="small"
          style={{ display: "block", marginBottom: 4 }}
        />
        <div className="prices">
          {oldPrice && price < oldPrice && (
            <span className="oldPrice">₹{oldPrice.toFixed(2)}</span>
          )}
          <span className="netPrice">₹{price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
