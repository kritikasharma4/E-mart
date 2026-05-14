import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../Assets/images/e-com.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SignIn = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
    return () => context.setisHeaderFooterShow(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="signInPage">
      <div className="shape-bottom">
        <svg fill="#fff" viewBox="0 0 1921 819.8">
          <path d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z" />
        </svg>
      </div>
      <div className="container">
        <div className="box">
          <div className="text-center mb-4">
            <img src={Logo} alt="E-Mart" className="auth-logo" />
          </div>
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to your E-Mart account</p>

          <form>
            <div className="form-group">
              <TextField label="Email address" type="email" required variant="outlined" fullWidth size="small" />
            </div>
            <div className="form-group">
              <TextField label="Password" required type="password" variant="outlined" fullWidth size="small" />
            </div>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="forgot-link">Forgot your password?</a>

            <Button className="action-button signin-main-btn" style={{ marginBottom: 10 }}>
              Sign In
            </Button>
            <Link to="/">
              <Button
                variant="outlined"
                className="action-button cancel-button"
                onClick={() => context.setisHeaderFooterShow(true)}
              >
                Cancel
              </Button>
            </Link>

            <div className="divider-text">or continue with</div>

            <div className="social-icons">
              <Link to="#" className="social-icon facebook" aria-label="Facebook"><FaFacebookSquare /></Link>
              <Link to="#" className="social-icon instagram" aria-label="Instagram"><FaInstagramSquare /></Link>
              <Link to="#" className="social-icon twitter" aria-label="Twitter"><FaXTwitter /></Link>
            </div>

            <button type="button" className="google-auth-button">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-icon" />
              Sign in with Google
            </button>

            <p className="signup-link">
              New to E-Mart? <Link to="/signUp">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
