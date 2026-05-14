import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import ProductItem from "../../components/ProductItem";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchDataFromApi(`/api/products?search=${encodeURIComponent(query)}&limit=24`).then((r) => {
      setProducts(r?.products || []);
      setTotal(r?.total || 0);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="em-search-page em-container">
      <div className="em-search-header">
        <FaSearch className="em-search-page-icon" />
        {query ? (
          <>
            <h2>Search results for <em>"{query}"</em></h2>
            {!loading && <p>{total} product{total !== 1 ? "s" : ""} found</p>}
          </>
        ) : (
          <h2>Enter a search term above</h2>
        )}
      </div>

      {loading ? (
        <div className="em-pd-loading">
          <div className="em-spinner" />
          <p>Searching…</p>
        </div>
      ) : products.length === 0 && query ? (
        <div className="em-search-empty">
          <p>No products found for "{query}".</p>
          <Link to="/" className="em-btn-primary">Back to Home</Link>
        </div>
      ) : (
        <div className="em-grid em-grid-4">
          {products.map((p) => (
            <ProductItem key={p._id} item={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
