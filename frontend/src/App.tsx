import "./App.css";

function App() {
  const url = "http://localhost:4000/api/auth/github/callback";

  const githubLogin = `https://github.com/login/oauth/authorize?client_id=Ov23liezCvXqfEyczMly&redirect_uri=${encodeURIComponent(url)}&scope=user:email`;

  console.log("GitHub login URL:", githubLogin);

  return (
      <a style={{display: 'flex', justifyContent: 'center'}} href={githubLogin} target="_blank" rel="noopener noreferrer">
        LOGIN
      </a>
  );
}

export default App;
