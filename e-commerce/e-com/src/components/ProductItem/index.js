import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const ProductItem = ({ product, itemView }) => {
  const context = useContext(MyContext);

  if (!product) return null;

  const { _id, name, images, countInStock, rating, price, oldPrice } = product;

  const discountPercentage =
    oldPrice && price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const handleExpandClick = (e) => {
    e.preventDefault(); // prevents navigation
    context.setIsOpenProductModal(true);
    context.setModalProduct?.(product); // optional: pass full product to modal
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    // wishlist logic (optional)
  };

  return (
    <Link to={`/product/${_id}`} className={`productItem ${itemView || ""}`}>
      <div className="imgWrapper position-relative">
        <img
          src={
            images?.[0] || "https://via.placeholder.com/300x400?text=No+Image"
          }
          alt={name || "Product"}
        />
        {discountPercentage !== null && (
          <span className="badge-custom">{discountPercentage}%</span>
        )}

        <div className="actions">
          <Button onClick={handleExpandClick}>
            <BsArrowsFullscreen />
          </Button>
          <Button onClick={handleWishlistClick}>
            <FaRegHeart style={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>

      <div className="info">
        <h4>{name || "Unnamed Product"}</h4>
        <span
          className={`d-block ${
            countInStock > 0 ? "text-success" : "text-danger"
          }`}
        >
          {countInStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <Rating
          className="mb-2 mt-2"
          name="rating-read"
          value={rating || 0}
          precision={0.5}
          readOnly
        />
        <div className="d-flex">
          {oldPrice && price < oldPrice ? (
            <>
              <span className="oldPrice me-2 text-muted text-decoration-line-through">
                ₹{oldPrice.toFixed(2)}
              </span>
              <span className="netPrice text-danger fw-bold">
                ₹{price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="netPrice text-dark fw-bold">
              ₹{price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
