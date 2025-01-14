import React from "react";
// import Layout from "../layout/Layout";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto md:py-16">
          <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
            Privacy Policy
          </h1>
          <div className="p-6 space-y-6 text-gray-700 bg-white rounded-lg shadow-md md:p-8">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. Privacy
              </h2>
              <p className="mb-4">
                We at TicketNest take our customers' data seriously. The data we
                collect through mobile App and websites are property of
                TicketNest only. The protection of your personal information and
                all the content you store on our service are well secured and
                are not disclosed to any third party.
              </p>
              <p className="mb-4">
                This privacy policy explains our practices for gathering, using,
                and disclosing the personal data of App and website visitors.
                Your personal information is only used by us to operate,
                maintain and improve the App/website. You consent to the
                collection and use of information in line with this policy by
                using the App/website.
              </p>
              <p>
                We may ask you for personal information that can be used to
                contact or identify you while you are using our App/website or
                during your visit to our theatre locations. We also particularly
                use the data collected to better serve our customers. Your data
                will be handled securely and in accordance with our privacy
                policy, and TicketNest takes all reasonable measures to
                guarantee that.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. Information Collection
              </h2>
              <p>
                When you use TicketNest mobile app and web services we collect
                various personal information. This information may include,
                among other things, your name, location, gender, phone number,
                email address, date of birth, payment methods and details,
                username and password. Any additional information you give us
                when engaging with us may also be collected and stored by us.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. How Information collected is used
              </h2>
              <p className="mb-4">
                The personal information collected may be used to provide you
                with information and updates on our services. We may also make
                you aware of new additional products, services and opportunities
                at our premises. Also, we might use the information to improve
                our products and services and better understand your needs.
              </p>
              <p className="mb-4">
                TicketNest's application makes third party social media features
                available to our users. We will not ensure the security of any
                information you choose to make public in social media feature.
                Also, we cannot ensure that parties who have access to such
                publicly available information will respect your privacy.
              </p>
              <p>
                In order to reach you, we may use a number of methods, including
                but not limited to phone, email, SMS, or mail.
              </p>
            </section>

            {/* Additional sections would follow the same pattern */}

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                13. Contact
              </h2>
              <p>
                If you have any queries regarding this Policy, you can contact
                us via email address: support@ticketnest.com
              </p>
            </section>

            <p className="mt-8 text-sm text-gray-500">
              Last Updated in November 25, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
