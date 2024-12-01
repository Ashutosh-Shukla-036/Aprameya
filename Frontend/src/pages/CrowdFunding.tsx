import React from 'react';
import { Link } from 'react-router-dom';
import QR from '../assets/QR.jpg'; // Replace with actual path to the Aprameya logo image

const CrowdFundingPage: React.FC = () => {
    return (
        <div className="bg-gray-900 p-10 rounded-3xl max-w-3xl mx-auto shadow-2xl mt-12 mb-12">
            <h1 className="text-5xl font-extrabold text-center text-white mb-8">
                Support Aprameya Productions
            </h1>

            <div className="text-center mb-8">
                <p className="text-lg text-gray-100 mb-4">
                    Our goal is to create cinematic masterpieces with top-notch quality. Achieving this vision requires high-end equipment, and we need your support to make it possible.
                </p>
                <p className="text-lg text-gray-100 mb-6">
                    If you are passionate about films and would like to help us provide an extraordinary cinematic experience, we invite you to contribute with as little as ₹10.
                </p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-white mb-4">
                    How Your Contribution Helps
                </h2>
                <p className="text-lg text-gray-100 mb-8">
                    Every contribution goes directly towards acquiring the best equipment, supporting talented filmmakers, and bringing powerful stories to life. With your help, we can provide you with an unforgettable cinematic journey!
                </p>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-white mb-4">
                    Scan the QR Code to Contribute
                </h2>
                <div className="flex justify-center mb-6">
                    {/* Replace this with the actual QR code image */}
                    <img src={QR} alt="Aprameya QR" className="w-100 h-80 rounded-md shadow-lg border-4 border-white" />
                </div>
                <p className="text-xl text-gray-100 mb-6">
                    Use the QR code to easily make your contribution and be a part of our filmmaking journey. Your support is the key to our success!
                </p>
            </div>

            <div className="text-center mt-8">
                <p className="text-lg text-gray-100 mb-4">
                    Thank you for believing in us. Together, we can create the future of cinema!
                </p>
                <Link
                    to="/"
                    className="text-xl text-teal-200 underline hover:text-teal-300 transition duration-300"
                >
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default CrowdFundingPage;
