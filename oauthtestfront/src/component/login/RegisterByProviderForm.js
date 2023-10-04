import React, { useCallback, useEffect, useRef } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import {
  clearRegisterState,
  registerFailure,
  registerByProviderRequest,
  loginByProviderRequest,
} from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";
import axios from "axios";
import styled from "styled-components";



const RegisterByProviderForm = () => {
  const dispatch = useDispatch();
  const accessToken = useRef(null);
  const router = useRouter();
  const {
    registerDone,
    registerError,
    registerLoading,
    loginError,
    loginDone,
  } = useSelector((state) => state.user);
  const { code, provider } = router.query; // query parameter에서 code값과 provider(어떤 소셜로그인인지) 추출
  
  useEffect(async () => { // 컴포넌트가 마운트 되면, 일단 액세스 토큰 요청

    if (!code || !provider) return;
    const response = await axios.post("/api/social/get-token-by-provider", {
      code,
      provider,
    });
    accessToken.current = response.data.data["access_token"]; // 백엔드 서버에서 토큰 발급
    dispatch( // 발급받은 액세스 토큰으로 로그인 요청
      loginByProviderRequest({
        accessToken: accessToken.current,
        provider,
      })
    );
  }, []);

  useEffect(() => {
    // 에러 코드 -1020 로그인은 됐지만, 회원 정보 아직 입력되지 않은 경우
    if (!loginError || loginError == -1020) return;
    // 즉, 카카오 인증 서버에서 로그인은 되었지만 사용자의 회원 정보가 아직
    // 우리의 데이터베이스에 저장되지 않은 상황이므로 현재 페이지에 잔류함
    Router.replace("/");
  }, [loginError]);

  useEffect(() => { // 로그인 또는 회원가입이 완료되면, "/"로 리다이렉트
    if (!loginDone && !registerDone) return;
    Router.replace("/");
  }, [loginDone, registerDone]);


  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch( // 회원정보를 입력받았으면 액세스 토큰으로 회원가입 요청
        registerByProviderRequest({
          accessToken: accessToken.current,
          provider,
          username,
          nickname,
        })
      );
    },
    [username, nickname]
  );

  return (
    <>
      {loginError ? (
        <RegisterByProviderFormWrapper>
          <h1>회원 정보를 입력해주세요.</h1>
          <form onSubmit={onSubmit}>
            <TextField
              required
              label="사용자 이름"
              value={username}
              onChange={onChangeUsername}
              variant="outlined"
              className="register-text-field"
            />
          </form>
        </RegisterByProviderFormWrapper>
      ) : ( <RegisterByProviderFormWrapper>
        <h1>...로딩중</h1>
        </RegisterByProviderFormWrapper>
      )}
    </>
  );
};

export default RegisterByProviderForm;