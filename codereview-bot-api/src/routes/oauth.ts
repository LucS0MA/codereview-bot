import axios from 'axios';
import { Router } from 'express';
// import jwt from 'jsonwebtoken';

const router = Router();
// const jwtSecret: string = process.env.JWT_SECRET!;

type GitHubOAuthParams = {
  code: string;
};

export const getGitHubUser = async ({ code }: GitHubOAuthParams) => {
  console.log("getGitHubUser starting")
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_LOGIN_CLIENT_ID,
        client_secret: process.env.GITHUB_LOGIN_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const gitHubAccessToken = response.data.access_token;

    if (!gitHubAccessToken) {
      console.log('No access token returned by GitHub');
    }

    const userReponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${gitHubAccessToken}` },
    });
    return userReponse;
  }

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  console.log({ code });
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing GitHub code' });
  }
  try {
    const gitHubTokenData = await getGitHubUser({ code });
    console.log(gitHubTokenData?.data);
    // const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
    res.redirect(`${process.env.FRONTEND_URL}/oauth/callback`);
  } catch (error) {
    res.status(500).json({ error: 'GitHub OAuth failed' });
  }
});

export default router;
