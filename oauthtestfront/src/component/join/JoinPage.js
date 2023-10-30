import React, { useState } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link } from "react-router-dom";
import { Btn, Container, Input, PasswordInput } from "../login/LoginPage";

// styled-componets

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

  const handleCheckPw = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);

    if (newPasswordConfirm.length === 0) {
      setPasswordConfirmErrorMsg("");
    } else if (newPasswordConfirm !== password) {
      setPasswordConfirmErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setPasswordConfirmErrorMsg("");
    }
  };


  return (
    <>
      <Container>
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
        <PasswordInput
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />

        <div style={errorMsgStyle}>{passwordErrorMsg}</div>
        <div>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={handleCheckPw}
          />
          <div style={errorMsgStyle}>{passwordConfirmErrorMsg}</div>
        </div>
        <div>
          <Btn>다음</Btn>
        </div>
      </Container>
    </>
  );
}

export default JoinPage;
