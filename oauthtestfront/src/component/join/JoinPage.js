import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link } from "react-router-dom";
import { Btn, Container, Input, PasswordInput } from "../login/LoginPage";

// styled-componets
const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 160px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: start;
  top: 455px;
  border-radius: 10px;
  background-color: #bfbfbf;
  color: black;

  /* 스크롤 스타일 적용 */
  /* 스크롤바 가로 사이즈 */
  ::-webkit-scrollbar {
    width: 20px;
  }

  /* 스크롤바 막대기 */
  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #555;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #f54;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #f00;
  }

  /* 스크롤바 백그라운드 */
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #eee;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
  margin-left: 35px;
  border: none; /* 테두리 제거 */
  appearance: none; /* 기본 체크 박스 스타일 제거 */
  width: 16px; /* 체크 박스 크기 설정 */
  height: 16px; /* 체크 박스 크기 설정 */
  background-color: white; /* 배경색 설정 */
  border: 1px solid #ccc; /* 체크 박스 외곽선 스타일 설정 */
  border-radius: 3px; /* 체크 박스 외곽선 둥글게 만들기 */
  transition: all 0.3s ease; /* 체크 박스 변경 효과 부드럽게 적용 */

  &:checked {
    background-color: white; /* 체크된 상태에서 배경색을 검은색으로 변경 */
    border-color: white; /* 체크된 상태에서 외곽선 색상 변경 */
  }

  &:checked::before {
    content: "✔"; /* 체크 모양 추가 */
    display: block;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    color: black; /* 체크 모양 색상 설정 */
  }
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
  const [firstName, setFirstName] = useState(""); //이름 값
  const [lastName, setLastName] = useState(""); //성씨 값
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  // useEffect(() => {
  //   if (
  //     isValidEmail &&
  //     isPwCheck &&
  //     isPwValid &&
  //     firstName.length > 0 &&
  //     lastName.length > 0 &&
  //     selectedHashtags.length > 0
  //   )
  //     setNotAllow(false);
  //   else setNotAllow(true);
  //   return;
  // }, [
  //   isValidEmail,
  //   isPwValid,
  //   isPwCheck,
  //   firstName,
  //   lastName,
  //   selectedHashtags,
  // ]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHashtags((prevSelectedHashtags) => [
        ...prevSelectedHashtags,
        value,
      ]);
    } else {
      setSelectedHashtags((prevSelectedHashtags) =>
        prevSelectedHashtags.filter((hashtag) => hashtag !== value)
      );
    }
  };

  const hashtagOptions = [
    "공포",
    "드라마",
    "코믹",
    "일상",
    "판타지",
    "액션",
    "역사",
    "학원",
    "SF",
    "학습만화",
    "캠페인",
    "스포츠",
    "동성애",
    "추리",
    "모험",
    "무협",
    "시사",
    "교양",
    "요리",
    "성인",
    "순정",
    "BL",
    "소년",
    "미스터리",
    "GL",
    "로맨스판타지",
    "카툰",
    "기관발행물",
    "만화이론",
    "로맨스",
    "그래픽노블",
    "개그",
  ];

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

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
          <Input
            type="text"
            onChange={handleLastName}
            id="lastName"
            placeholder="성"
          />
        </div>
        <div>
          <Input
            type="text"
            onChange={handleFirstName}
            id="firstName"
            placeholder="이름"
          />
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
        <div style={{ marginTop: "30px", marginBottom: "20px" }}>
          좋아하는 만화 장르를 1개 이상 선택하세요
        </div>
        <CheckboxContainer>
          {hashtagOptions.map((hashtag) => (
            <CheckboxLabel key={hashtag}>
              <CheckboxInput
                type="checkbox"
                value={hashtag}
                onChange={handleCheckboxChange}
              />
              {hashtag}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
        <div>
          <Btn>다음</Btn>
        </div>
      </Container>
    </>
  );
}

export default JoinPage;
