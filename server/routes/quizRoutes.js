const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const Question = require("../models/Question");
const User = require("../models/Temp"); // or "../models/User"

// GET all questions (protected)
router.get("/questions", protect, async (req, res) => {
  try {
    const questions = await Question.find().select("-correctAnswer");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit answer (protected)
router.post("/submit", protect, async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || !selectedAnswer) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const user = await User.findById(req.user._id);

    // 🚫 Check if already completed
    if (user.completedQuestions.includes(questionId)) {
      return res.status(400).json({
        message: "Question already completed",
        correct: question.correctAnswer === selectedAnswer,
        pointsAwarded: 0
      });
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    let pointsAwarded = 0;

    if (isCorrect) {
      pointsAwarded = question.points;

      user.points += pointsAwarded;
      user.completedQuestions.push(questionId);

      await user.save();
    }

    res.json({
      correct: isCorrect,
      pointsAwarded,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
