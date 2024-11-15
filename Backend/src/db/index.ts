import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB as string);
        console.log("DB connected...");
    } catch(error) {
        console.log("DB not connected");
        process.exit(1);
    }
}