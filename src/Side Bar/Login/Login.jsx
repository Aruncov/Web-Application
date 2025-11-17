import React, { useState } from "react";
import { login } from "../../utils/auth";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = login(username, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT PANEL */}
      <div className="login-left">
        <h1 className="title">Sign in</h1>
        <p className="subtitle">to access ERP System</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label">User ID</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />

          <label className="input-label">Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src="./public/show.png" alt="show" />
              ) : (
                <img src="./public/invisible.png" alt="hide" />
              )}
            </span>
          </div>

          <button className="login-btn" type="submit">
            Sign in
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <img
          src="/images/login-art.svg"
          className="login-illustration"
          alt="illustration"
        />
        <h2>MFA for all accounts</h2>
        <p>
          Secure online accounts with 2FA.  
          Backup OTP secrets and never lose access.
        </p>
      </div>
    </div>
  );
}

export default Login;
