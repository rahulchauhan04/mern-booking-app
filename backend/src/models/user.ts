import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the UserType type
export type UserType = {
     _id: string;
     email: string;
     password: string;
     firstName: string;
     lastName: string;
}

// Create a new mongoose schema for the User model
const userSchema = new mongoose.Schema({
     email: { type: String, required: true, unique: true }, 
     password: { type: String, required: true }, 
     firstName: { type: String, required: true },
     lastName: { type: String, required: true }, 
})

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function(next){
     if(this.isModified("password")){ 
          this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
     }
     next(); 
})


const User = mongoose.model<UserType>("User", userSchema);

export default User; 