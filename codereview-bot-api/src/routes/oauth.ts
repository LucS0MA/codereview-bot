import axios from 'axios';
import { Router } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = Router();
const jwtSecret: string = process.env.JWT_SECRET!;

type GitHubOAuthParams = {
  code: string;
};

interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
  avatar_url: string;
}

export const getGitHubUser = async ({ code }: GitHubOAuthParams) => {
  console.log('getGitHubUser starting');
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

  const userReponse = await axios.get<GitHubUser>(
    'https://api.github.com/user',
    {
      headers: { Authorization: `Bearer ${gitHubAccessToken}` },
    },
  );
  return {
    user: userReponse.data,
    token: gitHubAccessToken,
  };
};

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  console.log({ code });
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing GitHub code' });
  }
  try {
    const { user: gitHubUser, token: gitHubToken } = await getGitHubUser({
      code,
    });
    console.log(gitHubToken, gitHubUser);

    const user = await prisma.user.upsert({
      where: { githubId: gitHubUser.id },
      update: {
        username: gitHubUser.login,
        email: gitHubUser.email,
        avatarUrl: gitHubUser.avatar_url,
        githubToken: gitHubToken,
      },
      create: {
        githubId: gitHubUser.id,
        username: gitHubUser.login,
        email: gitHubUser.email,
        avatarUrl: gitHubUser.avatar_url,
        githubToken: gitHubToken,
      },
    });
    const appToken = jwt.sign(
      { id: user.id, gitHubId: user.githubId },
      jwtSecret as Secret,
      { expiresIn: '1h' },
    );
    res.cookie('access_token', appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: `User ${user.username} connected` });
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    res.status(500).json({ error: 'GitHub OAuth failed' });
  }
});

export default router;
