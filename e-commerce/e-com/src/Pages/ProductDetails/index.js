import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDataFromApi, postAuthData } from '../../utils/api';
import ProductZoom from '../../components/ProductZoom';
import QuantityDrop from '../../components/QuantityDrop';
import { MyContext } from '../../App';
import { IoCart, IoArrowBack } from 'react-icons/io5';
import { FaStar, FaStarHalf, FaRegStar, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Stars = ({ value = 0, size = 14, interactive = false, onSelect }) => {
  const [hover, setHover] = useState(0);
  return (
    <span className="em-stars" style={{ fontSize: size, cursor: interactive ? 'pointer' : 'default' }}>
      {[1, 2, 3, 4, 5].map(i => {
        const filled = interactive ? (hover || value) >= i : value >= i;
        const half = !interactive && value >= i - 0.5 && value < i;
        return (
          <span
            key={i}
            style={{ color: filled || half ? '#f59e0b' : '#d1d5db' }}
            onMouseEnter={() => interactive && setHover(i)}
            onMouseLeave={() => interactive && setHover(0)}
            onClick={() => interactive && onSelect?.(i)}
          >
            {filled ? <FaStar /> : half ? <FaStarHalf /> : <FaRegStar />}
          </span>
        );
      })}
    </span>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, isLogin } = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    setQty(1);
    Promise.all([
      fetchDataFromApi(`/api/products/${id}`),
      fetchDataFromApi(`/api/reviews/${id}`),
    ]).then(([prod, revs]) => {
      setProduct(prod);
      setReviews(Array.isArray(revs) ? revs : []);
      setLoading(false);
      if (prod?.category?._id) {
        fetchDataFromApi(`/api/products?category=${prod.category._id}&limit=6`).then(r => {
          setRelated((r?.products || []).filter(p => p._id !== id));
        });
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) return toast.error('Please sign in to submit a review');
    if (!reviewForm.rating) return toast.error('Please select a rating');
    if (!reviewForm.comment.trim()) return toast.error('Please write a review');
    setSubmitting(true);
    const res = await postAuthData(`/api/reviews/${id}`, reviewForm);
    setSubmitting(false);
    if (res?._id) {
      setReviews(prev => [res, ...prev]);
      setReviewForm({ rating: 0, comment: '' });
      toast.success('Review submitted!');
      // Update displayed rating
      setProduct(p => ({ ...p, rating: Math.round((reviews.reduce((s, r) => s + r.rating, 0) + res.rating) / (reviews.length + 1) * 10) / 10 }));
    } else {
      toast.error(res?.message || 'Failed to submit review');
    }
  };

  const discount = product?.oldPrice > product?.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  if (loading) {
    return (
      <div className="em-pd-loading">
        <div className="em-spinner" />
        <p>Loading product…</p>
      </div>
    );
  }

  if (!product || product.success === false) {
    return (
      <div className="em-pd-error">
        <p>Product not found.</p>
        <Link to="/" className="em-back-link"><IoArrowBack /> Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="em-pd">
      <div className="em-container">
        <nav className="em-pd-breadcrumb">
          <Link to="/">Home</Link>
          {product.category?.name && (
            <><span>/</span><Link to={`/cat/${product.category._id}`}>{product.category.name}</Link></>
          )}
          <span>/</span><span>{product.name}</span>
        </nav>

        <div className="em-pd-layout">
          <div className="em-pd-gallery">
            <ProductZoom images={product.images} discount={discount} />
          </div>

          <div className="em-pd-info">
            {product.brand && <span className="em-pd-brand">{product.brand}</span>}
            <h1 className="em-pd-title">{product.name}</h1>

            <div className="em-pd-meta">
              <Stars value={product.rating} />
              <span className="em-pd-rating-val">{product.rating?.toFixed(1)} ({reviews.length} reviews)</span>
              <span className="em-pd-stock">
                {product.countInStock > 0 ? (
                  <span className="em-in-stock">In Stock ({product.countInStock})</span>
                ) : (
                  <span className="em-out-stock">Out of Stock</span>
                )}
              </span>
            </div>

            <div className="em-pd-prices">
              <span className="em-pd-price">₹{product.price?.toLocaleString()}</span>
              {product.oldPrice > product.price && (
                <>
                  <span className="em-pd-old">₹{product.oldPrice?.toLocaleString()}</span>
                  <span className="em-pd-discount">{discount}% off</span>
                </>
              )}
            </div>

            {product.description && <p className="em-pd-desc">{product.description}</p>}

            <div className="em-pd-actions">
              <QuantityDrop value={qty} onChange={setQty} max={product.countInStock} />
              <button
                className={`em-pd-cart-btn ${added ? 'em-pd-cart-added' : ''}`}
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                <IoCart />
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>

            {product.category?.name && (
              <div className="em-pd-tags">
                <span className="em-pd-tag">
                  Category: <Link to={`/cat/${product.category._id}`}>{product.category.name}</Link>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Reviews section */}
        <div className="em-reviews">
          <h3 className="em-reviews-title">Customer Reviews ({reviews.length})</h3>
          <div className="em-reviews-layout">
            <div className="em-reviews-list">
              {reviews.length === 0 ? (
                <p className="em-reviews-empty">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map(r => (
                  <div key={r._id} className="em-review-card">
                    <div className="em-review-head">
                      <span className="em-review-avatar"><FaUser /></span>
                      <div>
                        <strong>{r.name}</strong>
                        <div><Stars value={r.rating} size={12} /></div>
                      </div>
                      <span className="em-review-date">
                        {new Date(r.dateCreated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="em-review-comment">{r.comment}</p>
                  </div>
                ))
              )}
            </div>

            <div className="em-review-form-wrap">
              <h4>Write a Review</h4>
              {isLogin ? (
                <form className="em-review-form" onSubmit={handleReviewSubmit}>
                  <div className="em-field">
                    <label>Your Rating</label>
                    <Stars value={reviewForm.rating} size={28} interactive onSelect={r => setReviewForm(f => ({ ...f, rating: r }))} />
                  </div>
                  <div className="em-field">
                    <label>Your Review</label>
                    <textarea
                      rows={4}
                      placeholder="Share your experience with this product…"
                      value={reviewForm.comment}
                      onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="em-review-submit" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Review'}
                  </button>
                </form>
              ) : (
                <div className="em-review-login-prompt">
                  <p><Link to="/signIn">Sign in</Link> to write a review.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="em-pd-related">
            <h3 className="em-section-title">Related Products</h3>
            <div className="em-pd-related-grid">
              {related.slice(0, 4).map(p => (
                <Link key={p._id} to={`/product/${p._id}`} className="em-pd-rel-card">
                  <img src={p.images?.[0]} alt={p.name} />
                  <div className="em-pd-rel-info">
                    <p>{p.name}</p>
                    <span>₹{p.price?.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
