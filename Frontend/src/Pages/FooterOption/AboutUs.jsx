import React from "react";
import { Users, Shield, Headphones } from "lucide-react";
import Layout from "./Layout";
import { RiRestaurantLine } from "react-icons/ri";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-900">
            About TableMate
          </h1>

          <section className="compartment cmp-1">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Welcome to TableMate
            </h2>
            <p className="bl-txt">
              Your premier destination for online ticket booking for movies,
              events, theatres, games, and concerts. We understand the
              excitement that comes with experiencing live performances and
              captivating films, and we are here to make the process of
              reserving your seats as seamless and enjoyable as possible.
            </p>
          </section>

          <div className="compartment ft-collections">
            <MyCard
              icon={<RiRestaurantLine size={28} color="brown"/>}
              title="Easy Booking"
              description="Our user-friendly interface allows you to effortlessly search and book table for your meal."
            />
            <MyCard
              icon={<Shield height={32} color="green"/>}
              title="Secure Transactions"
              description="We utilize top-notch encryption and security measures to protect your personal information and payment details."
            />
            <MyCard
              icon={<Headphones height={32} color="blue"/>}
              title="Dedicated Support"
              description="Our customer service team is always ready to assist you with any inquiries about event details or ticket issues."
            />
            <MyCard
              icon={<Users height={32} color="brown"/>}
              title="Inclusive Platform"
              description="We cater to everyone, making your restaurant experience better."
            />
          </div>

          <section className="compartment">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Our Offerings
            </h2>
            <ul className="bl-txt">
              <li>Latest blockbuster movies</li>
              <li>Captivating stage performances</li>
              <li>Exciting sports events</li>
              <li>Local and international concerts</li>
            </ul>
          </section>

          <section className="compartment">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Join Our Community
            </h2>
            <p className="bl-txt">
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
                className="ft-sub-btn"
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

const MyCard = ({icon, title, description}) => {
  return (
    <div>
      <div style={{display:"flex", gap:"8px"}}>
        {icon}
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  )
}
export default AboutUs;