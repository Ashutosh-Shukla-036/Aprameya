import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export const validateUserSchema = z.object({
    username: z.string().min(1,{ message: "Username is required"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, { message: "Password should be at least 6 characters long"})
});

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true}
});

const User = mongoose.model("user",userSchema);

export default User;