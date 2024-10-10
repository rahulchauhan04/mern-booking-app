import mongoose from "mongoose";

export type UserType = {
     _id: string;
     email: string;
     password: string;
     firstName: string;
     lastName: string;
}

const userSchema = new mongoose.Schema({
     
})