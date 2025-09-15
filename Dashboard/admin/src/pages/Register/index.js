import React, { useState } from "react";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="registerPage">
      {/* Left Side */}
      <div className="registerLeft">
        <div className="registerLeftContent">
          <h1>BEST UX/UI FASHION ECOMMERCE DASHBOARD & ADMIN PANEL</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries.
          </p>
          <button className="homeBtn" onClick={() => window.location.href = "/"}>
  Go To Home
</button>

        </div>
      </div>

      {/* Right Side */}
      <div className="registerRight">
        <div className="registerBox">
          <div className="registerHeader">
            <img
              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
              alt="logo"
              className="registerLogo"
            />
            <h2>Register a new account</h2>
          </div>

          <form className="registerForm">
            <input type="text" placeholder="enter your name" required />
            <input type="email" placeholder="enter your email" required />
            <div className="inputGroup">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <div className="inputGroup">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm your password"
                required
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to all Terms & Conditions</label>
            </div>

            <button className="signUpBtn" type="submit">Sign Up</button>

            <div className="divider">or</div>

            <button className="googleBtn" type="button">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
                alt="Google"
                className="googleIcon"
              />
              Sign Up With Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
