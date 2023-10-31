import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link, useNavigate } from "react-router-dom";
import { Container, Input, PasswordInput, Btn } from "../login/LoginPage";
import { hashtagOptions } from "./hashtagOptions";
import styles from "./JoinPage.module.css";
import supabase from "../main/supabase";

// styled-componets

function JoinPage() {
  useEffect(() => {
    document.title = '툰더 회원가입';
  }, []);

  const [firstName, setFirstName] = useState(""); //이름 값
  const [lastName, setLastName] = useState(""); //성씨 값
  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [pw, setPw] = useState("");
  const [passwordErrorMsg, setPwErrorMsg] = useState("");
  const [passwordConfirm, setPwConfirm] = useState("");
  const [passwordConfirmErrorMsg, setPwConfirmErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

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
    setPw(newPassword);

    if (newPassword.length === 0) {
      setPwErrorMsg("");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      setPwErrorMsg("영문, 숫자 포함해 8자 이상 입력해주세요");
    } else {
      setPwErrorMsg("");
    }
  };

  const handleCheckPw = (e) => {
    const newPasswordConfirm = e.target.value;
    setPwConfirm(newPasswordConfirm);

    if (newPasswordConfirm.length === 0) {
      setPwConfirmErrorMsg("");
    } else if (newPasswordConfirm !== pw) {
      setPwConfirmErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setPwConfirmErrorMsg("");
    }
  };
  const handleSubmit = async (e) => {
    //////////////체크박스로 입력받은 해시태그는 공백으로 단어가 분리된 문자열로 저장을 해서 데이터로 보냄
    setLoading(true);
    const hashtag = "#" + selectedHashtags.join(" #");
    axios
      .post("toonder/join", {
        mem_email: email,
        mem_name: lastName + firstName,
        mem_hashtag: hashtag,
      })
      .catch(function () {
        console.log("Error for sending user data to Spring - creating member");
      });

    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
    });

    if (error) {
      alert(error);
      setLoading(false);
    } else alert("인증 메일을 발송했습니다. 이메일 확인 후 로그인해주세요.");
    navigate("/");
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
          value={pw}
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
        
        {/* 체크박스 컨테이너 */}
        <div className={styles.CheckboxContainer}>
          {hashtagOptions.map((hashtag) => (
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                className={styles.CheckboxInput}
                value={hashtag}
                onChange={handleCheckboxChange}
              />
              {hashtag}
            </label>
          ))}
        </div>
        <div>
          <Btn style={{ marginBottom: '50px' }}>다음</Btn>
        </div>
      </Container>
    </>
  );
}

export default JoinPage;
