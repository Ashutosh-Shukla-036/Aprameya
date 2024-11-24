import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAtom } from "../Atoms/UserAtom" // Adjust the path as per your project structure
import { useRecoilState } from "recoil";

export const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useRecoilState(UserAtom); // Access userAtom state

    // Toggle the menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle logout logic
    const handleLogout = () => {
        localStorage.removeItem('username'); // Remove username
        localStorage.removeItem('token');
        setUser(null); // Assuming null represents a logged-out user
        console.log("User logged out");
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-teal-400 transition duration-300 hover:from-teal-400 hover:to-yellow-400">
                        Aprameya Productions
                    </span>
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>

                {/* Navigation Links */}
                <ul
                    className={`md:flex md:space-x-8 text-lg absolute md:static bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 w-full md:w-auto left-0 md:left-auto transition-all duration-300 ${
                        isOpen ? "top-16" : "-top-full"
                    } md:top-auto py-4 md:py-0`}
                >
                    <li>
                        <Link
                            to="/"
                            className="block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/films"
                            className="block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Films
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0"
                            onClick={() => setIsOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0"
                            onClick={() => setIsOpen(false)}
                        >
                            Message Us
                        </Link>
                    </li>
                    {/* Logout Button for Logged-In Users */}
                    {user && (
                        <li>
                            <button
                                className="block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0"
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
