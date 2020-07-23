import React from 'react';
import BaseLayout from '../../components/layout/base-layout';
import ListingCartProducts from '../../components/listing-cart-products';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { calculateTotalItems, computeTotalPrice } from '../../utils/utils';
import axios from 'axios';
import { sweetAlert } from '../../utils/sweetalert';
import ShoppingCartOrderSummary from '../../components/checkout-flow/shopping-cart-order-summary';

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

const ShoppingCart = ({
  cartProductsInfo,
  discountAmount,
  discountDetail,
  addProductHandler,
  removeProductHandler,
  deleteProductHandler,
}) => {
  const router = useRouter();

  const checkInventory = () => {
    const body = JSON.stringify({ cartProducts: cartProductsInfo });

    if (cartProductsInfo.length > 0) {
      axios
        .post(`${base}/api/checkInventory`, body, options)
        .then(({ data }) => {
          if (data.data) {
            router.push('/checkout');
          } else {
            sweetAlert(data.message);
          }
        });
    } else {
      sweetAlert('Your cart is empty!');
    }
  };

  return (
    <BaseLayout cartProductsInfo={cartProductsInfo}>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="page containing product details" />
      </Head>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-8 col-md-6">
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

          <div className="col-lg-4 col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h4>Order Summary</h4>
              </div>
              <div className="panel-body">
                <ShoppingCartOrderSummary
                  {...{ cartProductsInfo, discountAmount }}
                />

                <button
                  onClick={checkInventory}
                  className="btn btn-primary btn-place-order"
                >
                  Check Out
                </button>

                <button
                  onClick={() => router.back()}
                  className="btn btn-primary btn-continue-shop"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ShoppingCart;
