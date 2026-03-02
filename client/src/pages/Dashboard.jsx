import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const goToQuiz = (type) => {
    navigate(`/quiz/${type}`);
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="floating-shapes">
        <span className="shape shape-1">+</span>
        <span className="shape shape-2">×</span>
        <span className="shape shape-3">÷</span>
        <span className="shape shape-4">-</span>
        <span className="shape shape-5">7</span>
        <span className="shape shape-6">9</span>
      </div>

      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome Back, {user?.name || "Player"}!
          </h1>
          <p className="welcome-subtitle">
            Choose your math challenge and start playing.
          </p>
          
          <div className="points-badge">
            <svg viewBox="0 0 100 100" width="40" height="40">
              <polygon points="50,10 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="#FFD93D" />
            </svg>
            <span>{user?.points || 0} Points</span>
          </div>
        </div>

        {/* Quiz Selection */}
        <div className="quiz-selection">
          <div className="quiz-grid">
            <div className="quiz-card addition-card" onClick={() => goToQuiz("addition")}>
              <div className="card-icon">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle cx="50" cy="50" r="45" fill="#FF6B6B" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="white" strokeWidth="6" strokeLinecap="round" />
                  <line x1="50" y1="30" x2="50" y2="70" stroke="white" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Addition</h3>
              <p>Practice fast addition skills</p>
            </div>

            <div className="quiz-card subtraction-card" onClick={() => goToQuiz("subtraction")}>
              <div className="card-icon">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle cx="50" cy="50" r="45" fill="#4ECDC4" />
                  <line x1="30" y1="50" x2="70" y2="50" stroke="white" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Subtraction</h3>
              <p>Master subtraction challenges</p>
            </div>

            <div className="quiz-card multiplication-card" onClick={() => goToQuiz("multiplication")}>
              <div className="card-icon">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle cx="50" cy="50" r="45" fill="#FFD93D" />
                  <line x1="35" y1="35" x2="65" y2="65" stroke="white" strokeWidth="6" strokeLinecap="round" />
                  <line x1="65" y1="35" x2="35" y2="65" stroke="white" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Multiplication</h3>
              <p>Boost multiplication speed</p>
            </div>

            <div className="quiz-card division-card" onClick={() => goToQuiz("division")}>
              <div className="card-icon">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle cx="50" cy="50" r="45" fill="#95E1D3" />
                  <line x1="25" y1="50" x2="75" y2="50" stroke="white" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="50" cy="35" r="4" fill="white" />
                  <circle cx="50" cy="65" r="4" fill="white" />
                </svg>
              </div>
              <h3>Division</h3>
              <p>Conquer division problems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;