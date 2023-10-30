import React from "react";
import "./App.css";
import LoginPage from "./component/login/LoginPage";
import JoinPage from "./component/join/JoinPage";
import FindPw from "./component/find/FindPw";
import { Routes, Route, Link } from "react-router-dom";
import LoginHandler from "./component/login/LoginHandler";

function App() {
  return (
    <div className="App">
      <button>
      <Link to="/login">로그인화면</Link></button>
      <button>
      <Link to="/join">회원가입화면</Link></button>
      <button>
      <Link to="/findpw">비밀번호 초기화</Link></button>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
        <Route path="/findpw" element={<FindPw />}></Route>
        <Route path="/user/kakao/callback" element={<LoginHandler />}></Route>
      </Routes>
    </div>
  );
}

export default App;
