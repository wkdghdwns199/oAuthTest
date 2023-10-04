import React from "react";
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";

const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}\
&redirect_uri=${kakaoRedirectUri}&response_type=code`;

const KakaoLoginButton = () => {
  return (

      <a href={loginUrl} rel="noopener noreferrer">
        <h1>로그인 버튼</h1>
      </a>

  );
};

export default KakaoLoginButton;