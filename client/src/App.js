import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Main2 from "./pages/main2";
import Main from "./pages/Main";
import VisualizationPage from "./pages/VisualizationPage";
import TutorialPage from "./pages/TutorialPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/visual" element={<VisualizationPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
