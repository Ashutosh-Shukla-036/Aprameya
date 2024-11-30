import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAtom } from "../Atoms/UserAtom"; 
import { useRecoilValue } from "recoil";
import AccountMenu from "./AccountMenu";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(UserAtom); // Get user data from Recoil state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyle = "block text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0";

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-teal-400 transition duration-300 hover:from-teal-400 hover:to-yellow-400">
            Aprameya Productions
          </span>
        </Link>

        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
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

        <ul
          className={`md:flex md:space-x-8 text-lg absolute md:static bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 w-full md:w-auto left-0 md:left-auto transition-all duration-300 ${isOpen ? "top-16" : "-top-full"} md:top-auto py-4 md:py-0 justify-end`}
        >
          <li>
            <Link to="/" className={navLinkStyle} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/films" className={navLinkStyle} onClick={() => setIsOpen(false)}>
              Films
            </Link>
          </li>
          <li>
            <Link to="/about" className={navLinkStyle} onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/funding" className={navLinkStyle} onClick={() => setIsOpen(false)}>
              Crowd Funding
            </Link>
          </li>
        </ul>

        {/* Show either AccountMenu or Login button based on user authentication */}
        <div className="flex items-center space-x-4">
          {user ? (
            <AccountMenu />
          ) : (
            <Link to="/login" className="text-yellow-400 hover:text-teal-300 transition-all duration-200 border-b-2 border-transparent hover:border-teal-300 pb-1 px-4 md:px-0">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
