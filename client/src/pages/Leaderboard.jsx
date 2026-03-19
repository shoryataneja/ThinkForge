import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../services/api";
import "../styles/leaderboard.css";

const socket = io(import.meta.env.VITE_API_URL);

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardResponse, userResponse] = await Promise.all([
          API.get("/leaderboard", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        
        setUsers(leaderboardResponse.data);
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchData();

    socket.on("leaderboardUpdated", (updatedUsers) => {
      setUsers(updatedUsers);
    });

    return () => socket.off("leaderboardUpdated");
  }, [token]);

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  const getMedalIcon = (rank) => {
    const colors = {
      1: { bg: "#FFD700", accent: "#FFA500" }, // Gold
      2: { bg: "#C0C0C0", accent: "#A9A9A9" }, // Silver  
      3: { bg: "#CD7F32", accent: "#B8860B" }  // Bronze
    };
    
    return (
      <svg viewBox="0 0 100 100" width="60" height="60">
        <circle cx="50" cy="50" r="40" fill={colors[rank].bg} stroke={colors[rank].accent} strokeWidth="4" />
        <circle cx="50" cy="50" r="25" fill={colors[rank].accent} />
        <text x="50" y="58" fontSize="24" fill="white" fontWeight="bold" textAnchor="middle">
          {rank}
        </text>
      </svg>
    );
  };

  const getTrophyIcon = () => (
    <svg viewBox="0 0 120 120" width="80" height="80">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
      <path d="M35 25 L85 25 L80 65 L40 65 Z" fill="url(#goldGrad)" />
      <rect x="55" y="65" width="10" height="20" fill="#8B4513" />
      <rect x="45" y="85" width="30" height="8" rx="4" fill="#8B4513" />
      <circle cx="25" cy="35" r="12" fill="#C0C0C0" />
      <circle cx="95" cy="35" r="12" fill="#C0C0C0" />
      <polygon points="60,15 65,25 75,25 67,32 70,42 60,37 50,42 53,32 45,25 55,25" fill="#FFD700" />
    </svg>
  );

  return (
    <div className="celebration-page">
      <div className="confetti-shapes">
        <span className="confetti confetti-1">★</span>
        <span className="confetti confetti-2">◆</span>
        <span className="confetti confetti-3">★</span>
        <span className="confetti confetti-4">●</span>
        <span className="confetti confetti-5">★</span>
        <span className="confetti confetti-6">◆</span>
        <span className="confetti confetti-7">★</span>
        <span className="confetti confetti-8">●</span>
      </div>

      <div className="celebration-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        {/* Hero Header */}
        <div className="hero-header">
          <div className="trophy-celebration">
            {getTrophyIcon()}
          </div>
          <h1 className="celebration-title">Math Champions!</h1>
          <p className="celebration-subtitle">See who's leading the challenge!</p>
        </div>

        {users.length === 0 ? (
          <div className="loading-celebration">
            <p>Loading our champions...</p>
          </div>
        ) : (
          <>
            {/* Podium Section */}
            {topThree.length > 0 && (
              <div className="podium-arena">
                {/* Second Place */}
                {topThree.length > 1 && (
                  <div className="podium-platform second-platform">
                    <div className="platform-card">
                      <div className="medal-glow">{getMedalIcon(2)}</div>
                      <h3>{topThree[1].name}</h3>
                      <div className="points-display">{topThree[1].points}</div>
                      <div className="platform-label">2nd Place</div>
                    </div>
                    <div className="platform-base second-base"></div>
                  </div>
                )}
                
                {/* First Place */}
                <div className="podium-platform first-platform">
                  <div className="platform-card champion-card">
                    <div className="medal-glow champion-glow">{getMedalIcon(1)}</div>
                    <h3>{topThree[0].name}</h3>
                    <div className="points-display champion-points">{topThree[0].points}</div>
                    <div className="platform-label champion-label">Champion!</div>
                  </div>
                  <div className="platform-base first-base"></div>
                </div>
                
                {/* Third Place */}
                {topThree.length > 2 && (
                  <div className="podium-platform third-platform">
                    <div className="platform-card">
                      <div className="medal-glow">{getMedalIcon(3)}</div>
                      <h3>{topThree[2].name}</h3>
                      <div className="points-display">{topThree[2].points}</div>
                      <div className="platform-label">3rd Place</div>
                    </div>
                    <div className="platform-base third-base"></div>
                  </div>
                )}
              </div>
            )}

            {/* Remaining Players */}
            {users.length > 3 && (
              <div className="champions-list">
                <div className="player-badges">
                  {users.slice(3).map((user, index) => {
                    const actualRank = index + 4;
                    const isCurrentUser = currentUser && user._id === currentUser._id;
                    
                    return (
                      <div 
                        key={user._id} 
                        className={`player-badge ${
                          isCurrentUser ? 'current-player' : ''
                        }`}
                      >
                        <div className="badge-rank">#{actualRank}</div>
                        <div className="badge-info">
                          <h4>
                            {user.name}
                            {isCurrentUser && <span className="you-tag">You</span>}
                          </h4>
                          <p>{user.points} points</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;