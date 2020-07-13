import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';
import { fetcher } from '../../../utils/fetcher';

const returnsAndReplacement = ({ policy }) => {
  return (
    <BaseLayout>
      <Head>
        <title>Returns and Replacement</title>
        <meta
          name="Returns and Replacement"
          content="page containing Returns and Replacement"
        />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h3 font-weight-bold text-left mt-3">
              Returns and Replacement
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

  const policy = await fetcher(`${base}/api/policy/returns-and-replacement-6`);

  return {
    props: {
      policy,
    },
  };
}

export default returnsAndReplacement;
