import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';
import { fetcher } from '../../../utils/fetcher';

const cookiePolicy = ({ policy }) => {
  return (
    <BaseLayout>
      <Head>
        <title>Cookie Policy</title>
        <meta name="Cookie Policy" content="page containing cookie policy" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h3 font-weight-bold text-left mt-3">
              Cookie Policy
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

  const policy = await fetcher(`${base}/api/policy/cookie-policy-3`);

  return {
    props: {
      policy,
    },
  };
}

export default cookiePolicy;
