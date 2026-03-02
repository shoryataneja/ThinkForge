import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Quiz() {
  const { type } = useParams();

  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

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
    } catch  {
      alert("Failed to generate question");
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
  } catch {
    console.log("Failed to fetch user");
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
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [question]);

useEffect(() => {
  if (timeLeft === 0) {
    fetchQuestion();
  }
}, [timeLeft]);

  const handleAnswer = async (selectedAnswer) => {
    try {
      const response = await API.post(
        "/quiz/submit",
        { questionId, selectedAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.correct
          ? `Correct! +${response.data.pointsAwarded} points`
          : "Wrong answer"
      );

      fetchQuestion(); 
      fetchUser();
      setTimeLeft(10);

    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div>
      <h2>{type.toUpperCase()} Quiz</h2>
      <p>⏱ Time Left: {timeLeft}s</p>
      {user && (
  <div>
    <p>Welcome, {user.name}</p>
    <p>⭐ Points: {user.points}</p>
  </div>
)}

      {!question ? (
        <p>Loading question...</p>
      ) : (
        <div>
          <h3>{question}</h3>

          <input
            type="number"
            placeholder="Your Answer"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAnswer(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Quiz;