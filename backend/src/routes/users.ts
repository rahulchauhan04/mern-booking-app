import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import wrapAsync from '../middleware/wrapAsync';
import { check, validationResult } from 'express-validator';


const router = express.Router();

//api/users/register
router.post("/register",[
     check("firstName", "First name is required").isString(),
     check("lastName", "Last name is required").isString(),
     check("email", "Email is required").isEmail(),
     check("password", "Password with 6 or more character is required").isLength({ min: 6, }),
     ] ,wrapAsync(async (req: Request, res: Response) => {

          const errors = validationResult(req);
          if(!errors.isEmpty()){
               return res.status(400).json({ message: errors.array() });
          }
          
          let user = await User.findOne({email: req.body.email,});

          if (user) {
          return res.status(400).json({
               message: "User already exists",
          });
          }

          user = new User(req.body);
          await user.save();

          const token = jwt.sign({ userId: user._id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "90d" }
          );

          res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 90 * 24 * 60 * 60 * 1000,
          });
          return res.sendStatus(200);
     })
);

export default router;