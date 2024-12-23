import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../Atoms/UserAtom";
import Alert from "@mui/material/Alert";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(UserAtom);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);
        setSuccessMessage("");
        try {
            const response = await axios.post("https://aprameya.onrender.com/api/user/login", {
                email,
                password,
            });
            if (response?.data?.userId) {
                setSuccessMessage("Logged in successfully.");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                localStorage.setItem("token", response?.data?.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: response?.data?.username,
                        email: response?.data?.email,
                        userId: response?.data?.userId,
                    })
                );
                setUser({
                    username: response?.data?.username,
                    email: response?.data?.email,
                    userId: response?.data?.userId,
                });
            } else {
                setError(response?.data?.message || "Login failed.");
            }
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || "An error occurred during login.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-gradient-to-br from-orange-300 via-orange-500 to-yellow-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-8 mt-10 mb-10 rounded-xl max-w-md mx-auto shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            <h2 className="text-4xl font-extrabold mb-6 text-center text-white">
                Login to Your Account
            </h2>

            {error && (
                <Alert severity="error" className="mb-4">
                    {error}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" className="mb-4">
                    {successMessage}
                </Alert>
            )}

            {/* Email Field */}
            <div className="mb-6 relative">
                <label className="block text-white font-medium mb-2">
                    Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiOutlineMail className="text-white/80 h-6 w-6" />
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 pl-12 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80 shadow-md dark:bg-gray-900 dark:border-gray-700 dark:focus:ring-orange-600 dark:text-white"
                        placeholder="Enter your email"
                        required
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
                <label className="block text-white font-medium mb-2">
                    Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiOutlineLockClosed className="text-white/80 h-6 w-6" />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 pl-12 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80 shadow-md dark:bg-gray-900 dark:border-gray-700 dark:focus:ring-orange-600 dark:text-white"
                        placeholder="Enter your password"
                        required
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    >
                        {showPassword ? (
                            <AiFillEye className="text-white/80 h-6 w-6" />
                        ) : (
                            <AiFillEyeInvisible className="text-white/80 h-6 w-6" />
                        )}
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-bold shadow-md transition-transform transform ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:scale-105 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600"
                }`}
            >
                {isLoading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center mt-4 text-white text-sm">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-yellow-200 underline hover:text-yellow-300"
                >
                    Sign up here
                </Link>
            </p>
        </form>
    );
};

export default Login;
