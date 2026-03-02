import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="floating-shapes">
        <span className="shape shape-1">+</span>
        <span className="shape shape-2">×</span>
        <span className="shape shape-3">÷</span>
        <span className="shape shape-4">-</span>
        <span className="shape shape-5">7</span>
        <span className="shape shape-6">9</span>
      </div>

      <div className="auth-container">
        <div className="auth-illustration">
          <svg viewBox="0 0 300 300" className="auth-svg">
            <circle cx="150" cy="150" r="70" fill="#4ECDC4" opacity="0.2" />
            <text x="110" y="90" fontSize="45" fill="#FFD93D" fontWeight="bold">3+5</text>
            <text x="170" y="140" fontSize="35" fill="#FF6B6B" fontWeight="bold">=</text>
            <text x="200" y="140" fontSize="45" fill="#95E1D3" fontWeight="bold">8</text>
            <text x="90" y="200" fontSize="40" fill="#A8E6CF" fontWeight="bold">6×2</text>
            <circle cx="230" cy="90" r="20" fill="#FFD93D" opacity="0.6" />
            <circle cx="60" cy="140" r="25" fill="#FF6B6B" opacity="0.4" />
            <polygon points="150,250 160,230 140,230" fill="#4ECDC4" />
          </svg>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1>Join ThinkForge</h1>
            <p>Create your account and begin your math journey.</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#4ECDC4">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              Start My Journey
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;