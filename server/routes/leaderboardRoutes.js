const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/Temp"); // or User if renamed

// GET leaderboard (protected)
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ points: -1 })
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
