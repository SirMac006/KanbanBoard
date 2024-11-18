import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { authenticateToken } from '../../src/middleware/auth.js'; // Ensure the correct path


//interface UserRequestBody { username?: string; password?:string; }

export const login = async(req:Request, res:Response) => {

  //try {
    console.log("Req", req.body);
    const { username, password } =req.body;
    // const username = req.body?.username || '';
    // const password = req.body?.password || '';
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const secret = process.env.JWT_SECRET || "RandomString";

    const token = jwt.sign({ userId: user.id },secret, { expiresIn: '1h' });
    return res.json({ token });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: 'Internal server error' });
  // }
}
const router = Router();
router.post('/login', login);

// // Protect these routes
// router.get('/users', authenticateToken, async (_req: Request, res: Response) => {
//   try {
//     const users = await User.findAll({ attributes: { exclude: ['password'] } });
//     res.json(users);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/users/:id', authenticateToken, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
//     if (user) res.json(user);
//     else res.status(404).json({ message: 'User not found' });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Other routes...
// router.post('/users', authenticateToken, async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   try {
//     const newUser = await User.create({ username, password });
//     res.status(201).json(newUser);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // PUT and DELETE routes also protected
// router.put('/users/:id', authenticateToken, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { username, password } = req.body;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       user.username = username;
//       user.password = password;
//       await user.save();
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.delete('/users/:id', authenticateToken, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.json({ message: 'User deleted' });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
