import React from 'react';
import BaseLayout from '../../components/layout/base-layout';
import Head from 'next/head';
import ListingCartProducts from '../../components/listing-cart-products';
import { computeTotalPrice } from '../../utils/utils';

const CheckOut = ({
  cartProductsInfo,
  discountAmount,
  discountDetail,
  addProductHandler,
  removeProductHandler,
  deleteProductHandler,
}) => {
  const totalPrice = computeTotalPrice(cartProductsInfo);

  return (
    <BaseLayout cartProductsInfo={cartProductsInfo}>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="page where user finalizes the purchasea"
        />
        <link rel="stylesheet" href="/css/checkout.css" />
      </Head>

      <div className="container mt-lg-3 mt-md-2">
        <div className="row">
          <div className="col-lg-8 col-md-6">
            <div className="row">
              <div className="col-12">
                <ListingCartProducts
                  {...{
                    cartProductsInfo,
                    discountAmount,
                    discountDetail,
                    addProductHandler,
                    removeProductHandler,
                    deleteProductHandler,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="checkout-order p-4 pt-3">
              <h4 className="pb-3 mb-3">Your Order</h4>
              <div className="checkout-order-products mb-2">
                Products <span>Total</span>
              </div>

              <ul className="mb-2">
                {cartProductsInfo.length > 0 &&
                  cartProductsInfo.map((product) => (
                    <li key={product.id}>
                      {product.product_name}{' '}
                      <span>
                        <em>৳&nbsp;</em>{' '}
                        {product.quantity * product.productPrice}
                      </span>
                    </li>
                  ))}
              </ul>

              <div className="checkout-order-subtotal pb-3 pt-3 mb-3">
                Subtotal{' '}
                <span>
                  <em>৳&nbsp; {totalPrice}</em>
                </span>
              </div>
              <div className="checkout-order-total pb-3 mb-4">
                Total{' '}
                <span>
                  <em>৳&nbsp; {totalPrice - discountAmount}</em>
                </span>
              </div>

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
              <button type="submit" className="site-btn pt-2 pb-2 pr-4 pl-4">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CheckOut;
