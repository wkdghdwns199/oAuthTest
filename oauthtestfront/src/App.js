import './App.css';

function App() {
  return (
    <div>
      <header>
        <div>test</div>
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
