import React, { useState } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link, Route, Routes } from "react-router-dom";
import JoinPage from "../join/JoinPage";
import KakaoLoginButton from "./KakaoLoginButton";

// styled-componets
// 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px; /* 너비 제한 추가 */
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
  text-align: center; /* 텍스트를 중앙으로 정렬합니다. */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  transition: box-shadow 0.3s ease; /* 효과를 부드럽게 적용하기 위한 트랜지션 추가 */
  overflow-y: auto; /* 스크롤이 필요한 경우 스크롤 표시 */
  min-height: 100vh; /* 컨테이너의 최소 높이를 뷰포트 높이로 설정 */
`;

// 아이디 input - 필드
export const Input = styled.input`
  font-family: "NIXGONM-Vb";
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid grey;
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
export const PasswordInput = styled(Input)`
  font-family: "NIXGONM-Vb";
  font: small-caption;
  font-size: 16px;
`;

// 로그인 버튼
export const Btn = styled.button`
  font-family: "NIXGONM-Vb";
  background-color: black;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  padding: 14px 100px;
  margin: 20px;
  display: block;
  position: relative; /* position 속성 추가 */
`;

// 회원가입, 비밀번호 초기화 - 버튼
export const BtnText = styled.button`
  cursor: pointer;
  font-family: "NIXGONM-Vb";
  font-size: 16px;
  color: black;
  background: none;
  border: none;
  margin: 5px;
`;

// line - SNS로 로그인하기
const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
  margin-top: 10px;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    max-width: 520px; /* 선의 최대 너비를 설정 (컨테이너 너비 - 간격 * 2) */
  }
`;

function LoginForm() {
  <Routes>
    <Route path="/join" element={<JoinPage />} />
  </Routes>;

  return (
    <>
      <Container>
        <Header title="로그인" />
        <div>
          <Input type="id" placeholder="이메일" />
        </div>
        <div>
          <PasswordInput type="password" placeholder="비밀번호" />
        </div>
        <Btn>로그인</Btn>
        <div>
          <Link to="/join">
            <BtnText>회원가입</BtnText>
          </Link>
        </div>
        <div>
          <Link to="/findpw">
            <BtnText>비밀번호 초기화</BtnText>
          </Link>
        </div>
        <Line>SNS로 로그인하기</Line>
        <KakaoLoginButton />
      </Container>
    </>
  );
}

export default LoginForm;
