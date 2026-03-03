import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await API.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUser(userResponse.data);
        setNewName(userResponse.data.name);
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!newName.trim() || isLoading) return;

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await API.put("/users/update", 
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update user state with new name
      setUser({ ...user, name: newName });
      setMessage({ text: "Name updated successfully!", type: "success" });
      setTimeout(() => {
        setActiveSection(null);
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      console.error("Update name error:", error);
      setMessage({ 
        text: error.response?.data?.message || "Failed to update name", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;

    setMessage({ text: "", type: "" });

    if (!newPassword || !confirmPassword) {
      setMessage({ text: "Please fill in all password fields", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      await API.put("/users/update-password",
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ text: "Password updated successfully!", type: "success" });
      setTimeout(() => {
        setActiveSection(null);
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Failed to update password", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStarIcon = () => (
    <svg viewBox="0 0 100 100" width="30" height="30">
      <polygon points="50,10 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="#FFD93D" />
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
        <div className="profile-header">
          <h1 className="profile-title">My Math Hero Profile</h1>
          <p className="profile-subtitle">Track your progress and manage your account.</p>
        </div>

        {!user ? (
          <div className="loading-card">
            <p>Loading your hero profile...</p>
          </div>
        ) : (
          <>
            {/* Main Profile Card */}
            <div className="hero-card">
              <div className="hero-info">
                <h2 className="hero-name">{user.name}</h2>
                <p className="hero-email">{user.email}</p>
                
                <div className="points-badge">
                  {getStarIcon()}
                  <span className="points-text">{user.points} Points</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Horizontal */}
            <div className="actions-section">
              <div className="button-row">
                <button 
                  className="action-button name-button"
                  onClick={() => {
                    setActiveSection(activeSection === 'name' ? null : 'name');
                    setMessage({ text: "", type: "" });
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <span>Edit Display Name</span>
                </button>

                <button 
                  className="action-button password-button"
                  onClick={() => {
                    setActiveSection(activeSection === 'password' ? null : 'password');
                    setMessage({ text: "", type: "" });
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  <span>Change Password</span>
                </button>
              </div>

              {/* Expanded Sections - Below Buttons */}
              {activeSection === 'name' && (
                <div className="edit-card">
                  <form onSubmit={handleUpdateName}>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter new name"
                      className="edit-input"
                      disabled={isLoading}
                      required
                    />
                    <button type="submit" className="save-button" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                  {message.text && (
                    <div className={message.type === "success" ? "success-message" : "error-message"}>
                      {message.text}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'password' && (
                <div className="edit-card">
                  <form onSubmit={handleUpdatePassword}>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="edit-input"
                      disabled={isLoading}
                      required
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      className="edit-input"
                      disabled={isLoading}
                      required
                    />
                    <button type="submit" className="save-button" disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                  {message.text && (
                    <div className={message.type === "success" ? "success-message" : "error-message"}>
                      {message.text}
                    </div>
                  )}
                </div>
              )}
            </div>

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