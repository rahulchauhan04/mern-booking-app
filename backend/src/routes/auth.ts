import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import wrapAsync from "../middleware/wrapAsync";
import User from "../models/user";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", [
     check("email", "Email is required").isEmail(),
     check("password", "Password with 6 or more character required").isLength({min:6}),
     ], wrapAsync(async (req: Request, res: Response) => {
     // Login logic here

     const errors = validationResult(req);

     if(!errors.isEmpty()){
          return res.status(400).json({ message: errors.array()});
     }

     const { email, password } = req.body;

     try {
          const user = await User.findOne({ email });
          if (!user) {
               return res.status(400).json({ message: "Invalid credentials" });
          }
          const isMatch = await bcrypt.compare(password, user.password);
     } catch (error) {
          res.status(500).json({ message: "Something went wrong"})
     }
}))

export default router;