import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link, useNavigate } from "react-router-dom";
import { Container, Input, PwInput, Btn } from "../login/LoginPage";
import { hashtagOptions } from "./hashtagOptions";
import styles from "./JoinPage.module.css";
import supabase from "../supabase";
import axios from "axios";
// import { IconName } from "react-icons/fa";

function JoinPage() {
  const [firstName, setFirstName] = useState(""); // 이름 값
  const [lastName, setLastName] = useState(""); // 성씨 값
  const [email, setEmail] = useState(""); // 이메일 값
  const [isEmailValid, setEmailValid] = useState(false); // 이메일 유효성 여부
  const [emailErrorMsg, setEmailErrorMsg] = useState(""); // 이메일 유효성 에러 메시지 내용
  const [pw, setPw] = useState(""); // 비밀번호 값
  const [pwc, setPwc] = useState(""); //비밀번호 확인 값
  const [isPwValid, setIsPwValid] = useState(false); // 비밀번호 유효성 여부
  const [isPwCheck, setIsPwCheck] = useState(false); // 비밀번호 확인 여부
  const [pwErrorMsg, setPwErrorMsg] = useState(""); // 비밀번호 유효성 에러 메시지 내용
  const [pwCheckErrorMsg, setPwCheckErrorMsg] = useState(""); // 비밀번호 확인 에러 메시지 내용
  const [notAllow, setNotAllow] = useState(true); // 회원가입 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      isEmailValid &&
      isPwCheck &&
      isPwValid &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      selectedHashtags.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [
    isEmailValid,
    isPwValid,
    isPwCheck,
    firstName,
    lastName,
    selectedHashtags,
  ]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(e.target.value);

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (newEmail.length === 0) {
      setEmailValid(false);
      setEmailErrorMsg("");
    } else if (!regex.test(newEmail)) {
      setEmailValid(false);
      setEmailErrorMsg("올바른 이메일을 입력해주세요");
    } else {
      setEmailValid(true);
      setEmailErrorMsg("");
    }
  };

  // 비밀번호 유효성 검사
  const handlePw = (e) => {
    const newPw = e.target.value;
    setPw(newPw);

    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (newPw.length === 0) {
      setIsPwValid(false);
      setPwErrorMsg("");
    } else if (!regex.test(newPw)) {
      setIsPwValid(false);
      setPwErrorMsg("영문, 숫자 포함해 8자 이상 입력해주세요");
    } else {
      setIsPwValid(true);
      setPwErrorMsg("");
    }
  };

  // 비밀번호 확인 검사
  const handleCheckPw = (e) => {
    const newPwc = e.target.value;
    setPwc(newPwc);

    if (newPwc.length === 0) {
      setIsPwCheck(false);
      setPwCheckErrorMsg("");
    } else if (newPwc !== pw) {
      setIsPwCheck(false);
      setPwCheckErrorMsg("비밀번호가 일치하지 않습니다");
    } else {
      setIsPwCheck(true);
      setPwCheckErrorMsg("");
    }
  };

  //
  const handleCheckbox = (event) => {
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

  // 회원가입 버튼 submit
  const handleSubmit = async (e) => {
    //////////////체크박스로 입력받은 해시태그는 공백으로 단어가 분리된 문자열로 저장을 해서 데이터로 보냄
    // setLoading(true);
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
      // setLoading(false);
    } else alert("인증 메일을 발송했습니다. 이메일 확인 후 로그인해주세요.");
    navigate("/");
  };

  return (
    <>
      <Container>
        <Header title="회원가입" />
        <Input
          type="text"
          onChange={handleLastName}
          id="lastName"
          placeholder="성"
        />
        <Input
          type="text"
          onChange={handleFirstName}
          id="firstName"
          placeholder="이름"
        />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmail}
        />
        <div className={styles.errorMsgStyle}>{emailErrorMsg}</div>
        <PwInput
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePw}
        />
        <div className={styles.errorMsgStyle}>{pwErrorMsg}</div>
        <PwInput
          type="password"
          placeholder="비밀번호 확인"
          value={pwc}
          onChange={handleCheckPw}
        />
        <div className={styles.errorMsgStyle}>{pwCheckErrorMsg}</div>
        <div
          style={{ color: "#efefef", marginTop: "30px", marginBottom: "20px" }}
        >
          좋아하는 웹툰 장르를 1개 이상 선택하세요
        </div>

        {/* 체크박스 컨테이너 */}
        <div className={styles.CheckboxContainer}>
          {hashtagOptions.map((hashtag) => (
            <label className={styles.CheckboxLabel}>
              <input
                type="checkbox"
                className={styles.CheckboxInput}
                value={hashtag}
                onChange={handleCheckbox}
              />
              {hashtag}
            </label>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <Btn
              style={{ marginBottom: "50px" }}
              type="submit"
              disabled={notAllow}
            >
              가입하기
            </Btn>
          </div>
        </form>
      </Container>
    </>
  );
}

export default JoinPage;
