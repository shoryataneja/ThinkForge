import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>ThinkForge</h1>} />
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/register" element={<h1>Register Page</h1>} />
      <Route path="/quiz" element={<h1>Quiz Page</h1>} />
      <Route path="/leaderboard" element={<h1>Leaderboard Page</h1>} />
    </Routes>
  );
}

export default App;