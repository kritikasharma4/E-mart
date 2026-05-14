import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../Assets/images/e-com.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <h2>Create an account</h2>
          <p className="subtitle">Join E-Mart and start shopping today</p>

          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <TextField label="Full Name" required type="text" variant="outlined" fullWidth size="small" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <TextField label="Phone Number" required type="tel" variant="outlined" fullWidth size="small" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <TextField label="Email address" required type="email" variant="outlined" fullWidth size="small" />
            </div>
            <div className="form-group">
              <TextField label="Password" required type="password" variant="outlined" fullWidth size="small" />
            </div>
            <div className="form-group">
              <TextField label="Confirm Password" required type="password" variant="outlined" fullWidth size="small" />
            </div>

            <Button className="action-button signin-main-btn" style={{ marginBottom: 10 }}>
              Create Account
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

            <div className="divider-text">or sign up with</div>

            <button type="button" className="google-auth-button">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-icon" />
              Sign up with Google
            </button>

            <p className="signup-link">
              Already have an account? <Link to="/signIn">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
