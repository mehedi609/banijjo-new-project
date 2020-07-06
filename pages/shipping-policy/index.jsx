import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';
import { fetcher } from '../../utils/fetcher';

const shippingPolicy = (props) => {
  const { policy } = props;
  // console.log(policy);

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
              {policy.length > 0 &&
                policy.map(({ terms_and_conditions }) => terms_and_conditions)}
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const base = process.env.FRONTEND_SERVER_URL;

  const policy = await fetcher(`${base}/api/getPolicy/Shipping%20Policy`);

  return {
    props: {
      policy,
    },
  };
}

export default shippingPolicy;
