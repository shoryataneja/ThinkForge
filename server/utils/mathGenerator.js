const { v4: uuidv4 } = require("uuid");

function generateQuestion(type) {
  let num1, num2, question, correctAnswer;

  switch (type) {
    case "addition":
      num1 = random(1, 20);
      num2 = random(1, 20);
      question = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;

    case "subtraction":
      num1 = random(1, 20);
      num2 = random(1, num1); // prevent negative
      question = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;

    case "multiplication":
      num1 = random(1, 10);
      num2 = random(1, 10);
      question = `${num1} × ${num2}`;
      correctAnswer = num1 * num2;
      break;

    case "division":
      num2 = random(1, 10);
      correctAnswer = random(1, 10);
      num1 = num2 * correctAnswer; // ensures clean division
      question = `${num1} ÷ ${num2}`;
      break;

    default:
      throw new Error("Invalid quiz type");
  }

  return {
    questionId: uuidv4(),
    question,
    correctAnswer,
  };
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateQuestion;