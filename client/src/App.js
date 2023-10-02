import './App.css';
import React from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

