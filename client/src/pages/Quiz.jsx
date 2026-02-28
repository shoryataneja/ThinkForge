import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Quiz() {
  const { type } = useParams();

  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);

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
    } catch (error) {
      alert("Failed to generate question");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [type]);

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

      fetchQuestion(); // generate new question automatically

    } catch (error) {
      alert(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div>
      <h2>{type.toUpperCase()} Quiz</h2>

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