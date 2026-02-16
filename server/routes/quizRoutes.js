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

    const isCorrect = question.correctAnswer === selectedAnswer;

    let pointsAwarded = 0;

    if (isCorrect) {
      pointsAwarded = question.points;

      await User.findByIdAndUpdate(req.user._id, {
        $inc: { points: pointsAwarded },
      });
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
