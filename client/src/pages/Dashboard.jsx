import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const goToQuiz = (type) => {
    navigate(`/quiz/${type}`);
  };

  return (
    <div>
      <h2>Select Quiz Type</h2>

      <button onClick={() => goToQuiz("addition")}>
        Addition
      </button>

      <button onClick={() => goToQuiz("subtraction")}>
        Subtraction
      </button>

      <button onClick={() => goToQuiz("multiplication")}>
        Multiplication
      </button>

      <button onClick={() => goToQuiz("division")}>
        Division
      </button>
      <button onClick={() => navigate("/leaderboard")}>
    View Leaderboard
    </button>
    </div>
  );
}

export default Dashboard;