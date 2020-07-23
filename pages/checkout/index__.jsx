import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import BaseLayout from '../../components/layout/base-layout';
import axios from 'axios';
import { calculateTotalItems, computeTotalPrice } from '../../utils/utils';
import { sweetAlert } from '../../utils/sweetalert';
import { isEqual } from 'lodash';
import ListingCartProducts from '../../components/listing-cart-products';

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

const Checkout = () => {
  const [cartProductsInfo, setCartProductsInfo] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountDetail, setDiscountDetail] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    getCustomerCartProducts();
  });

  const getProductsInfoByCartData = (cartData, customerId = 0) => {
    const data = JSON.stringify({ cartData, customerId });
    const url = `${base}/api/getCustomerCartProducts`;

    axios.post(url, data, options).then((res) => {
      const cartProductsInfo = res.data.cartProducts;
      if (localStorage.customer_id) {
        getDiscounts(cartProductsInfo);
        setTotalCartItems(calculateTotalItems(cartProductsInfo));
      }
      setCartProductsInfo(cartProductsInfo);
      setTotalPrice(computeTotalPrice(cartProductsInfo));
    });
  };

  const getDiscounts = (cartProducts) => {
    const body = JSON.stringify({
      cartProducts,
      customerId: localStorage.customer_id,
    });

    axios.post(`${base}/api/getDiscounts`, body, options).then(({ data }) => {
      setDiscountAmount(data.data);
      setDiscountDetail(data.dataDetail);
    });
  };

  const getCustomerCartProducts = () => {
    if (!localStorage.customer_id) {
      let cartData = JSON.parse(localStorage.getItem('cart'));
      if (cartData) {
        // this.calcTotalItems(cartProducts);
        setTotalCartItems(calculateTotalItems(cartProducts));
        getProductsInfoByCartData(cartData);
      } else {
        setCartProducts([]);
      }
      getDiscounts(cartData);
    } else {
      this.getProductsInfoByCartData([], localStorage.customer_id * 1);
    }
  };

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

  const updateLocalStorage = (productsInfo, key) => {
    const data = productsInfo.map(({ color, size, id, quantity }) => {
      return {
        productId: id,
        colorId: color ? color.id : 0,
        sizeId: size ? size.id : 0,
        quantity,
      };
    });
    if (localStorage.getItem(key)) localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const updateState = (products, price) => {
    setTotalCartItems(calculateTotalItems(products));
    setCartProductsInfo(products);
    setTotalPrice(price);
  };

  const addProductHandler = (data) => {
    debugger;
    const sendData = { ...data };
    delete sendData.quantity;
    const _cartProductsInfo = cartProductsInfo.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity < 5
        ? { ...data, quantity: data.quantity + 1 }
        : data;
    });

    const _totalPrice = computeTotalPrice(_cartProductsInfo);
    if (!localStorage.getItem('customer_id')) {
      debugger;
      updateState(_cartProductsInfo, _totalPrice);
      updateLocalStorage(_cartProductsInfo, 'cart');
    } else if (localStorage.customer_id) {
      const data = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductsInfo: _cartProductsInfo,
      });
      const url = `${base}/api/updateCustomerCartProducts`;

      axios.post(url, data, options).then((res) => {
        if (res.data.data) {
          updateState(_cartProductsInfo, _totalPrice);
        }
      });
    }
  };

  const removeProductHandler = (data) => {
    const sendData = { ...data };
    delete sendData.quantity;
    const _cartProductsInfo = cartProductsInfo.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity > 1
        ? { ...data, quantity: data.quantity - 1 }
        : data;
    });

    const _totalPrice = computeTotalPrice(_cartProductsInfo);

    if (!localStorage.customer_id) {
      updateLocalStorage(_cartProductsInfo, 'cart');
      updateState(_cartProductsInfo, _totalPrice);
    } else if (localStorage.customer_id) {
      const data = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductsInfo: _cartProductsInfo,
      });
      const url = `${base}/api/updateCustomerCartProducts`;

      axios.post(url, data, options).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          updateState(_cartProductsInfo, _totalPrice);
        }
      });
    }
  };

  const deleteProductHandler = (data) => {
    const _cartProductsInfo = cartProductsInfo.filter(
      (item) => !isEqual(item, data)
    );

    const _totalPrice = computeTotalPrice(cartProductsInfo);

    if (!localStorage.customer_id) {
      updateLocalStorage(_cartProductsInfo, 'cart');
      updateState(_cartProductsInfo, _totalPrice);
    } else {
      const url = `${base}/api/deleteCustomerCartProducts`;
      const body = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductInfo: _cartProductsInfo,
      });

      axios.post(url, body, options).then((res) => {
        if (res.data.data) {
          updateState(_cartProductsInfo, _totalPrice);
        }
      });
    }
  };

  return (
    <BaseLayout>
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="page where user finalizes the purchasea"
        />
        <link rel="stylesheet" href="/css/checkout.css" />
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
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
};

export default Checkout;
