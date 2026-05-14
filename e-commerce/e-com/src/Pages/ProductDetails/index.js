import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ProductZoom from "../../components/ProductZoom";
import QuantityDrop from "../../components/QuantityDrop";
import { MyContext } from "../../App";
import { IoCart, IoArrowBack } from "react-icons/io5";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";

const Stars = ({ value = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<FaStar key={i} />);
    else if (value >= i - 0.5) stars.push(<FaStarHalf key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return <span className="em-stars">{stars}</span>;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    setQty(1);
    fetchDataFromApi(`/api/products/${id}`).then((data) => {
      setProduct(data);
      setLoading(false);
      if (data?.category?._id) {
        fetchDataFromApi(`/api/products?category=${data.category._id}&limit=6`).then((r) => {
          setRelated((r?.products || []).filter((p) => p._id !== id));
        });
      }
    });
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
              <span className="em-pd-rating-val">{product.rating?.toFixed(1)}</span>
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

            {product.description && (
              <p className="em-pd-desc">{product.description}</p>
            )}

            <div className="em-pd-actions">
              <QuantityDrop
                value={qty}
                onChange={setQty}
                max={product.countInStock}
              />
              <button
                className={`em-pd-cart-btn ${added ? "em-pd-cart-added" : ""}`}
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
              >
                <IoCart />
                {added ? "Added!" : "Add to Cart"}
              </button>
            </div>

            <div className="em-pd-tags">
              {product.category?.name && (
                <span className="em-pd-tag">
                  Category: <Link to={`/cat/${product.category._id}`}>{product.category.name}</Link>
                </span>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="em-pd-related">
            <h3 className="em-section-title">Related Products</h3>
            <div className="em-pd-related-grid">
              {related.slice(0, 4).map((p) => (
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
