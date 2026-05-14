import { useEffect, useState } from "react";
import DashboardBox from "./components/dashboardBox";
import SalesBox from "./components/SalesBox";
import { Link } from "react-router-dom";
import { getProducts } from "../../utils/api";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ limit: 12 }).then((res) => {
      setProducts(res.data?.products || []);
    });
  }, []);

  return (
    <div className="content w-100 p-4">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex flex-wrap justify-content-between">
            <DashboardBox gradientClass="greenGradient" icon="👤" label="Total Users" value="277" />
            <DashboardBox gradientClass="pinkGradient" icon="🛒" label="Total Orders" value="134" />
            <DashboardBox gradientClass="blueGradient" icon="🎁" label="Total Gifts" value="89" />
            <DashboardBox gradientClass="orangeGradient" icon="⭐" label="Avg Rating" value="4.5" />
          </div>
        </div>
        <div className="col-md-4">
          <SalesBox />
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Best Selling Products</h3>

        <div className="row cardFilters mb-3">
          <div className="col-md-3">
            <h4>SHOW BY</h4>
            <select className="form-select">
              <option>12 Row</option>
              <option>24 Row</option>
              <option>48 Row</option>
            </select>
          </div>
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <select className="form-select">
              <option>All</option>
            </select>
          </div>
          <div className="col-md-3">
            <h4>BRAND BY</h4>
            <select className="form-select">
              <option>All</option>
            </select>
          </div>
          <div className="col-md-3">
            <h4>SEARCH BY</h4>
            <input
              type="text"
              className="form-control"
              placeholder="name / brand"
            />
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    Loading products...
                  </td>
                </tr>
              ) : (
                products.map((p, i) => (
                  <tr key={p._id}>
                    <td>#{i + 1}</td>
                    <td>
                      <div className="productInfo d-flex align-items-center gap-2">
                        <img
                          src={p.images?.[0] || "https://via.placeholder.com/40"}
                          alt={p.name}
                          width={40}
                          height={40}
                          style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>
                          {p.name?.length > 30 ? p.name.slice(0, 30) + "..." : p.name}
                        </span>
                      </div>
                    </td>
                    <td>{p.category?.name || "—"}</td>
                    <td>{p.brand || "—"}</td>
                    <td>
                      {p.oldPrice && p.oldPrice > p.price && (
                        <span className="text-muted text-decoration-line-through d-block" style={{ fontSize: 12 }}>
                          ₹{p.oldPrice}
                        </span>
                      )}
                      <span className="text-danger fw-bold">₹{p.price}</span>
                    </td>
                    <td>
                      <span className={p.countInStock > 0 ? "text-success" : "text-danger"}>
                        {p.countInStock}
                      </span>
                    </td>
                    <td>{p.rating || "—"}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link to="/product">
                          <Button size="small" variant="outlined" style={{ minWidth: 32, padding: "2px 8px", fontSize: 12 }}>
                            View
                          </Button>
                        </Link>
                        <Link to="/product-list">
                          <Button size="small" variant="outlined" color="error" style={{ minWidth: 32, padding: "2px 8px", fontSize: 12 }}>
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination d-flex justify-content-end mt-3">
          <button className="btn btn-outline-secondary btn-sm me-1">{"<"}</button>
          {[...Array(5)].map((_, i) => (
            <button key={i} className="btn btn-outline-secondary btn-sm me-1">
              {i + 1}
            </button>
          ))}
          <button className="btn btn-outline-secondary btn-sm">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
