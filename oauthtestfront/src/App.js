import React from "react";
import "./App.css";
import LoginPage from "./component/login/LoginPage";
import JoinPage from "./component/join/JoinPage";
import FindPwPage from "./component/find/FindPwPage";
import { Routes, Route, Link } from "react-router-dom";
import LoginHandler from "./component/login/LoginHandler";
import supabase from "./component/supabase";

function App() {
  document.title = "툰더";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 중 오류가 발생했습니다.", error);
    } else {
      // 로그아웃 성공한 경우 로그아웃 메시지를 표시하거나 원하는 작업을 수행할 수 있습니다.
      console.log("로그아웃되었습니다.");
    }
  };

  return (
    <div className="App">
      <button>
        <Link to="/login">로그인</Link>
      </button>
      <button>
        <Link to="/" onClick={handleLogout}>
          로그아웃
        </Link>
      </button>
      <button>
        <Link to="/join">회원가입</Link>
      </button>
      <button>
        <Link to="/findpw">비밀번호 초기화</Link>
      </button>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/join" element={<JoinPage />}></Route>
        <Route path="/findpw" element={<FindPwPage />}></Route>
        <Route path="/user/kakao/callback" element={<LoginHandler />}></Route>
      </Routes>
    </div>
  );
}

export default App;
