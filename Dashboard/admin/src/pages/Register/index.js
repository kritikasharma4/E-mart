import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { toast } from "react-toastify";

const Register = () => {
  const { loginAdmin } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords do not match");
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    const res = await postData("/api/users/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (res?.token) {
      loginAdmin(res.user, res.token);
      toast.success("Account created! Redirecting to dashboard…");
      navigate("/");
    } else {
      toast.error(res?.message || "Registration failed");
    }
  };

  return (
    <div className="registerPage">
      <div className="registerLeft">
        <div className="registerLeftContent">
          <h1>E-Mart Admin Dashboard</h1>
          <p>Manage products, categories, and orders from your central admin panel.</p>
          <Link to="/login" className="homeBtn">Back to Login</Link>
        </div>
      </div>

      <div className="registerRight">
        <div className="registerBox">
          <div className="registerHeader">
            <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" alt="logo" className="registerLogo" />
            <h2>Create Admin Account</h2>
          </div>

          <form className="registerForm" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
            <div className="inputGroup">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Password (min 6 chars)"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPwd(s => !s)}>{showPwd ? "🙈" : "👁️"}</span>
            </div>
            <div className="inputGroup">
              <input
                type="password"
                name="confirm"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
            <button className="signUpBtn" type="submit" disabled={loading}>
              {loading ? "Creating…" : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 14 }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
