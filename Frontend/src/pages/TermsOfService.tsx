import React from "react";
import { Link } from "react-router-dom";

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-gray-900 p-10 rounded-3xl max-w-3xl mx-auto shadow-2xl mt-12 mb-12">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8 animate__animated animate__fadeIn">
        Terms and Conditions
      </h1>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <p className="text-l mb-4">
          Welcome to Aprameya Productions. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with these terms.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">User Responsibilities</h2>
        <p className="text-lg mb-4">
          As a user of our website, you agree to:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Use the website for lawful purposes only</li>
          <li>Not engage in any activities that could harm the website or its users</li>
          <li>Provide accurate information when required</li>
        </ul>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Intellectual Property</h2>
        <p className="text-lg mb-4">
          All content on this website, including text, images, logos, and graphics, is the property of Aprameya Productions and is protected by intellectual property laws.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-lg mb-4">
          Aprameya Productions will not be liable for any damages arising from your use of the website or services, including but not limited to direct, indirect, or consequential damages.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Changes to These Terms</h2>
        <p className="text-lg mb-4">
          We may update these Terms and Conditions from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions or concerns about these Terms and Conditions, please contact us at:
        </p>
        <p className="text-lg text-teal-200 mb-4">Email: locusproductions2023@gmail.com</p>
      </section>

      <div className="text-center mt-8">
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

export default TermsOfService;
