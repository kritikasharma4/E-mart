import React, { useState } from "react";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ProductDetails = () => {
  const [reply, setReply] = useState("");
  // replies are now objects with full info to render like reviews
  const [replies, setReplies] = useState([]);

  const handleReplyChange = (e) => setReply(e.target.value);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const trimmedReply = reply.trim();
    if (!trimmedReply) return;

    // Create reply object similar to existing reviews
    const newReply = {
      id: Date.now(), // unique id
      user: {
        name: "You",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg", // example user avatar
      },
      time: "Just now",
      stars: 5,
      text: trimmedReply,
    };

    setReplies((prev) => [...prev, newReply]);
    setReply("");
  };

  const handleDeleteReply = (id) => {
    setReplies((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="content w-100 p-4">
      {/* Header */}
      <div className="mb-4 d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-2">
          <InfoOutlinedIcon fontSize="large" className="text-primary" />
          <h4 className="mb-0 text-uppercase fw-bold text-dark">Product View</h4>
        </div>
        <div className="breadcrumb-links">
          <a href="#" className="breadcrumb-item">Dashboard</a> /{" "}
          <a href="#" className="breadcrumb-item">Products</a> /{" "}
          <span className="breadcrumb-current">Product View</span>
        </div>
      </div>

      {/* Product Top Section */}
      <div className="row g-4 product-top-section">
        {/* Left: Image Gallery */}
        <div className="col-md-6 product-image-box">
          <div className="card product-card">
            <img
              src="https://www.showstopperbd.com/cdn/shop/files/Artboard_1_copy.webp?v=1746351650&width=533"
              className="product-main-img"
              alt="Main Product"
            />
            <div className="product-thumbnails">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={`https://www.showstopperbd.com/cdn/shop/files/Artboard_1_copy.webp?v=1746351650&width=533${i + 1}`}
                  alt={`Thumbnail ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-md-6 product-detail-box">
          <div className="card product-card">
            <h5 className="fw-bold">
              Formal suits for men wedding slim fit 3 piece dress business party jacket
            </h5>
            <div className="row mt-3">
              <Detail label="Brand" value="Ecstasy" />
              <Detail label="Category" value="Men's" />
              <Detail label="Tags" value="RED, BLUE, WHITE" />
              <Detail label="Color" value="Black" />
              <Detail label="Size" value="L, XL, XXL" />
              <Detail label="Price" value="$129.99" />
              <Detail label="Stock" value="34 pcs" />
              <Detail label="Review" value="4.5 (23 reviews)" />
              <Detail label="Published" value="Yes" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="card shadow border-0 p-3 mt-4 product-description">
        <h5 className="fw-bold mb-3">Product Description</h5>
        <p className="text-muted">
          This is a premium formal suit for men, crafted with high-quality fabric
          for a sleek and modern fit. Ideal for weddings, business meetings, and
          high-end parties.
        </p>
      </div>

      {/* Rating Analytics */}
      <div className="card shadow border-0 p-3 mt-4 rating-analytics">
        <h5 className="fw-bold mb-3">Rating Analytics</h5>
        {[5, 4, 3, 2].map((star) => (
          <div key={star} className="d-flex align-items-center mb-2">
            <div className="me-2" style={{ width: 60 }}>
              {star} Stars
            </div>
            <div className="progress flex-grow-1" style={{ height: 8 }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${star * 15}%` }}
              ></div>
            </div>
            <div className="ms-2 text-muted">(12)</div>
          </div>
        ))}
      </div>

      {/* Customer Reviews */}
      <div className="card shadow border-0 p-3 mt-4 product-reviews">
        <h5 className="fw-bold mb-4">Customer Reviews</h5>

        {/* Existing hardcoded reviews */}
        {[1, 2].map((_, i) => (
          <div key={i} className="review-box mb-4">
            <div className="d-flex align-items-center mb-2">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="rounded-circle me-3"
                alt="User"
              />
              <div>
                <div className="fw-bold text-dark">Aurora</div>
                <div className="text-muted small">25 minutes ago</div>
              </div>
            </div>
            <div className="d-flex align-items-center mb-1 review-stars">
              {[...Array(4)].map((_, i) => (
                <StarIcon key={i} fontSize="small" className="text-warning" />
              ))}
              <StarIcon fontSize="small" className="text-muted" />
            </div>
            <div className="review-bubble p-3 mt-2">
              <p className="mb-2">
                Very stylish and fits perfectly. Great quality for the price.
                Would highly recommend!
              </p>
              <Button size="small" variant="outlined" color="primary">
                Reply
              </Button>
            </div>
          </div>
        ))}

        {/* Your Replies rendered like reviews */}
        {replies.map(({ id, user, time, stars, text }) => (
          <div key={id} className="review-box mb-4">
            <div className="d-flex align-items-center mb-2">
              <img
                src={user.avatar}
                className="rounded-circle me-3"
                alt={user.name}
              />
              <div>
                <div className="fw-bold text-dark">{user.name}</div>
                <div className="text-muted small">{time}</div>
              </div>
              <Button
                size="small"
                variant="outlined"
                color="error"
                style={{ marginLeft: "auto", height: "fit-content" }}
                onClick={() => handleDeleteReply(id)}
              >
                Delete
              </Button>
            </div>
            <div className="d-flex align-items-center mb-1 review-stars">
              {[...Array(stars)].map((_, i) => (
                <StarIcon key={i} fontSize="small" className="text-warning" />
              ))}
              {[...Array(5 - stars)].map((_, i) => (
                <StarIcon key={i + stars} fontSize="small" className="text-muted" />
              ))}
            </div>
            <div className="review-bubble p-3 mt-2">
              <p className="mb-2">{text}</p>
            </div>
          </div>
        ))}

        {/* Drop Your Replies Section */}
        <div className="drop-replies-section mt-4">
          <h6 className="fw-bold mb-3">Drop Your Replies</h6>
          <form onSubmit={handleReplySubmit}>
            <textarea
              className="reply-textarea"
              placeholder="Write your reply here..."
              value={reply}
              onChange={handleReplyChange}
              rows={3}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-reply-btn mt-2"
            >
              Submit Reply
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="col-md-6 mb-2">
    <strong>{label}:</strong> <span className="text-muted">{value}</span>
  </div>
);

export default ProductDetails;
