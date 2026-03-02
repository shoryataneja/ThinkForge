import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, leaderboardResponse] = await Promise.all([
          API.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/leaderboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        
        setUser(userResponse.data);
        
        // Find user's rank in leaderboard
        const userIndex = leaderboardResponse.data.findIndex(
          (u) => u._id === userResponse.data._id
        );
        setUserRank(userIndex !== -1 ? userIndex + 1 : null);
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };

    fetchUserData();
  }, [token]);

  const getAvatarIcon = () => (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <circle cx="50" cy="50" r="45" fill="#4ECDC4" />
      <circle cx="50" cy="35" r="15" fill="white" />
      <path d="M 25 75 Q 50 60 75 75" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  );

  const getStarIcon = () => (
    <svg viewBox="0 0 100 100" width="40" height="40">
      <polygon points="50,10 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="#FFD93D" />
    </svg>
  );

  const getTrophyIcon = () => (
    <svg viewBox="0 0 100 100" width="40" height="40">
      <path d="M30 20 L70 20 L65 60 L35 60 Z" fill="#FFD93D" />
      <rect x="45" y="60" width="10" height="15" fill="#8B4513" />
      <rect x="40" y="75" width="20" height="5" fill="#8B4513" />
      <circle cx="25" cy="30" r="8" fill="#C0C0C0" />
      <circle cx="75" cy="30" r="8" fill="#C0C0C0" />
    </svg>
  );

  const getCalculatorIcon = () => (
    <svg viewBox="0 0 100 100" width="40" height="40">
      <rect x="20" y="15" width="60" height="70" rx="8" fill="#95E1D3" />
      <rect x="30" y="25" width="40" height="15" rx="3" fill="white" />
      <circle cx="35" cy="55" r="5" fill="white" />
      <circle cx="50" cy="55" r="5" fill="white" />
      <circle cx="65" cy="55" r="5" fill="white" />
      <circle cx="35" cy="70" r="5" fill="white" />
      <circle cx="50" cy="70" r="5" fill="white" />
      <circle cx="65" cy="70" r="5" fill="white" />
    </svg>
  );

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="floating-shapes">
        <span className="shape shape-1">+</span>
        <span className="shape shape-2">×</span>
        <span className="shape shape-3">÷</span>
        <span className="shape shape-4">-</span>
        <span className="shape shape-5">9</span>
        <span className="shape shape-6">6</span>
      </div>

      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <h1 className="profile-title">My Math Hero Profile</h1>
          <p className="profile-subtitle">Track your progress and achievements.</p>
        </div>

        {!user ? (
          <div className="loading-card">
            <p>Loading your hero profile...</p>
          </div>
        ) : (
          <>
            {/* Main Profile Card */}
            <div className="hero-card">
              <div className="avatar-section">
                <div className="avatar-circle">
                  {getAvatarIcon()}
                </div>
                <div className="hero-badge">
                  <svg viewBox="0 0 100 100" width="30" height="30">
                    <polygon points="50,5 60,30 85,30 65,45 72,70 50,55 28,70 35,45 15,30 40,30" fill="#FF6B6B" />
                  </svg>
                </div>
              </div>
              
              <div className="hero-info">
                <h2 className="hero-name">{user.name}</h2>
                <p className="hero-email">{user.email}</p>
                
                <div className="points-badge">
                  {getStarIcon()}
                  <span className="points-text">{user.points} Points</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
              <div className="stat-card points-card">
                <div className="stat-icon">{getStarIcon()}</div>
                <div className="stat-info">
                  <h3>{user.points}</h3>
                  <p>Total Points</p>
                </div>
              </div>

              {userRank && (
                <div className="stat-card rank-card">
                  <div className="stat-icon">{getTrophyIcon()}</div>
                  <div className="stat-info">
                    <h3>#{userRank}</h3>
                    <p>Current Rank</p>
                  </div>
                </div>
              )}

              <div className="stat-card activity-card">
                <div className="stat-icon">{getCalculatorIcon()}</div>
                <div className="stat-info">
                  <h3>Active</h3>
                  <p>Math Hero</p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button className="back-button" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;