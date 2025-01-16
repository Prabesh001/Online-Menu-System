import React from "react";
import Layout from "./Layout";

const Marketing = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto md:py-16">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Marketing Policy
          </h1>
          <div className="p-6 space-y-6 text-gray-700 bg-white rounded-lg shadow-md md:p-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. Our Marketing Approach
              </h2>
              <p className="mb-4">
                At TicketNest, we believe in transparent and ethical marketing
                practices. Our goal is to provide you with relevant information
                about our services while respecting your privacy and
                preferences.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. Types of Marketing Communications
              </h2>
              <p className="mb-4">
                We may contact you through various channels, including:
              </p>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Email newsletters</li>
                <li>SMS notifications</li>
                <li>Push notifications (if you've opted in)</li>
                <li>Social media updates</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. Opting Out
              </h2>
              <p className="mb-4">
                You can opt out of marketing communications at any time. Each
                email we send includes an unsubscribe link, and you can manage
                your communication preferences in your account settings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                4. Data Usage in Marketing
              </h2>
              <p className="mb-4">
                We use data collected from your interactions with our service to
                personalize marketing content and improve our offerings. This
                data is handled in accordance with our Privacy Policy.
              </p>
            </section>

            <p className="mt-8 text-sm text-gray-500">
              Last Updated: November 25, 2024
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketing;
