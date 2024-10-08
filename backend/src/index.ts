import express, { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "Hello from express endpoint!" });
});

app.listen(8000, () => {
    console.log("Server running on localhost:8000");
});