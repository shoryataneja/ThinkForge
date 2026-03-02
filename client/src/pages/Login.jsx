import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="floating-shapes">
        <span className="shape shape-1">+</span>
        <span className="shape shape-2">×</span>
        <span className="shape shape-3">÷</span>
        <span className="shape shape-4">-</span>
        <span className="shape shape-5">5</span>
        <span className="shape shape-6">8</span>
      </div>

      <div className="auth-container">
        <div className="auth-illustration">
          <svg viewBox="0 0 300 300" className="auth-svg">
            <circle cx="150" cy="150" r="60" fill="#FFD93D" opacity="0.3" />
            <text x="100" y="100" fontSize="50" fill="#FF6B6B" fontWeight="bold">2+2</text>
            <text x="180" y="160" fontSize="40" fill="#4ECDC4" fontWeight="bold">×</text>
            <text x="80" y="210" fontSize="45" fill="#95E1D3" fontWeight="bold">5-3</text>
            <circle cx="220" cy="100" r="25" fill="#A8E6CF" />
            <text x="210" y="110" fontSize="25" fill="#fff" fontWeight="bold">÷</text>
            <circle cx="150" cy="240" r="15" fill="#FF6B6B" />
            <circle cx="50" cy="150" r="20" fill="#4ECDC4" opacity="0.5" />
          </svg>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Welcome Back!</h1>
            <p>Continue your math adventure.</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#4ECDC4">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#4ECDC4">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Start Playing
            </button>
          </form>

          <div className="auth-footer">
            <p>New to ThinkForge? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;