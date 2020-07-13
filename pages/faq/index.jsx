import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';

const FAQ = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Frequently Asked Questions</title>
        <meta
          name="Frequently Asked Questions"
          content="page containing Frequently Asked Questions"
        />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="h3 font-weight-bold text-left mt-3">
              Frequently Asked Questions
            </h1>

            <p className="text-justify mt-3">Frequently Asked Questions</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FAQ;
