import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { toast } from 'react-toastify';

const SignUp = () => {
  const { login } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Please fill all required fields');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    const res = await postData('/api/users/register', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    setLoading(false);
    if (res?.token) {
      login(res.user, res.token);
      toast.success(`Account created! Welcome, ${res.user.name}!`);
      navigate('/');
    } else {
      toast.error(res?.message || 'Registration failed');
    }
  };

  return (
    <div className="em-auth">
      <div className="em-auth-card">
        <div className="em-auth-logo">E-Mart</div>
        <h2 className="em-auth-title">Create account</h2>
        <p className="em-auth-sub">Join thousands of happy shoppers</p>

        <form onSubmit={handleSubmit}>
          <div className="em-field-row">
            <div className="em-field">
              <label>Full name <span className="em-required">*</span></label>
              <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
            <div className="em-field">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="+91 9999999999" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="em-field">
            <label>Email address <span className="em-required">*</span></label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="em-field">
            <label>Password <span className="em-required">*</span></label>
            <div className="em-field-pwd">
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="em-pwd-toggle" onClick={() => setShowPwd(s => !s)}>
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="em-field">
            <label>Confirm password <span className="em-required">*</span></label>
            <input
              type="password"
              name="confirm"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="em-auth-submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="em-auth-switch">
          Already have an account? <Link to="/signIn">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
