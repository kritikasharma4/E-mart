import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IoGridOutline, IoListOutline } from 'react-icons/io5';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import ProductItem from '../../components/ProductItem';
import { fetchDataFromApi } from '../../utils/api';

const PER_PAGE_OPTIONS = [12, 24, 36, 48];

const Listing = () => {
  const { id } = useParams();
  const [view, setView] = useState('em-grid-4');
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 100000, brand: '', inStock: false });
  const [showPerPage, setShowPerPage] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (id) params.set('category', id);
    params.set('limit', perPage);
    params.set('skip', (page - 1) * perPage);
    if (filters.brand) params.set('brand', filters.brand);
    fetchDataFromApi(`/api/products?${params}`).then(r => {
      let prods = r?.products || (Array.isArray(r) ? r : []);
      // Apply client-side price + stock filters (API doesn't support them yet)
      prods = prods.filter(p => {
        if (filters.inStock && p.countInStock === 0) return false;
        if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
        return true;
      });
      setProducts(prods);
      setTotal(r?.total || prods.length);
      setLoading(false);
    });
  }, [id, perPage, page, filters]);

  useEffect(() => {
    setPage(1);
  }, [id, filters, perPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(f => ({ ...f, ...newFilters }));
  };

  return (
    <div className="em-listing">
      <div className="em-container">
        <div className="em-listing-layout">
          <Sidebar filters={filters} onChange={handleFilterChange} categoryId={id} />

          <div className="em-listing-content">
            <div className="em-toolbar">
              <div className="em-view-btns">
                <button className={`em-view-btn ${view === 'em-grid-4' ? 'active' : ''}`} onClick={() => setView('em-grid-4')} title="4 columns"><IoGridOutline /></button>
                <button className={`em-view-btn ${view === 'em-grid-3' ? 'active' : ''}`} onClick={() => setView('em-grid-3')} title="3 columns"><BsGrid3X3Gap /></button>
                <button className={`em-view-btn ${view === 'em-grid-list' ? 'active' : ''}`} onClick={() => setView('em-grid-list')} title="List"><IoListOutline /></button>
              </div>
              <span className="em-toolbar-count">
                {loading ? 'Loading…' : `${total} products`}
              </span>
              <div className="em-per-page-wrap">
                <button className="em-per-page-btn" onClick={() => setShowPerPage(s => !s)}>
                  Show {perPage} <FaChevronDown size={10} />
                </button>
                {showPerPage && (
                  <div className="em-per-page-menu">
                    {PER_PAGE_OPTIONS.map(n => (
                      <button key={n} className={n === perPage ? 'active' : ''} onClick={() => { setPerPage(n); setShowPerPage(false); }}>
                        {n} per page
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={`em-grid ${view}`}>
              {loading ? (
                Array(perPage > 12 ? 12 : perPage).fill(0).map((_, i) => <div key={i} className="em-product-skeleton" />)
              ) : products.length === 0 ? (
                <div className="em-listing-empty">No products found. Try adjusting your filters.</div>
              ) : (
                products.map(p => <ProductItem key={p._id} item={p} />)
              )}
            </div>

            {totalPages > 1 && (
              <div className="em-pagination">
                <button className="em-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((n, i) =>
                    n === '…' ? (
                      <span key={`ellipsis-${i}`} className="em-page-ellipsis">…</span>
                    ) : (
                      <button key={n} className={`em-page-btn ${n === page ? 'active' : ''}`} onClick={() => setPage(n)}>
                        {n}
                      </button>
                    )
                  )}
                <button className="em-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
