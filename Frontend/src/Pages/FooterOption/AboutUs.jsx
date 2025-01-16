import React from "react";
import { Ticket, Users, Shield, Headphones } from "lucide-react";
import Layout from "./Layout";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
            About TableMate
          </h1>

          <section className="p-6 mb-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Welcome to TableMate
            </h2>
            <p className="mb-4 text-gray-600">
              Your premier destination for online ticket booking for movies,
              events, theatres, games, and concerts. We understand the
              excitement that comes with experiencing live performances and
              captivating films, and we are here to make the process of
              reserving your seats as seamless and enjoyable as possible.
            </p>
          </section>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            <FeatureCard
              icon={<Ticket className="w-8 h-8 text-blue-500" />}
              title="Easy Booking"
              description="Our user-friendly interface allows you to effortlessly search and book table for your meal."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="Secure Transactions"
              description="We utilize top-notch encryption and security measures to protect your personal information and payment details."
            />
            <FeatureCard
              icon={<Headphones className="w-8 h-8 text-purple-500" />}
              title="Dedicated Support"
              description="Our customer service team is always ready to assist you with any inquiries about event details or ticket issues."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-yellow-500" />}
              title="Inclusive Platform"
              description="We cater to everyone, making your restaurant experience better."
            />
          </div>

          <section className="p-6 mb-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Our Offerings
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc list-inside">
              <li>Latest blockbuster movies</li>
              <li>Captivating stage performances</li>
              <li>Exciting sports events</li>
              <li>Local and international concerts</li>
            </ul>
          </section>

          <section className="p-6 mb-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Join Our Community
            </h2>
            <p className="mb-4 text-gray-600">
              Sign up for our newsletter to stay informed about upcoming events,
              exclusive promotions, and special offers. Be the first to know
              about the hottest shows and ticket releases!
            </p>
            <form className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-2 text-white transition duration-300 bg-teal-500 rounded-md hover:bg-teal-600"
              >
                Subscribe
              </button>
            </form>
          </section>

          <footer className="mt-12 text-center text-gray-500">
            <p>
              Thank you for choosing TableMate as your go-to source for
              ticketing. We look forward to being a part of your next
              unforgettable experience!
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="ml-3 text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutUs;