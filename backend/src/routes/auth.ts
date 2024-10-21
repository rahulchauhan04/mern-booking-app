import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import wrapAsync from "../middleware/wrapAsync";

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
}))

export default router;