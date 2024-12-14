import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 p-10 rounded-3xl max-w-3xl mx-auto shadow-2xl mt-12 mb-12">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8 animate__animated animate__fadeIn">
        Privacy Policy
      </h1>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <p className="text-l mb-4">
          At Aprameya Productions, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website and interact with our services.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold  mb-4">Information We Collect</h2>
        <p className="text-lg mb-4">
          We collect personal information such as your name and email address when you:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Sign up for our newsletter</li>
          <li>Leave a review on our website</li>
          <li>Submit an inquiry or contact us</li>
        </ul>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold">Why We Collect Your Information</h2>
        <p className="text-lg mb-4">
          We collect your information to:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>Provide personalized experiences on our website</li>
          <li>Respond to your queries or concerns</li>
          <li>Send you promotional content and updates (if you opt-in)</li>
          <li>Improve our services and website functionality</li>
          <li>Verify the identity of users leaving reviews</li>
        </ul>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">How We Protect Your Information</h2>
        <p className="text-lg mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
      <h2 className="text-3xl font-semibold text-white mb-4">Your Rights</h2>
        <p className="text-lg mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-l">
          <li>Access and update your personal information</li>
          <li>Request the deletion of your data</li>
          <li>Opt-out of receiving marketing emails</li>
        </ul>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="text-lg mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly.
        </p>
      </section>

      <section className="bg-custom-gradient text-white p-6 rounded-lg shadow-lg mb-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;
