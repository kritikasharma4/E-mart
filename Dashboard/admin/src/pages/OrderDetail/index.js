import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAuthData, postAuthData } from "../../utils/api";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

const STATUS_META = {
  Pending:   { color: "#d97706", bg: "#fffbeb", icon: <HourglassTopIcon />, label: "Pending" },
  Confirmed: { color: "#2563eb", bg: "#eff6ff", icon: <InventoryIcon />,    label: "Confirmed" },
  Shipped:   { color: "#7c3aed", bg: "#f5f3ff", icon: <LocalShippingIcon />, label: "Shipped" },
  Delivered: { color: "#16a34a", bg: "#f0fdf4", icon: <DoneAllIcon />,       label: "Delivered" },
  Cancelled: { color: "#dc2626", bg: "#fef2f2", icon: <CancelIcon />,        label: "Cancelled" },
};

const TIMELINE_ORDER = ["Pending", "Confirmed", "Shipped", "Delivered"];

const Timeline = ({ statusHistory = [], currentStatus }) => {
  const isCancelled = currentStatus === "Cancelled";

  if (isCancelled) {
    return (
      <div className="od-timeline">
        {statusHistory.map((event, i) => {
          const meta = STATUS_META[event.status] || STATUS_META.Pending;
          return (
            <div key={i} className="od-timeline-step done">
              <div className="od-tl-icon" style={{ background: meta.bg, color: meta.color, border: `2px solid ${meta.color}` }}>
                <CheckCircleIcon style={{ fontSize: 18 }} />
              </div>
              <div className="od-tl-body">
                <div className="od-tl-status" style={{ color: meta.color }}>{event.status}</div>
                <div className="od-tl-note">{event.note}</div>
                <div className="od-tl-time">{new Date(event.updatedAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const doneStatuses = statusHistory.map(e => e.status);
  const historyMap = {};
  statusHistory.forEach(e => { historyMap[e.status] = e; });

  return (
    <div className="od-timeline">
      {TIMELINE_ORDER.map((step, i) => {
        const done = doneStatuses.includes(step);
        const meta = STATUS_META[step];
        const event = historyMap[step];
        return (
          <div key={step} className={`od-timeline-step ${done ? "done" : "pending"}`}>
            {i < TIMELINE_ORDER.length - 1 && (
              <div className={`od-tl-line ${done && doneStatuses.includes(TIMELINE_ORDER[i + 1]) ? "done" : ""}`} />
            )}
            <div className="od-tl-icon" style={{
              background: done ? meta.bg : "#f1f5f9",
              color: done ? meta.color : "#94a3b8",
              border: `2px solid ${done ? meta.color : "#e2e8f0"}`,
            }}>
              {done ? <CheckCircleIcon style={{ fontSize: 18 }} /> : <RadioButtonUncheckedIcon style={{ fontSize: 18 }} />}
            </div>
            <div className="od-tl-body">
              <div className="od-tl-status" style={{ color: done ? meta.color : "#94a3b8" }}>{meta.label}</div>
              {event ? (
                <>
                  <div className="od-tl-note">{event.note}</div>
                  <div className="od-tl-time">{new Date(event.updatedAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                </>
              ) : (
                <div className="od-tl-note" style={{ color: "#cbd5e1" }}>Not yet reached</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAuthData(`/api/orders/${id}`).then(data => {
      setOrder(data);
      setNewStatus(data?.status || "Pending");
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = async () => {
    if (newStatus === order.status && !note.trim()) {
      toast.info("No changes to apply");
      return;
    }
    setUpdating(true);
    const res = await postAuthData(`/api/orders/${id}/status`, { status: newStatus, note: note.trim() });
    setUpdating(false);
    if (res?._id) {
      setOrder(res);
      setNote("");
      toast.success(`Status updated to ${newStatus}`);
    } else {
      toast.error(res?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="content w-100 p-4 d-flex align-items-center justify-content-center" style={{ minHeight: 400 }}>
        <div style={{ textAlign: "center", color: "#64748b" }}>
          <div className="spinner-border text-primary mb-3" />
          <p>Loading order…</p>
        </div>
      </div>
    );
  }

  if (!order || order.message) {
    return (
      <div className="content w-100 p-4">
        <p className="text-danger">Order not found.</p>
        <Button onClick={() => navigate("/orders")} startIcon={<ArrowBackIcon />}>Back to Orders</Button>
      </div>
    );
  }

  const meta = STATUS_META[order.status] || STATUS_META.Pending;
  const discount = order.itemsTotal - (order.totalPrice - order.shippingPrice);

  return (
    <div className="content w-100 p-4">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="outlined" size="small" startIcon={<ArrowBackIcon />} onClick={() => navigate("/orders")}>
          Back
        </Button>
        <div>
          <h4 className="mb-0 fw-bold" style={{ fontSize: 20 }}>
            Order #{order._id.slice(-8).toUpperCase()}
          </h4>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Placed on {new Date(order.dateCreated).toLocaleString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <span className="ms-auto badge" style={{
          background: meta.bg, color: meta.color, border: `1px solid ${meta.color}`,
          padding: "6px 14px", borderRadius: 20, fontWeight: 700, fontSize: 13,
        }}>
          {meta.icon} &nbsp;{order.status}
        </span>
      </div>

      <div className="row g-4">
        {/* Left column */}
        <div className="col-lg-8">

          {/* Order tracking timeline */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-4" style={{ fontSize: 15 }}>Order Tracking</h5>
            <Timeline statusHistory={order.statusHistory || []} currentStatus={order.status} />
          </div>

          {/* Items */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: 15 }}>Items Ordered ({order.items?.length})</h5>
            <table className="table table-borderless mb-0">
              <thead style={{ background: "#f8fafc" }}>
                <tr style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase" }}>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, i) => (
                  <tr key={i} style={{ verticalAlign: "middle" }}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} width={52} height={52}
                            style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0, border: "1px solid #e2e8f0" }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>₹{item.price?.toLocaleString()} each</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center" style={{ fontWeight: 600 }}>{item.qty}</td>
                    <td className="text-end" style={{ color: "#64748b", fontSize: 13 }}>₹{item.price?.toLocaleString()}</td>
                    <td className="text-end" style={{ fontWeight: 700 }}>₹{(item.price * item.qty)?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />
            <div className="d-flex flex-column align-items-end gap-1" style={{ fontSize: 14 }}>
              <div className="d-flex gap-4">
                <span style={{ color: "#64748b" }}>Items Total</span>
                <span>₹{order.itemsTotal?.toLocaleString()}</span>
              </div>
              <div className="d-flex gap-4">
                <span style={{ color: "#64748b" }}>Shipping</span>
                <span style={{ color: order.shippingPrice === 0 ? "#16a34a" : "inherit" }}>
                  {order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}
                </span>
              </div>
              <div className="d-flex gap-4 mt-1">
                <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>₹{order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-4">

          {/* Update status panel */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: 15 }}>Update Status</h5>
            <div className="mb-3">
              <label style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                New Status
              </label>
              <Select
                fullWidth
                size="small"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map(s => (
                  <MenuItem key={s} value={s} style={{ color: STATUS_META[s]?.color, fontWeight: 600 }}>{s}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 6, display: "block" }}>
                Note (optional)
              </label>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                placeholder="e.g. Dispatched via BlueDart, AWB: 123456…"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
            <Button
              fullWidth
              variant="contained"
              onClick={handleUpdate}
              disabled={updating}
              style={{ background: "#4f46e5", textTransform: "none", fontWeight: 700 }}
            >
              {updating ? "Updating…" : "Update Order"}
            </Button>
          </div>

          {/* Customer info */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: 15 }}>Customer</h5>
            <div style={{ fontSize: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>{order.user?.name || "—"}</div>
              <div style={{ color: "#64748b", marginBottom: 2 }}>{order.user?.email}</div>
              {order.user?.phone && <div style={{ color: "#64748b" }}>{order.user.phone}</div>}
            </div>
          </div>

          {/* Shipping address */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: 15 }}>Shipping Address</h5>
            <address style={{ fontSize: 14, lineHeight: 1.9, color: "#334155", fontStyle: "normal" }}>
              <strong>{order.shippingAddress?.fullName}</strong><br />
              {order.shippingAddress?.address}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
              Pincode: {order.shippingAddress?.pincode}<br />
              📞 {order.shippingAddress?.phone}
            </address>
          </div>

          {/* Payment info */}
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3" style={{ fontSize: 15 }}>Payment</h5>
            <div style={{ fontSize: 14 }}>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: "#64748b" }}>Method</span>
                <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 700, color: order.isPaid ? "#16a34a" : "#d97706" }}>
                  {order.isPaid ? "✓ Paid" : "Pending"}
                </span>
              </div>
              {order.deliveredAt && (
                <div className="d-flex justify-content-between mt-2">
                  <span style={{ color: "#64748b" }}>Delivered at</span>
                  <span style={{ fontSize: 12 }}>{new Date(order.deliveredAt).toLocaleDateString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
