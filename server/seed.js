require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Question = require("./models/Question");

const seedQuestions = async () => {
  try {
    await connectDB();

    await Question.deleteMany(); // clear old questions

    await Question.insertMany([
      {
        question: "12 + 15 = ?",
        options: ["25", "26", "27", "28"],
        correctAnswer: "27",
        difficulty: "easy",
        points: 10,
      },
      {
        question: "9 × 8 = ?",
        options: ["72", "81", "64", "70"],
        correctAnswer: "72",
        difficulty: "easy",
        points: 10,
      },
      {
        question: "25² = ?",
        options: ["625", "525", "725", "600"],
        correctAnswer: "625",
        difficulty: "medium",
        points: 20,
      }
    ]);

    console.log("yeyyeyye");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedQuestions();
