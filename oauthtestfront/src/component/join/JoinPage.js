import React, { useState } from "react";
import styled from "styled-components";
import Header from "../background/Header";

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

function JoinPage() {
  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 이메일, 비밀번호 입력시 에러메시지 style
  const errorMsgStyle = {
    fontSize: "12px",
    color: "red",
  };

  // 이메일 입력시 에러메시지 출력 함수
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.length === 0) {
      setEmailErrorMsg("");
    } else if (!isValidEmail(newEmail)) {
      setEmailErrorMsg("올바른 이메일을 입력해주세요");
    } else {
      setEmailErrorMsg("");
    }
  };

  // 이메일 유효성 검사
  const isValidEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(value);
  };

  // 비밀번호 입력시 에러메시지 출력 함수
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setPasswordErrorMsg("");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      setPasswordErrorMsg("영문, 숫자 포함해 8자 이상 입력해주세요");
    } else {
      setPasswordErrorMsg("");
    }
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
  
    if (newPasswordConfirm.length === 0) {
      setPasswordConfirmErrorMsg("");
    }
    else if (newPasswordConfirm !== password) {
      setPasswordConfirmErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setPasswordConfirmErrorMsg("");
    }
  };

  // 현재 비밀번호 보이기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header title="회원가입" />
      <div>
        <Input type="text" placeholder="성" />
      </div>
      <div>
        <Input type="text" placeholder="이름" />
      </div>
      <div>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
        />
        <div style={errorMsgStyle}>{emailErrorMsg}</div>
      </div>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호"
        value={password}
        onChange={handlePasswordChange}
      />
      <div style={errorMsgStyle}>{emailErrorMsg}</div>

      {/* 입력중인 비밀번호 숨기기&보이기 기능
      <button onClick={togglePasswordVisibility}>
        {showPassword ? "숨기기" : "보이기"}
      </button>
      */}
      <div style={errorMsgStyle}>{passwordErrorMsg}</div>
      <div>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        <div style={errorMsgStyle}>{passwordConfirmErrorMsg}</div>
      </div>
      <LoginBtn>다음</LoginBtn>
    </>
  );
}

export default JoinPage;
