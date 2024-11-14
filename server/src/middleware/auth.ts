import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the interface for the JWT payload
interface JwtPayload {
  username: string;
}

// Get the JWT secret key from environment variables
const jwtSecret = process.env.JWT_SECRET as string;

// Middleware to authenticate token in TypeScript
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // Attach the user to the request object (casting to any to avoid TypeScript errors)
    (req as any).user = user as JwtPayload;
    next();
  });
};
