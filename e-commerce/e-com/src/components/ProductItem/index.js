import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { MyContext } from '../../App';

const ProductItem = ({ item, product }) => {
  const context = useContext(MyContext);
  const p = item || product;
  if (!p) return null;

  const { _id, name, images, countInStock, rating, price, oldPrice } = p;
  const discount = oldPrice && price < oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  const handleQuickView = (e) => {
    e.preventDefault();
    context.setIsOpenProductModal(true);
    context.setModalProduct?.(p);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    context.addToCart(p);
  };

  return (
    <Link to={`/product/${_id}`} className="em-product-card">
      <div className="em-card-img">
        <img src={images?.[0] || 'https://via.placeholder.com/300?text=No+Image'} alt={name || 'Product'} />
        {discount && <span className="em-card-badge">{discount}% OFF</span>}
        {!countInStock && <span className="em-card-badge out">Out of Stock</span>}
        <div className="em-card-actions">
          <button className="em-card-action-btn" onClick={handleQuickView} title="Quick View">
            <BsArrowsFullscreen />
          </button>
          <button className="em-card-action-btn" onClick={handleAddToCart} title="Add to Cart" disabled={!countInStock}>
            <FaRegHeart />
          </button>
        </div>
      </div>
      <div className="em-card-body">
        <div className="em-card-name">{name || 'Unnamed Product'}</div>
        <div className="em-card-rating">
          {[1, 2, 3, 4, 5].map(i => (
            <FaStar key={i} style={{ color: i <= Math.round(rating || 0) ? '#f59e0b' : '#e2e8f0', fontSize: 11 }} />
          ))}
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 4 }}>{(rating || 0).toFixed(1)}</span>
        </div>
        <span className={`em-card-stock ${countInStock > 0 ? 'in' : 'out'}`}>
          {countInStock > 0 ? `In Stock` : 'Out of Stock'}
        </span>
        <div className="em-card-prices">
          {oldPrice && price < oldPrice && <span className="em-card-old">₹{oldPrice.toLocaleString()}</span>}
          <span className="em-card-price">₹{price.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
