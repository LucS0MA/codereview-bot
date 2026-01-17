import { ModeToggle } from "@/components/mode-toggle";

function Landing() {
  const url = "http://localhost:4040/api/auth/github/callback";

  const githubLogin = `https://github.com/login/oauth/authorize?client_id=Ov23liezCvXqfEyczMly&redirect_uri=${encodeURIComponent(url)}&scope=user:email`;

  console.log("GitHub login URL:", githubLogin);

  return (
    <>
      <a
        className="flex justify-center"
        href={githubLogin}
        target="_blank"
        rel="noopener noreferrer"
      >
        LOGIN
      </a>
      <ModeToggle />
    </>
  );
}

export default Landing;
