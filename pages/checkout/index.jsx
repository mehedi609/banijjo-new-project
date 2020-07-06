import React from 'react';
import Head from 'next/head';

import BaseLayout from '../../components/layout/base-layout';

import Product_Card from '../../components/shared/Product_Card';
import ProductListBreadCrumb from '../../components/shared/productListBreadCrumb';
import Categories from '../../components/home-page/mainCategories';
import CategoriesMb from '../../components/home-page/category-sidebar/categories-mb';

import { fetcher } from 'utils/fetcher';
import axios from 'axios';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';
const base = process.env.FRONTEND_SERVER_URL;

const emailPattern = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    return (
      <BaseLayout>
        <Head>
          <title>Checkout</title>
          <meta
            name="description"
            content="page where user finalizes the purchasea"
          />
          <link rel="stylesheet" href="/css/checkout.css" />

          <script
            type="text/javascript"
            src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"
          ></script>
        </Head>

        <div className="container">
          <div className="checkout-form">
            <h4 className="pb-2 mb-3">Billing Details</h4>
            <form action="#">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout-input mb-3">
                        <p className="mb-3">
                          Fist Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout-input mb-3">
                        <p className="mb-3">
                          Last Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Country<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Address<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="checkout-input-add mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, unite ect (optinal)"
                    />
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Town/City<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Country/State<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Postcode / ZIP<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout-input mb-3">
                        <p className="mb-3">
                          Phone<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="checkout-input mb-3">
                        <p className="mb-3">
                          Email<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="checkout-input-checkbox mb-2">
                    <label htmlFor="acc" className="pl-4">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <p>
                    Create an account by entering the information below. If you
                    are a returning customer please login at the top of the page
                  </p>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Account Password<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout-input-checkbox mb-2">
                    <label htmlFor="diff-acc" className="pl-4">
                      Ship to a different address?
                      <input type="checkbox" id="diff-acc" />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="checkout-input mb-3">
                    <p className="mb-3">
                      Order notes<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="checkout-order p-4 pt-3">
                    <h4 className="pb-3 mb-3">Your Order</h4>
                    <div className="checkout-order-products mb-2">
                      Products <span>Total</span>
                    </div>
                    <ul className="mb-2">
                      <li>
                        Vegetable’s Package <span>$75.99</span>
                      </li>
                      <li>
                        Fresh Vegetable <span>$151.99</span>
                      </li>
                      <li>
                        Organic Bananas <span>$53.99</span>
                      </li>
                    </ul>
                    <div className="checkout-order-subtotal pb-3 pt-3 mb-3">
                      Subtotal <span>$750.99</span>
                    </div>
                    <div className="checkout-order-total pb-3 mb-4">
                      Total <span>$750.99</span>
                    </div>
                    <div className="checkout-input-checkbox mb-2">
                      <label htmlFor="acc-or" className="pl-4">
                        Create an account?
                        <input type="checkbox" id="acc-or" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p className="mb-3">
                      Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="checkout-input-checkbox mb-2">
                      <label htmlFor="payment" className="pl-4">
                        Check Payment
                        <input type="checkbox" id="payment" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout-input-checkbox mb-2">
                      <label htmlFor="paypal" className="pl-4">
                        Paypal
                        <input type="checkbox" id="paypal" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="site-btn pt-2 pb-2 pr-4 pl-4"
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

// export const getServerSideProps = async () => {
//     let base = process.env.FRONTEND_SERVER_URL;

// };

export default Checkout;
