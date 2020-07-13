import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';
import { fetcher } from '../../../utils/fetcher';

const warrantyPolicy = ({ policy }) => {
  return (
    <BaseLayout>
      <Head>
        <title>Warranty Policy</title>
        <meta
          name="Warranty Policy"
          content="page containing warranty policy"
        />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h3 font-weight-bold text-left mt-3">
              Warranty Policy
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

  const policy = await fetcher(`${base}/api/policy/warranty-policy-4`);

  return {
    props: {
      policy,
    },
  };
}

export default warrantyPolicy;
