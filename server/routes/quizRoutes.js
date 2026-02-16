const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Question = require("../models/Question");

// GET all questions (protected)
router.get("/questions", protect, async (req, res) => {
  try {
    const questions = await Question.find().select("-correctAnswer");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
