import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/quiz.css";

function Quiz() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const fetchQuestion = async () => {
    try {
      const response = await API.get(
        `/quiz/generate?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion(response.data.question);
      setQuestionId(response.data.questionId);
      setAnswer("");
      setFeedback(null);
    } catch (error) {
      console.error("Failed to generate question", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await API.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchUser();
  }, [type]);

  useEffect(() => {
    if (!question) return;

    setTimeLeft(10);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          fetchQuestion();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [question]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await API.post(
        "/quiz/submit",
        { questionId, selectedAnswer: answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedback({
        correct: response.data.correct,
        points: response.data.pointsAwarded || 0
      });

      setTimeout(() => {
        fetchQuestion();
        fetchUser();
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
    }
  };

  const getQuizTypeTitle = () => {
    const titles = {
      addition: "Addition Challenge",
      subtraction: "Subtraction Challenge", 
      multiplication: "Multiplication Challenge",
      division: "Division Challenge"
    };
    return titles[type] || "Math Challenge";
  };

  const getTimerColor = () => {
    if (timeLeft > 6) return "#4ECDC4";
    if (timeLeft > 3) return "#FFD93D";
    return "#FF6B6B";
  };

  const getStarIcon = () => (
    <svg viewBox="0 0 100 100" width="30" height="30">
      <polygon points="50,10 60,35 85,35 65,50 72,75 50,60 28,75 35,50 15,35 40,35" fill="#FFD93D" />
    </svg>
  );

  return (
    <div className="quiz-page">
      <div className="floating-shapes">
        <span className="shape shape-1">+</span>
        <span className="shape shape-2">×</span>
        <span className="shape shape-3">÷</span>
        <span className="shape shape-4">-</span>
        <span className="shape shape-5">7</span>
        <span className="shape shape-6">3</span>
      </div>

      <div className="quiz-container">
        {/* Header Area */}
        <div className="quiz-header">
          <div className="quiz-info">
            <h1 className="quiz-title">{getQuizTypeTitle()}</h1>
            <p className="quiz-subtitle">Solve before time runs out!</p>
          </div>
          
          <div className="header-stats">
            {user && (
              <div className="points-display">
                {getStarIcon()}
                <span>{user.points} Points</span>
              </div>
            )}
            
            <div className="timer-display" style={{ borderColor: getTimerColor() }}>
              <svg viewBox="0 0 100 100" width="50" height="50">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke={getTimerColor()} 
                  strokeWidth="8"
                  strokeDasharray={`${(timeLeft / 10) * 251.2} 251.2`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text x="50" y="58" fontSize="24" fill={getTimerColor()} fontWeight="bold" textAnchor="middle">
                  {timeLeft}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Question Arena */}
        {!question ? (
          <div className="loading-arena">
            <p>Loading your challenge...</p>
          </div>
        ) : (
          <div className="question-arena">
            <div className="question-card">
              <div className="question-text">{question}</div>
            </div>

            {/* Answer Input Section */}
            <form onSubmit={handleSubmit} className="answer-section">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your Answer"
                className="answer-input"
                disabled={isSubmitting || feedback}
                autoFocus
              />
              <button 
                type="submit" 
                className="submit-button"
                disabled={!answer.trim() || isSubmitting || feedback}
              >
                {isSubmitting ? "Checking..." : "Submit"}
              </button>
            </form>

            {/* Feedback Area */}
            {feedback && (
              <div className={`feedback-area ${feedback.correct ? 'correct' : 'incorrect'}`}>
                {feedback.correct ? (
                  <div className="feedback-content">
                    <div className="feedback-icon correct-icon">
                      <svg viewBox="0 0 100 100" width="60" height="60">
                        <circle cx="50" cy="50" r="45" fill="#4ECDC4" />
                        <path d="M25 50 L40 65 L75 30" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3>Awesome!</h3>
                    <p>+{feedback.points} points</p>
                  </div>
                ) : (
                  <div className="feedback-content">
                    <div className="feedback-icon incorrect-icon">
                      <svg viewBox="0 0 100 100" width="60" height="60">
                        <circle cx="50" cy="50" r="45" fill="#FF6B6B" />
                        <path d="M30 30 L70 70 M70 30 L30 70" stroke="white" strokeWidth="8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3>Try Again!</h3>
                    <p>Keep practicing</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Back Button */}
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Quiz;