import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>ThinkForge</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/quiz/:type"
  element={
    <PrivateRoute>
      <Quiz />
    </PrivateRoute>
  }
/>

<Route
  path="/leaderboard"
  element={
    <PrivateRoute>
      <Leaderboard />
    </PrivateRoute>
  }
/>

<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
    </Routes>    
  );
}

export default App;