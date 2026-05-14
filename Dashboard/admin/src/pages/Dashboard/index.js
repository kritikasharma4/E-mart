import { useEffect, useState } from "react";
import DashboardBox from "./components/dashboardBox";
import SalesBox from "./components/SalesBox";
import { Link } from "react-router-dom";
import { fetchAuthData, fetchDataFromApi } from "../../utils/api";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, pendingOrders: 0, deliveredOrders: 0 });
  const [productTotal, setProductTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/api/products?limit=12"),
      fetchAuthData("/api/orders/stats"),
      fetchDataFromApi("/api/products?limit=1"),
    ]).then(([prods, orderStats, allProds]) => {
      setProducts(prods?.products || []);
      setProductTotal(allProds?.total || 0);
      if (orderStats && !orderStats.error) setStats(orderStats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="content w-100 p-4">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex flex-wrap justify-content-between">
            <DashboardBox gradientClass="greenGradient" icon="📦" label="Total Products" value={productTotal} />
            <DashboardBox gradientClass="pinkGradient" icon="🛒" label="Total Orders" value={stats.totalOrders} />
            <DashboardBox gradientClass="blueGradient" icon="💰" label="Revenue" value={`₹${Math.round(stats.revenue).toLocaleString()}`} />
            <DashboardBox gradientClass="orangeGradient" icon="⏳" label="Pending Orders" value={stats.pendingOrders} />
          </div>
        </div>
        <div className="col-md-4">
          <SalesBox />
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="hd mb-0">Recent Products</h3>
          <div className="d-flex gap-2">
            <Link to="/product-list"><Button variant="outlined" size="small">View All</Button></Link>
            <Link to="/upload"><Button variant="contained" size="small">+ Add Product</Button></Link>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table bestSellingTable">
            <thead>
              <tr>
                <th>#</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-4 text-muted">Loading…</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-4 text-muted">No products found</td></tr>
              ) : (
                products.map((p, i) => (
                  <tr key={p._id}>
                    <td>#{i + 1}</td>
                    <td>
                      <div className="productInfo d-flex align-items-center gap-2">
                        <img src={p.images?.[0]} alt={p.name} width={40} height={40} style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name?.length > 30 ? p.name.slice(0, 30) + "…" : p.name}</span>
                      </div>
                    </td>
                    <td>{p.category?.name || "—"}</td>
                    <td>{p.brand || "—"}</td>
                    <td>
                      {p.oldPrice > p.price && <span className="text-muted text-decoration-line-through d-block" style={{ fontSize: 12 }}>₹{p.oldPrice}</span>}
                      <span className="text-danger fw-bold">₹{p.price}</span>
                    </td>
                    <td><span className={p.countInStock > 0 ? "text-success" : "text-danger"}>{p.countInStock}</span></td>
                    <td>{p.rating?.toFixed(1) || "—"}</td>
                    <td>
                      <Link to="/product-list">
                        <Button size="small" variant="outlined" style={{ minWidth: 32, padding: "2px 8px", fontSize: 12 }}>Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
