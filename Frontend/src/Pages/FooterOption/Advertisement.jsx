import React from "react";
// import Layout from "./../layout/Layout";

const Advertisement = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto md:py-16">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Advertisement Policy
          </h1>
          <div className="p-6 space-y-6 text-gray-700 bg-white rounded-lg shadow-md md:p-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. Types of Advertisements
              </h2>
              <p className="mb-4">
                TicketNest may display various types of advertisements,
                including but not limited to:
              </p>
              <ul className="pl-6 space-y-2 list-disc">
                <li>Display ads</li>
                <li>Sponsored content</li>
                <li>Email advertisements</li>
                <li>In-app advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. Ad Content Guidelines
              </h2>
              <p className="mb-4">
                All advertisements on TicketNest must comply with our content
                guidelines. We prohibit ads that are misleading, offensive, or
                promote illegal activities.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. Targeted Advertising
              </h2>
              <p className="mb-4">
                We may use information about your interests to provide you with
                more relevant advertisements. You can adjust your ad preferences
                in your account settings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                4. Third-Party Advertising
              </h2>
              <p className="mb-4">
                Some advertisements may be served by third-party ad networks.
                These networks may use cookies and similar technologies to
                collect information for ad targeting.
              </p>
            </section>

            <p className="mt-8 text-sm text-gray-500">
              Last Updated: November 25, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
