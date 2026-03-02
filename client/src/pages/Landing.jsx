import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Make Math Fun and Fast!</h1>
          <p className="hero-subtitle">
            Practice addition, subtraction, multiplication and division through exciting timed challenges.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Start Playing
            </button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
        <div className="hero-illustration">
          <svg viewBox="0 0 400 400" className="math-illustration">
            <circle cx="200" cy="200" r="80" fill="#FFD93D" opacity="0.3" />
            <text x="150" y="120" fontSize="60" fill="#FF6B6B" fontWeight="bold">2+2</text>
            <text x="240" y="200" fontSize="50" fill="#4ECDC4" fontWeight="bold">×</text>
            <text x="120" y="280" fontSize="55" fill="#95E1D3" fontWeight="bold">5-3</text>
            <circle cx="320" cy="150" r="30" fill="#A8E6CF" />
            <text x="305" y="165" fontSize="35" fill="#fff" fontWeight="bold">÷</text>
            <path d="M 200 320 Q 220 340 240 320 Q 220 300 200 320" fill="#FF6B6B" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="cards">
          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#FFD93D" />
                <rect x="30" y="35" width="15" height="30" rx="3" fill="#fff" />
                <rect x="55" y="35" width="15" height="30" rx="3" fill="#fff" />
              </svg>
            </div>
            <h3>Choose Your Challenge</h3>
            <p>Pick your math operation and begin.</p>
          </div>

          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#4ECDC4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#fff" strokeWidth="4" />
                <line x1="50" y1="50" x2="50" y2="25" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                <line x1="50" y1="50" x2="65" y2="40" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Beat the Clock</h3>
            <p>Answer before time runs out.</p>
          </div>

          <div className="card">
            <div className="card-icon">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="45" fill="#FF6B6B" />
                <polygon points="50,20 60,45 85,45 65,60 72,85 50,70 28,85 35,60 15,45 40,45" fill="#FFD93D" />
              </svg>
            </div>
            <h3>Climb the Leaderboard</h3>
            <p>Earn points and become the Math Champion.</p>
          </div>
        </div>
      </section>

      {/* Why ThinkForge */}
      <section className="why-section">
        <h2 className="section-title">Why ThinkForge?</h2>
        <div className="benefits">
          <div className="benefit">
            <span className="check-icon">✓</span>
            <p>Improves mental math speed</p>
          </div>
          <div className="benefit">
            <span className="check-icon">✓</span>
            <p>Encourages healthy competition</p>
          </div>
          <div className="benefit">
            <span className="check-icon">✓</span>
            <p>Builds confidence in mathematics</p>
          </div>
          <div className="benefit">
            <span className="check-icon">✓</span>
            <p>Safe and focused learning environment</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Become a Math Champion?</h2>
        <button className="btn-cta" onClick={() => navigate("/register")}>
          Start Now
        </button>
      </section>
    </div>
  );
}

export default Landing;
