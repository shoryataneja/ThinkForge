import { useEffect, useState } from "react";
import API from "../services/api";

function Quiz() {
  const [questions, setQuestions] = useState([]);

  // 👇 ADD handleAnswer HERE (inside component)
  const handleAnswer = async (questionId, selectedAnswer) => {
    try {
      const token = localStorage.getItem("token");

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

    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/quiz/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuestions(response.data);
      } catch  {
        alert("Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Quiz</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((q) => (
          <div key={q._id}>
            <h4>{q.question}</h4>

            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(q._id, option)}
              >
                {option}
              </button>
            ))}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Quiz;