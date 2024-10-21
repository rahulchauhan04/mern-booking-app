import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import wrapAsync from "../middleware/wrapAsync";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ensure JWT_SECRET_KEY is defined in environment variables
if (!process.env.JWT_SECRET_KEY) {
     throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

const router = express.Router();

// Route for user login
router.post("/login", [
      // Validate email and password
      check("email", "Email is required").isEmail(),
      check("password", "Password with 6 or more character required").isLength({min:6}),
      ], wrapAsync(async (req: Request, res: Response) => {
      // Login logic here

      // Check for validation errors
      const errors = validationResult(req);
      if(!errors.isEmpty()){
            return res.status(400).json({ message: errors.array()});
      }

      const { email, password } = req.body;

      try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({ message: "Invalid Credentials" });
            }

            // Compare provided password with stored password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ message: "Invalid Credentials"})
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.id },
                  process.env.JWT_SECRET_KEY as string,
                  {
                         expiresIn: "90d",
                  }
            )

            // Set token in HTTP-only cookie
            res.cookie("auth_token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
            })

            // Respond with user ID
            res.status(200).json({ userId: user._id });
      } catch (error) {
            // Handle server errors
            res.status(500).json({ message: "Something went wrong"})
      }
}))

export default router;