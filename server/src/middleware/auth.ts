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
    res.status(401).json({ message: 'Access Denied: No Token Provided' });
    return; // Ensure the function returns void
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid Token' });
      return; // Ensure the function returns void
    }

    // Attach the user to the request object (casting to any to avoid TypeScript errors)
    (req as any).user = user as JwtPayload;
    next(); // Call the next middleware or route handler
  });
};
