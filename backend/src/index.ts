import express, { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => console.log("Connected to MongoDB"));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);

app.listen(8000, () => {
    console.log("Server running on localhost:8000");
});