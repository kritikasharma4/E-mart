import DashboardBox from "./components/dashboardBox";
import SalesBox from "./components/SalesBox";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="content w-100 p-4">
      <div className="row dashboardBoxWrapperRow">
        <div className="col-md-8">
          <div className="dashboardBoxWrapper d-flex flex-wrap justify-content-between">
            <DashboardBox
              gradientClass="greenGradient"
              icon="👤"
              label="Total Users"
              value="277"
            />
            <DashboardBox
              gradientClass="pinkGradient"
              icon="🛒"
              label="Total Users"
              value="277"
            />
            <DashboardBox
              gradientClass="blueGradient"
              icon="🎁"
              label="Total Users"
              value="277"
            />
            <DashboardBox
              gradientClass="orangeGradient"
              icon="⭐"
              label="Total Users"
              value="277"
            />
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
              <option>Mens</option>
              <option>Womens</option>
              <option>Kids</option>
            </select>
          </div>
          <div className="col-md-3">
            <h4>BRAND BY</h4>
            <select className="form-select">
              <option>Ecstasy</option>
              <option>Zara</option>
              <option>H&M</option>
            </select>
          </div>
          <div className="col-md-3">
            <h4>SEARCH BY</h4>
            <input
              type="text"
              className="form-control"
              placeholder="id / name / category / brand"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table bestSellingTable">
            <thead>
              <tr>
                <th>UID</th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>RATING</th>
                <th>ORDER</th>
                <th>SALES</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => (
                <tr key={i}>
                  <td>#1</td>
                  <td>
                    <div className="productInfo">
                      <img
                        src="https://via.placeholder.com/50x50.png?text=Img"
                        alt="product"
                      />

                      <div>
                        <div className="title">
                          Tops and skirt set for Fe...
                        </div>
                        <div className="subtitle">
                          Women's exclusive summer...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>
                    <span className="text-muted text-decoration-line-through">
                      $21.00
                    </span>
                    <br />
                    <span className="text-danger">$21.00</span>
                  </td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <Link to={`/product`} className="btn btn-sm btn-light me-1">
                      👁
                    </Link>
                    <button className="btn btn-sm btn-success me-1">✏️</button>
                    <button className="btn btn-sm btn-danger">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (static for now) */}
        <div className="pagination d-flex justify-content-end mt-3">
          <button className="btn btn-outline-secondary btn-sm me-1">
            {"<"}
          </button>
          {[...Array(10)].map((_, i) => (
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
