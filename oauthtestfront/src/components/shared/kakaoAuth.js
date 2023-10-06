const CLIENT_ID = "7131f96e6a101da05715ca810389b29b";
const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?clinet_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

