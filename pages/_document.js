import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="Description"
            content="Online shopping center in Bangladesh. All kinds of local products available here in Banijjo. We promote MSME's manufactured products by our eCommerce Market Places Banijjo.com and Banijjo.com.bd. Here you can find most unique handiwork of Bangladesh. "
          />
          <meta
            name="google-site-verification"
            content="tWJAmR96EyGwVqz-7ZNjMYwuCkpd8bGOqI4in2zSMlk"
          />
          <link rel="shortcut icon" href="/favicon_.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
