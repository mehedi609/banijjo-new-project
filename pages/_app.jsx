import React from 'react';
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/fontawesome/css/all.min.css';
import 'react-multi-carousel/lib/styles.css';
// import 'react-accessible-accordion/dist/fancy-example.css';

import 'styles/custom-styles.css';
import 'styles/footer.css';
import 'styles/header.css';
import 'styles/custom-accordion-styles.css';
import 'styles/mainCategoryMenu.css';
import 'styles/product-list.css';
import 'styles/ListingFeaturedCat.css';

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    userRoutingHistory: [] 
  };

  
  componentDidMount() {
    const { asPath } = this.props.router;
    this.setState(prevState => ({ userRoutingHistory: [...prevState.userRoutingHistory, asPath] }));
  }

  componentDidUpdate() {
    const { userRoutingHistory } = this.state;
    const { asPath } = this.props.router;
    if (userRoutingHistory[userRoutingHistory.length - 1] !== asPath) {
      this.setState(prevState => ({ userRoutingHistory: [...prevState.userRoutingHistory, asPath] }));
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
        <Component userRoutingHistory={this.state.userRoutingHistory} {...pageProps} />
    );
  }
}

export default MyApp;
