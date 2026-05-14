import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MyContext } from "../../App";
import Logo from "../../Assets/images/e-com.png";

const SignIn = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
    return () => context.setisHeaderFooterShow(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="em-auth">
      <div className="em-auth-card">
        <img src={Logo} alt="E-Mart" className="em-auth-logo" />
        <h1 className="em-auth-title">Welcome back</h1>
        <p className="em-auth-sub">Sign in to your E-Mart account</p>

        <form onSubmit={e => e.preventDefault()}>
          <div className="em-field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="em-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="em-forgot">Forgot your password?</a>

          <button type="submit" className="em-auth-submit">Sign In</button>
          <Link to="/" onClick={() => context.setisHeaderFooterShow(true)}>
            <button type="button" className="em-auth-cancel">Cancel</button>
          </Link>

          <div className="em-divider">or continue with</div>

          <div className="em-social-row">
            <a href="#fb" className="em-social-btn fb" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#ig" className="em-social-btn ig" aria-label="Instagram"><FaInstagram /></a>
            <a href="#tw" className="em-social-btn tw" aria-label="Twitter"><FaXTwitter /></a>
          </div>

          <button type="button" className="em-google-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
            Sign in with Google
          </button>
        </form>

        <p className="em-auth-switch">
          New to E-Mart? <Link to="/signUp">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
