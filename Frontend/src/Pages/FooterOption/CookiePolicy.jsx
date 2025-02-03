import React from "react";
import Layout from "./Layout";

const CookiePolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto md:py-16">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Cookie Policy
          </h1>
          <div className="p-6 space-y-6 text-gray-700 bg-white rounded-lg shadow-md md:p-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. What are cookies?
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. How we use cookies
              </h2>
              <p className="mb-4">
                TicketNest uses cookies for a variety of purposes, including:
              </p>
              <ul className="pl-6 space-y-2 list-disc">
                <li>To provide and maintain our service</li>
                <li>To analyze how our service is used and improve it</li>
                <li>To personalize your experience</li>
                <li>For advertising and marketing purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. Types of cookies we use
              </h2>
              <p className="mb-4">
                We use both session and persistent cookies on our website and we
                use different types of cookies to run the site:
              </p>
              <ul className="bl-txt">
                <li>Essential cookies</li>
                <li>Functionality cookies</li>
                <li>Analytics cookies</li>
                <li>Advertising cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                4. How to manage cookies
              </h2>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience.
              </p>
            </section>

            <p className="up-dt">
              Last Updated: November 25, 2024
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
