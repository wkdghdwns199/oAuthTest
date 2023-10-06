import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { Link, Route, Routes } from "react-router-dom";
import JoinPage from "./JoinPage";
import KakaoLoginButton  from './component/login/KakaoLoginButton';

// styled-componets

// 아이디 input - 필드
const Input = styled.input`
  border: none;
  border-radius: 0px;
  border-bottom: 2px solid black;
  margin: 5px;
  padding: 10px;
  width: 300px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    font-family: "NIXGONM-Vb"; /* placeholder에 폰트 스타일 적용 */
  }
`;

// 비밀번호 input - 필드 (아이디 input 필드 상속)
const PasswordInput = styled(Input)`
  font: small-caption;
  font-size: 16px;
`;

// 로그인 버튼
const LoginBtn = styled.button`
  font-family: "NIXGONM-Vb";
  background-color: black;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px 50px;
  margin: 20px;
`;

// 회원가입, 비밀번호 초기화 - 버튼
const Button = styled.button`
  cursor: pointer;
  font-family: "NIXGONM-Vb";
  font-size: 16px;
  color: black;
  background: none;
  border: none;
  margin: 5px;
`;

// // 카카오 로그인 버튼
// const KakaoLoginButton = styled.img`
//   cursor: pointer;
//   margin: 30px;
// `;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  <Routes>
    <Route path="/join" element={<JoinPage />} />
  </Routes>;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
        <Header title="로그인" />
        <div>
          <Input type="id" placeholder="이메일" />
        </div>
        <div>
          <PasswordInput type="password" placeholder="비밀번호" />
        </div>
        <LoginBtn>로그인</LoginBtn>
        <div>
          <Link to="/join">
            <Button>회원가입</Button>
          </Link>
        </div>
        <div>
          <Button>비밀번호 초기화</Button>
        </div>
        <KakaoLoginButton/>
    </>
  );
}

export default LoginForm;
