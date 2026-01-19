import { Router } from 'express';
import { authToken } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import axios from 'axios';

const router = Router();

router.get('/me', authToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        githubId: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the userData' });
  }
});

export const getGitHubRepos = async (gitHubAccessToken: string) => {
  try {
    const reposReponse = await axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${gitHubAccessToken}` },
    });
    return reposReponse.data;
  } catch (error) {
    console.log(error);
  }
};

router.get('/repos', authToken, async (req, res) => {
  try {
    const accessToken = await prisma.user.findUnique({
      where: {id: req.user?.id},
      select: {
        githubToken: true,
      }
    });
    if (!accessToken) {
      return res.status(404).json({error: "Access_token not found"})
    }
    const repositories = await getGitHubRepos(accessToken.githubToken);
    console.log(repositories)
    res.json(repositories)
  } catch(error) {
    res.status(500).json({error: 'Failed to fetch the user repositories'})
  }
})

export default router;
