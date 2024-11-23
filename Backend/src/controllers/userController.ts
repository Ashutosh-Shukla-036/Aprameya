import { Request, Response } from "express";
import User, { validateUserSchema } from "../models/userModel"
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const SignUp = async (req: Request, res: Response) => {
    const validateData = validateUserSchema.safeParse(req.body);

    if (!validateData.success) {
        console.log(validateData.error.errors);
        res.status(400).json({ message: validateData.error.errors});
        return;
    }

    const { username, email, password } = validateData.data;

    try {
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            res.status(409).json({ message: "User with this email already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "New User created"});
        return;
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
        return;
    }
}

export const Login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "No user found with this email"});
            return;
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password"})
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY as string);
        res.status(200).json({ username: user.username, email: user.email, userId: user._id, token });
        return;
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
        return;
    }
}