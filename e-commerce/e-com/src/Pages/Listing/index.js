import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Sidebar from "../../components/Sidebar";
import ProductItem from "../../components/ProductItem";
import { fetchDataFromApi } from "../../utils/api";

const Listing = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("em-grid-4");
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = id
      ? `/api/products?category=${id}&limit=${perPage}&skip=0`
      : `/api/products?limit=${perPage}&skip=0`;
    fetchDataFromApi(url).then(r => {
      setProducts(r.products || (Array.isArray(r) ? r : []));
      setLoading(false);
    });
  }, [id, perPage]);

  return (
    <div className="em-listing">
      <div className="em-container">
        <div className="em-listing-layout">
          <Sidebar />

          <div className="em-listing-content">
            <img
              src="https://cmsimages.shoppersstop.com/The_Beauty_Spotlight_Hp_web_0448ce73db/The_Beauty_Spotlight_Hp_web_0448ce73db.jpg"
              className="em-listing-banner"
              alt="Category banner"
            />

            <div className="em-toolbar">
              <div className="em-view-btns">
                <button className={`em-view-btn ${view === "em-grid-4" ? "active" : ""}`} onClick={() => setView("em-grid-4")} title="4 columns"><IoGridOutline /></button>
                <button className={`em-view-btn ${view === "em-grid-3" ? "active" : ""}`} onClick={() => setView("em-grid-3")} title="3 columns"><BsGrid3X3Gap /></button>
                <button className={`em-view-btn ${view === "em-grid-list" ? "active" : ""}`} onClick={() => setView("em-grid-list")} title="List"><IoListOutline /></button>
              </div>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {loading ? "Loading…" : `${products.length} products`}
              </span>
              <button className="em-per-page-btn" onClick={e => setAnchorEl(e.currentTarget)}>
                Show {perPage} <FaChevronDown size={10} />
              </button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {[12, 24, 36, 48].map(n => (
                  <MenuItem key={n} onClick={() => { setPerPage(n); setAnchorEl(null); }}>{n} per page</MenuItem>
                ))}
              </Menu>
            </div>

            <div className={`em-grid ${view}`}>
              {loading ? (
                <div className="em-loading">Loading products…</div>
              ) : products.length === 0 ? (
                <div className="em-empty">No products found in this category.</div>
              ) : (
                products.map(p => <ProductItem key={p._id} product={p} />)
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
              <Pagination count={10} color="primary" size="large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
