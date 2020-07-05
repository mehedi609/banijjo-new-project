import React from 'react';
import BaseLayout from '../components/layout/base-layout';
import Head from 'next/head';

const privacyPolicy = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Privacy Policy</title>
      </Head>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="h3 font-weight-bold text-left mt-3">
              Privacy and Confidentiality
            </h1>
            <p class="text-justify mt-3">
              Welcome to the banijjo.com.bd website (the "Site") operated by
              banijjo Bangladesh Ltd. We respect your privacy and want to
              protect your personal information. To learn more, please read this
              Privacy Policy.<br></br>
              This Privacy Policy explains how we collect, use and (under
              certain conditions) disclose your personal information. This
              Privacy Policy also explains the steps we have taken to secure
              your personal information. Finally, this Privacy Policy explains
              your options regarding the collection, use and disclosure of your
              personal information. By visiting the Site directly or through
              another site, you accept the practices described in this Policy.
              <br></br>Data protection is a matter of trust and your privacy is
              important to us. We shall therefore only use your name and other
              information which relates to you in the manner set out in this
              Privacy Policy. We will only collect information where it is
              necessary for us to do so and we will only collect information if
              it is relevant to our dealings with you.
              <br></br>
              We will only keep your information for as long as we are either
              required to by law or as is relevant for the purposes for which it
              was collected.<br></br>
              You can visit the Site and browse without having to provide
              personal details. During your visit to the Site you remain
              anonymous and at no time can we identify you unless you have an
              account on the Site and log on with your user name and password.
            </p>
            <h1 class="h5 text-left">1. Data that we collect</h1>
            <p class="text-justify">
              We may collect various pieces of information if you seek to place
              an order for a product with us on the Site.<br></br>We collect,
              store and process your data for processing your purchase on the
              Site and any possible later claims, and to provide you with our
              services. We may collect personal information including, but not
              limited to, your title, name, gender, date of birth, email
              address, postal address, delivery address (if different),
              telephone number, mobile number, fax number, payment details,
              payment card details or bank account details.
            </p>
            <h1 class="h5 text-left">
              Other uses of your Personal Information
            </h1>
            <p class="text-justify">
              We may use your personal information for opinion and market
              research. Your details are anonymous and will only be used for
              statistical purposes. You can choose to opt out of this at any
              time. Any answers to surveys or opinion polls we may ask you to
              complete will not be forwarded on to third parties. Disclosing
              your email address is only necessary if you would like to take
              part in competitions. We save the answers to our surveys
              separately from your email address.
            </p>
            <h1 class="h5 text-left">Competitions</h1>
            <p class="text-justify">
              For any competition we use the data to notify winners and
              advertise our offers. You can find more details where applicable
              in our participation terms for the respective competition.
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default privacyPolicy;
