import React from "react";
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";
import styled from "styled-components";

const KakaoLoginBtn = styled.div`
  margin: 20px;
`;

const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}\
&redirect_uri=${kakaoRedirectUri}&response_type=code`;

const KakaoLoginButton = () => {
  return (
    <KakaoLoginBtn>
      <a href={loginUrl} rel="noopener noreferrer">
        <img
          src={process.env.PUBLIC_URL + "/kakaoLoginImg.png"}
          alt="kakaoLoginImg"
          width="50px"
          height="auto"
        />
      </a>
    </KakaoLoginBtn>
  );
};

export default KakaoLoginButton;
