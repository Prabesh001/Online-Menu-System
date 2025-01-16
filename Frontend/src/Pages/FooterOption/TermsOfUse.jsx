import React from "react";
import Layout from "./Layout";

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto md:py-16">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Terms of Use
          </h1>
          <div className="p-6 space-y-6 text-gray-700 bg-white rounded-lg shadow-md md:p-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing or using TicketNest's services, you agree to be
                bound by these Terms of Use. If you disagree with any part of
                the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. Use of Service
              </h2>
              <p className="mb-4">
                You agree to use TicketNest's services only for lawful purposes
                and in accordance with these Terms. You are prohibited from
                using the service in any way that could damage, disable,
                overburden, or impair our servers or networks.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. User Accounts
              </h2>
              <p className="mb-4">
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. Failure to
                do so constitutes a breach of the Terms, which may result in
                immediate termination of your account.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                The service and its original content, features, and
                functionality are and will remain the exclusive property of
                TicketNest and its licensors. The service is protected by
                copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                5. Termination
              </h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms.
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

export default TermsOfUse;
