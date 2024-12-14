import { FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-black py-10 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-teal-400 transition duration-300 hover:from-teal-400 hover:to-yellow-400">
                Aprameya Productions
            </span>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.instagram.com/aprameya_productions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-2xl text-black hover:text-blue-500 transition dark:text-white dark:hover:text-blue-500" />
            </a>
            <a href="https://www.youtube.com/@APRAMEYAPRODUCTIONS/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaYoutube className="text-2xl text-black hover:text-blue-500 transition dark:text-white dark:hover:text-blue-500" />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-1">
            <span className="font-semibold">Phone:</span> +91 81054 81630
          </p>
          <p className="mb-1">
            <span className="font-semibold">Email:</span>
            <br />
            <a href="mailto:locusproductions2023@gmail.com" className="text-blue-400 hover:text-blue-300 transition dark:text-blue-500 dark:hover:text-blue-400">
                locusproductions2023@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold">Location:</span> Bangalore, Karnataka 560077
          </p>
        </div>

        {/* Collaboration Section */}
        <div className="text-center mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Collaborate With Us</h2>
          <p className="mb-2">I’m open to collaboration on exciting projects. If you have an idea or would like to work together, feel free to reach out!</p>
          <a
            href="mailto:locusproductions2023@gmail.com"
            className="text-blue-500 hover:text-blue-400 transition dark:text-blue-400 dark:hover:text-blue-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="mt-5 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm mb-2">© 2024 Aprameya Productions. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link to="/privacypolicy" className="text-yellow-400 hover:text-teal-300 transition duration-200">Privacy Policy</Link>
          <Link to="/termsofservice" className="text-yellow-400 hover:text-teal-300 transition duration-200">Terms Of Service</Link>
        </div>
      </div>
    </footer>
  );
};
