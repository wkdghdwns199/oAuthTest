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
  const { code, provider } = router.query; // query parameter���� code���� provider(� �Ҽȷα�������) ����
  
  useEffect(async () => { // ������Ʈ�� ����Ʈ �Ǹ�, �ϴ� �׼��� ��ū ��û

    if (!code || !provider) return;
    const response = await axios.post("/api/social/get-token-by-provider", {
      code,
      provider,
    });
    accessToken.current = response.data.data["access_token"]; // �鿣�� �������� ��ū �߱�
    dispatch( // �߱޹��� �׼��� ��ū���� �α��� ��û
      loginByProviderRequest({
        accessToken: accessToken.current,
        provider,
      })
    );
  }, []);

  useEffect(() => {
    // ���� �ڵ� -1020 �α����� ������, ȸ�� ���� ���� �Էµ��� ���� ���
    if (!loginError || loginError == -1020) return;
    // ��, īī�� ���� �������� �α����� �Ǿ����� ������� ȸ�� ������ ����
    // �츮�� �����ͺ��̽��� ������� ���� ��Ȳ�̹Ƿ� ���� �������� �ܷ���
    Router.replace("/");
  }, [loginError]);

  useEffect(() => { // �α��� �Ǵ� ȸ�������� �Ϸ�Ǹ�, "/"�� �����̷�Ʈ
    if (!loginDone && !registerDone) return;
    Router.replace("/");
  }, [loginDone, registerDone]);


  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch( // ȸ�������� �Է¹޾����� �׼��� ��ū���� ȸ������ ��û
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
          <h1>ȸ�� ������ �Է����ּ���.</h1>
          <form onSubmit={onSubmit}>
            <TextField
              required
              label="����� �̸�"
              value={username}
              onChange={onChangeUsername}
              variant="outlined"
              className="register-text-field"
            />
          </form>
        </RegisterByProviderFormWrapper>
      ) : ( <RegisterByProviderFormWrapper>
        <h1>...�ε���</h1>
        </RegisterByProviderFormWrapper>
      )}
    </>
  );
};

export default RegisterByProviderForm;