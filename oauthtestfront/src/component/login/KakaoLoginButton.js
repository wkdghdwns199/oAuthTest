import React from "react";
import { kakaoClientId, kakaoRedirectUri } from "../../loginInfo";

const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}\
&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const KakaoLoginButton = () => {
  return (
    <div style={{ margin: '30px' }}>
      <a href={loginUrl} rel="noopener noreferrer">
        <img
          src={process.env.PUBLIC_URL + "/kakaoLoginImg.png"}
          alt="kakaoLoginImg"
          width="50px"
          height="auto"
        />
      </a>
    </div>
  );
};

export default KakaoLoginButton;
