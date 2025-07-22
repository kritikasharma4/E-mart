import React, { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="loginSection">
      <div className="loginBox">
        <div className="loginHeader">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="admin logo"
            className="loginLogo"
          />
          <h2>Login to Admin Panel</h2>
        </div>
        <form className="loginForm">
          <div className="inputGroup">
            <input type="email" placeholder="enter your email" required />
          </div>

          <div className="inputGroup passwordGroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter your password"
              required
            />
            <span
              className="togglePassword"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="signInBtn" type="submit">
            Sign In
          </button>

          <div className="forgot">FORGOT PASSWORD</div>

          <div className="divider">or</div>

          <button className="googleBtn" type="button">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
              alt="Google"
              className="googleIcon"
            />
            Sign In With Google
          </button>
        </form>

        <p className="registerPrompt">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
