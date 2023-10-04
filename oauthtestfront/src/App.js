import './App.css';
import KakaoLoginButton  from './component/login/KakaoLoginButton';

function App() {
  return (
    <div>
      <header>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" />
        <h1>WAP Toonder</h1>
      </header>
      <main>
        <p>Let's go</p>
      </main>
    </div>
  );
}

export default App;
