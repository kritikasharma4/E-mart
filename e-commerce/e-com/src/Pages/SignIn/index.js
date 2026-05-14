import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { toast } from 'react-toastify';

const SignIn = () => {
  const { login } = useContext(MyContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill in all fields');
    setLoading(true);
    const res = await postData('/api/users/login', form);
    setLoading(false);
    if (res?.token) {
      login(res.user, res.token);
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate('/');
    } else {
      toast.error(res?.message || 'Login failed');
    }
  };

  return (
    <div className="em-auth">
      <div className="em-auth-card">
        <div className="em-auth-logo">E-Mart</div>
        <h2 className="em-auth-title">Welcome back</h2>
        <p className="em-auth-sub">Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="em-field">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="em-field">
            <label>Password</label>
            <div className="em-field-pwd">
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="em-pwd-toggle" onClick={() => setShowPwd(s => !s)}>
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" className="em-auth-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="em-auth-switch">
          Don't have an account? <Link to="/signUp">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
