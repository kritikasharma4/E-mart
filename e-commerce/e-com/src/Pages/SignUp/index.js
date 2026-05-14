import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Logo from "../../Assets/images/e-com.png";

const SignUp = () => {
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
        <h1 className="em-auth-title">Create account</h1>
        <p className="em-auth-sub">Join E-Mart and start shopping today</p>

        <form onSubmit={e => e.preventDefault()}>
          <div className="em-field-row">
            <div className="em-field">
              <label>First Name</label>
              <input type="text" placeholder="Jane" />
            </div>
            <div className="em-field">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="em-field">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="em-field">
            <label>Email address</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="em-field">
            <label>Password</label>
            <input type="password" placeholder="Min. 8 characters" />
          </div>
          <div className="em-field">
            <label>Confirm Password</label>
            <input type="password" placeholder="Repeat your password" />
          </div>

          <button type="submit" className="em-auth-submit">Create Account</button>
          <Link to="/" onClick={() => context.setisHeaderFooterShow(true)}>
            <button type="button" className="em-auth-cancel">Cancel</button>
          </Link>

          <div className="em-divider">or sign up with</div>

          <button type="button" className="em-google-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
            Sign up with Google
          </button>
        </form>

        <p className="em-auth-switch">
          Already have an account? <Link to="/signIn">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
