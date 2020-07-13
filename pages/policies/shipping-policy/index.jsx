import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';
import { fetcher } from '../../../utils/fetcher';

const shippingPolicy = ({ policy }) => {
  return (
    <BaseLayout>
      <Head>
        <title>Shipping Policy</title>
        <meta
          name="Shipping Policy"
          content="page containing shipping policy"
        />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h3 font-weight-bold text-left mt-3">
              Shipping Policy
            </h1>

            <p className="text-justify mt-3">
              {policy && policy.terms_and_conditions}
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const base = process.env.FRONTEND_SERVER_URL;

  const policy = await fetcher(`${base}/api/policy/shipping-policy-5`);

  return {
    props: {
      policy,
    },
  };
}

export default shippingPolicy;
