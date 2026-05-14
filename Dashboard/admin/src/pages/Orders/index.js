import { useEffect, useState } from "react";
import { fetchAuthData, postAuthData } from "../../utils/api";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
const STATUS_COLOR = { Pending: "#d97706", Confirmed: "#2563eb", Shipped: "#7c3aed", Delivered: "#16a34a", Cancelled: "#dc2626" };

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: perPage, skip: (page - 1) * perPage });
    if (statusFilter) params.set("status", statusFilter);
    fetchAuthData(`/api/orders?${params}`).then(res => {
      setOrders(res?.orders || []);
      setTotal(res?.total || 0);
      setLoading(false);
    });
  };

  useEffect(fetchOrders, [page, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    const res = await postAuthData(`/api/orders/${orderId}/status`, { status: newStatus });
    if (res?._id || res?.status) {
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Order updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="content w-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="hd mb-0">Orders ({total})</h3>
        <Select
          size="small"
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          displayEmpty
          style={{ minWidth: 160 }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          {STATUS_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </div>

      <div className="card shadow border-0 p-3">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-4">Loading…</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-4 text-muted">No orders found</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order._id}>
                    <td style={{ fontSize: 12, fontWeight: 600 }}>#{order._id.slice(-8).toUpperCase()}</td>
                    <td>
                      <div style={{ fontSize: 13 }}>{order.user?.name || "—"}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{order.user?.email}</div>
                    </td>
                    <td>
                      {order.items?.slice(0, 2).map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          {item.image && <img src={item.image} alt="" width={28} height={28} style={{ borderRadius: 4, objectFit: "cover" }} />}
                          <span style={{ fontSize: 12 }}>{item.name?.slice(0, 20)} ×{item.qty}</span>
                        </div>
                      ))}
                      {order.items?.length > 2 && <span style={{ fontSize: 11, color: "#64748b" }}>+{order.items.length - 2} more</span>}
                    </td>
                    <td style={{ fontWeight: 700, color: "#0f172a" }}>₹{order.totalPrice?.toLocaleString()}</td>
                    <td style={{ fontSize: 12 }}>{order.paymentMethod}</td>
                    <td style={{ fontSize: 12, color: "#64748b" }}>
                      {new Date(order.dateCreated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td>
                      <Select
                        size="small"
                        value={order.status}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        style={{ fontSize: 12, color: STATUS_COLOR[order.status], fontWeight: 700, minWidth: 120 }}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <MenuItem key={s} value={s} style={{ color: STATUS_COLOR[s], fontWeight: 600 }}>{s}</MenuItem>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
            <Button size="small" variant="outlined" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</Button>
            <span style={{ fontSize: 13 }}>Page {page} of {totalPages}</span>
            <Button size="small" variant="outlined" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
