import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const { loginAdmin } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await postData("/api/users/login", form);
    setLoading(false);
    if (res?.token) {
      if (!res.user.isAdmin) {
        toast.error("Admin access required. This account is not an admin.");
        return;
      }
      loginAdmin(res.user, res.token);
      toast.success(`Welcome, ${res.user.name}!`);
      navigate("/");
    } else {
      toast.error(res?.message || "Login failed");
    }
  };

  return (
    <section className="loginSection">
      <div className="loginBox">
        <div className="loginHeader">
          <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="admin logo" className="loginLogo" />
          <h2>Admin Panel</h2>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Sign in with your admin account</p>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="email"
              name="email"
              placeholder="Admin email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup passwordGroup">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="togglePassword" onClick={() => setShowPwd(s => !s)}>
              {showPwd ? "🙈" : "👁️"}
            </span>
          </div>
          <button className="signInBtn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="registerPrompt">
          Need an admin account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
