import React from "react";
import "./App.css";
import LoginPage from "./component/login/LoginPage";
import JoinPage from "./component/join/JoinPage";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./component/background/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
