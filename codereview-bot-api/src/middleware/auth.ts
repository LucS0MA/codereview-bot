import jwt, {Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string,
        gitHubId: number
      }
    }
  }
}

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.access_token;
    if (!token) {
        return res.status(401).json({error: "No token provided"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
            id: string,
            gitHubId: number
        };
        req.user = decodedToken
        next();
    } catch (error) {
        res.status(403).json({error: "Invalid token"})
    }
}