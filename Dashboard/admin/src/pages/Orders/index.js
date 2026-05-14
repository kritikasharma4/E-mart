import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthData } from "../../utils/api";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
const STATUS_COLOR = {
  Pending:   { color: "#d97706", bg: "#fffbeb" },
  Confirmed: { color: "#2563eb", bg: "#eff6ff" },
  Shipped:   { color: "#7c3aed", bg: "#f5f3ff" },
  Delivered: { color: "#16a34a", bg: "#f0fdf4" },
  Cancelled: { color: "#dc2626", bg: "#fef2f2" },
};

const StatChip = ({ label, value, color }) => (
  <div style={{
    background: "#fff", border: `1px solid #e2e8f0`, borderRadius: 10,
    padding: "12px 20px", minWidth: 110, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,.06)"
  }}>
    <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{label}</div>
  </div>
);

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  const fetchOrders = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: perPage, skip: (page - 1) * perPage });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    Promise.all([
      fetchAuthData(`/api/orders?${params}`),
      fetchAuthData("/api/orders/stats"),
    ]).then(([res, statsRes]) => {
      setOrders(res?.orders || []);
      setTotal(res?.total || 0);
      if (statsRes && !statsRes.error) setStats(statsRes);
      setLoading(false);
    });
  }, [page, statusFilter, search]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="content w-100 p-4">
      <h3 className="hd mb-4">Order Management</h3>

      {/* Stats row */}
      <div className="d-flex gap-3 flex-wrap mb-4">
        <StatChip label="Total" value={stats.totalOrders || 0} color="#0f172a" />
        <StatChip label="Pending" value={stats.pendingOrders || 0} color="#d97706" />
        <StatChip label="Confirmed" value={stats.confirmedOrders || 0} color="#2563eb" />
        <StatChip label="Shipped" value={stats.shippedOrders || 0} color="#7c3aed" />
        <StatChip label="Delivered" value={stats.deliveredOrders || 0} color="#16a34a" />
        <StatChip label={`Revenue`} value={`₹${Math.round(stats.revenue || 0).toLocaleString()}`} color="#0f172a" />
      </div>

      <div className="card border-0 shadow-sm p-3">
        {/* Filters */}
        <div className="d-flex gap-2 flex-wrap mb-3 align-items-center">
          <TextField
            size="small"
            placeholder="Search by name, email or order ID…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ minWidth: 280 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
            }}
          />
          <Select
            size="small"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            displayEmpty
            style={{ minWidth: 160 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            {STATUS_OPTIONS.map(s => (
              <MenuItem key={s} value={s} style={{ color: STATUS_COLOR[s]?.color, fontWeight: 600 }}>{s}</MenuItem>
            ))}
          </Select>
          {(statusFilter || search) && (
            <Button size="small" variant="outlined" onClick={() => { setStatusFilter(""); setSearch(""); setPage(1); }}>
              Clear
            </Button>
          )}
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#64748b" }}>{total} orders</span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead style={{ background: "#f8fafc", fontSize: 12, textTransform: "uppercase", color: "#64748b" }}>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-5 text-muted">Loading orders…</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-5 text-muted">No orders found</td></tr>
              ) : (
                orders.map(order => {
                  const sm = STATUS_COLOR[order.status] || {};
                  return (
                    <tr key={order._id}>
                      <td>
                        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13 }}>
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{order.user?.name || "—"}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{order.user?.email}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          {order.items?.slice(0, 3).map((item, i) => (
                            item.image && (
                              <img key={i} src={item.image} alt="" width={30} height={30}
                                style={{ borderRadius: 6, objectFit: "cover", border: "1px solid #e2e8f0" }} />
                            )
                          ))}
                          {order.items?.length > 3 && (
                            <span style={{ fontSize: 11, color: "#64748b", marginLeft: 4 }}>+{order.items.length - 3}</span>
                          )}
                          <span style={{ fontSize: 12, color: "#64748b", marginLeft: 4 }}>
                            {order.items?.length} item{order.items?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, fontSize: 14 }}>₹{order.totalPrice?.toLocaleString()}</td>
                      <td style={{ fontSize: 12 }}>{order.paymentMethod}</td>
                      <td style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>
                        {new Date(order.dateCreated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td>
                        <span style={{
                          background: sm.bg, color: sm.color,
                          padding: "3px 10px", borderRadius: 20,
                          fontSize: 12, fontWeight: 700,
                          border: `1px solid ${sm.color}`,
                          whiteSpace: "nowrap",
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/orders/${order._id}`)}
                          style={{ textTransform: "none", fontSize: 12 }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3 px-1">
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Page {page} of {totalPages} · {total} orders
            </span>
            <div className="d-flex gap-2">
              <Button size="small" variant="outlined" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</Button>
              <Button size="small" variant="outlined" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
