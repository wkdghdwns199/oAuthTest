import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import JoinPage from "../join/JoinPage";
import KakaoLoginButton from "./KakaoLoginButton";
import supabase from "../supabase";

// styled-componets
// 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px; /* 너비 제한 추가 */
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
  text-align: center; /* 텍스트를 중앙으로 정렬합니다. */
  align-items: center; /* 수정: 수직 가운데 정렬을 위해 필요 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  transition: box-shadow 0.3s ease; /* 효과를 부드럽게 적용하기 위한 트랜지션 추가 */
  overflow-y: auto; /* 스크롤이 필요한 경우 스크롤 표시 */
  min-height: 100vh; /* 컨테이너의 최소 높이를 뷰포트 높이로 설정 */
`;

// 아이디 input - 필드
export const Input = styled.input`
  background-color: #121212;
  font-family: "NIXGONM-Vb";
  color: #efefef;
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
    color: #bfbfbf;
  }
`;

// 비밀번호 input - 필드 (아이디 input 필드 상속)
export const PwInput = styled(Input)`
  font-family: "NIXGONM-Vb";
  font: small-caption;
  font-size: 16px;
`;

// 로그인 버튼
export const Btn = styled.button`
  font-family: "NIXGONM-Vb";
  background-color: #6e6e6e;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  padding: 14px 100px;
  margin: 20px;
  display: center;
  position: relative; /* position 속성 추가 */
  transition: box-shadow 0.3s ease; /* 효과를 부드럽게 적용하기 위한 트랜지션 추가 */

  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); /* 마우스 오버시 그림자 효과 추가 */
  }
`;

// 텍스트로 된 버튼
export const BtnText = styled.button`
  cursor: pointer;
  font-family: "NIXGONM-Vb";
  font-size: 16px;
  color: #efefef;
  background: none;
  border: none;
  margin: 5px;
`;

// line - SNS로 로그인하기
const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #efefef;
  font-size: 14px;
  margin-top: 20px;

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

const ErrorMsg = styled.div`
  font-size: 12px;
  color: #cf6679;
`;

function LoginForm() {
  const [email, setEmail] = useState(""); //이메일 값
  const [pw, setPw] = useState(""); //비밀번호 값
  const [isEmailConfirm, setEmailConfirm] = useState(false); //이메일 유효성
  const [isPwConfirm, setPwConfirm] = useState(false); //비밀번호 유효성
  const [notAllow, setNotAllow] = useState(true); //로그인 (submit)버튼 활성화 여부
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState(""); // 로그인 에러 메시지

  useEffect(() => {
    // 이미 로그인된 상태인지 확인
    const checkLoggedIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session !== null) {
        // 이미 로그인된 상태라면 로그아웃하고 메인 페이지로 이동
        alert("이미 로그인되어 있습니다.");
        navigate("/"); // 메인 페이지로 이동
      }
    };

    checkLoggedIn();
  }, []);

  const onClickConfirm = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pw,
      });

      if (error) {
        setLoginErrorMsg("이메일 또는 비밀번호를 정확하게 입력해주세요");
        // alert("로그인 실패");
        console.log(error);
      } else if (data) {
        alert("로그인 되었습니다");
        sessionStorage.setItem("loggedUserEmail", email); // 로그인 하면 sessionStorage에 email이 저장됨
        navigate("/"); // 로그인 성공 시 대시보드 페이지로 이동
      }
    } catch (error) {
      //setLoginValidErrorMsg("잘못 입력했습니다.");
      alert("로그인 실패");
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    //이메일 유효성과 비밀번호 유효성이 바꼈을때 둘다 유효한 경우만 login버튼 활성화 해주는 기능

    if (isEmailConfirm && isPwConfirm) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isEmailConfirm, isPwConfirm]);

  const handleEmail = (e) => {
    //이메일 값을 value에 state
    const newEmail = e.target.value;
    setEmail(newEmail);

    setEmailConfirm(true);
  };

  const handlePW = (e) => {
    const newPw = e.target.value;
    setPw(newPw);
    setPwConfirm(true);
  };

  <Routes>
    <Route path="/join" element={<JoinPage />} />
  </Routes>;

  return (
    <>
      <Container>
        <Header title="로그인" />
        <form>
        <Input
          type="id"
          value={email}
          onChange={handleEmail}
          placeholder="이메일"
        />

        <PwInput
          type="password"
          value={pw}
          onChange={handlePW}
          placeholder="비밀번호"
        />
        <ErrorMsg>{loginErrorMsg}</ErrorMsg>
        
          <Btn onClick={onClickConfirm} disabled={notAllow} type="submit">
            로그인
          </Btn>
        </form>
        <Link to="/join">
          <BtnText>회원가입</BtnText>
        </Link>
        <Link to="/findpw">
          <BtnText>비밀번호 초기화</BtnText>
        </Link>
        <Line>SNS로 로그인하기</Line>
        <KakaoLoginButton />
      </Container>
    </>
  );
}

export default LoginForm;
