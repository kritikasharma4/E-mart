import { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import Logo from "../../Assets/images/e-com.png";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SignUp = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);
  return (
    <section className="section signInPage signUpPage">
      <div class="shape-bottom">
        {" "}
        <svg fill="#fff" id="Layer_1" x="0px" y="0px" viewBox="0 0 1921 819.8">
          <path
            class="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>{" "}
        </svg>
      </div>
      <div className="container">
        <div className="box card p-3 shadow border-0">
          <div className="text-center">
            <div className="auth-logo-wrapper text-center mb-3">
              <img src={Logo} alt="Logo" className="auth-logo" />
            </div>

            <form>
              <h2 className="mb-4">SignUp</h2>

              <div className="row">
                <div className="col-md-6">
                <div className="form-group">
                <TextField
                  
                  label="Name"
                  required
                  type="text"
                  variant="standard"
                  className="w-100"
                />
              </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                <TextField
                  
                  label="Phone No."
                  required
                  type="text"
                  variant="standard"
                  className="w-100"
                />
              </div>
                </div>
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Email"
                  required
                  variant="standard"
                  className="w-100"
                />
              </div>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Password"
                  required
                  type="password"
                  variant="standard"
                  className="w-100"
                />
              </div>

              <div className="form-group mb-5">
                <TextField
                  id="standard-basic"
                  label="Confirm Password"
                  required
                  type="password"
                  variant="standard"
                  className="w-100"
                />
              </div>

              <div className="button-group">
                <Button
                  style={{ background: "#2bbef9", color: "#fff" }}
                  className="action-button"
                >
                  Sign Up
                </Button>
                <Link to="/">
                <Button
                  variant="outlined"
                  onClick={()=>context.setisHeaderFooterShow(true)}
                  className="action-button cancel-button"
                >
                  Cancel
                </Button>
                </Link>
              </div>

              <p className="txt">
                Already Registered?{" "}
                <Link to="" className="border-effect">
                  SignIn
                </Link>
              </p>

              <h6 className="text-center" style={{ fontWeight: "bold" }}>
                Or Continue with social account
              </h6>

              <div className="google-signin-btn">
                <button className="google-auth-button w-100">
                  <div className="google-icon-wrapper">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      className="google-icon"
                    />
                  </div>
                  <span className="google-button-text">
                    Sign in with Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
