const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const generateQuestion = require("../utils/mathGenerator");
const User = require("../models/Temp"); // or User.js

const activeQuestions = new Map();

// Generate question
router.get("/generate", protect, (req, res) => {
  try {
    const { type } = req.query;

    const newQuestion = generateQuestion(type);

    // store correct answer in memory
    activeQuestions.set(newQuestion.questionId, {
      answer: newQuestion.correctAnswer,
      userId: req.user._id,
    });

    res.json({
      questionId: newQuestion.questionId,
      question: newQuestion.question,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit answer
router.post("/submit", protect, async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    const stored = activeQuestions.get(questionId);

    if (!stored || stored.userId.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Invalid question" });
    }

    const isCorrect = Number(selectedAnswer) === stored.answer;

    let pointsAwarded = 0;

  if (isCorrect) {
    pointsAwarded = 10;

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { points: pointsAwarded },
    });

    const updatedLeaderboard = await User.find()
      .sort({ points: -1 })
      .limit(10);

    const io = req.app.get("io");
    io.emit("leaderboardUpdated", updatedLeaderboard);
  }

    // remove question after submission
    activeQuestions.delete(questionId);

    res.json({
      correct: isCorrect,
      pointsAwarded,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;