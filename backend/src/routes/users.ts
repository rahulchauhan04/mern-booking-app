import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import wrapAsync from '../middleware/wrapAsync';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Route for user registration
router.post("/register", [
     // Validation checks
     check("firstName", "First name is required").isString(),
     check("lastName", "Last name is required").isString(),
     check("email", "Email is required").isEmail(),
     check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),
     ], wrapAsync(async (req: Request, res: Response) => {
     // Validate request
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ message: errors.array() });
     }

     // Check if user already exists
     let user = await User.findOne({ email: req.body.email });
     if (user) {
          return res.status(400).json({ message: "User already exists" });
     }

     // Create new user
     user = new User(req.body);
     await user.save();

     // Generate JWT token
     const token = jwt.sign({ userId: user._id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "90d" }
     );

     // Set cookie with token
     res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 90 * 24 * 60 * 60 * 1000,
     });
     return res.status(200).send({ message: "User registered OK" });
     } 

));

export default router;