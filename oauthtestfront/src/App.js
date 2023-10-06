import React from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import JoinPage from "./JoinPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
      </Routes>
      <div>git pull이 안됨</div>
    </div>
  );
}

export default App;
