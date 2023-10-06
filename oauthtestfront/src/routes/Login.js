const SocialKakao = ()=>
{
    const Rest_api_key="7131f96e6a101da05715ca810389b29b" //REST API KEY
    const redirect_uri = "http://localhost:3000/user/kakao/callback" //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return(
    <>
    <button onClick={handleLogin}>카카오 로그인</button>
    </>
    )
}
export default SocialKakao