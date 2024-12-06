import React from 'react';
import { Link } from 'react-router-dom';
import APlogo from '../assets/APLogo.jpg';

const NotFound: React.FC = () => {
    return (
        <div className="bg-charcoal-metallic-dark min-h-screen flex flex-col items-center justify-center text-white px-6">
            <div className="text-center space-y-6 max-w-4xl">
                <img
                    src={APlogo}
                    alt="Aprameya Productions Logo"
                    className="w-48 h-auto opacity-90 rounded-lg shadow-lg mb-4 mx-auto"
                />
                <h1 className="text-6xl font-extrabold text-yellow-300 hover:text-yellow-400 transition duration-300">
                    404
                </h1>
                <p className="text-xl text-gray-300 hover:text-teal-300 transition duration-300">
                    Oops! The page you’re looking for doesn’t exist. It seems you've ventured off the script. Let's get you back to the spotlight!
                </p>
                <p className="text-lg text-gray-400 mb-4">
                </p>
                <Link
                    to="/"
                    className="mt-10 px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-teal-400 hover:text-white hover:scale-105 transform transition-all duration-300"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
