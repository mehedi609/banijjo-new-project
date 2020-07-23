import React, { useEffect, useState } from 'react';
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
import 'styles/shopping-cart.css';
import 'styles/ListingFeaturedCat.css';
import 'styles/product-details.css';
import axios from 'axios';
import { updateLocalStorage } from '../utils/utils';
import { isEqual } from 'lodash';

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

function MyApp({ Component, pageProps }) {
  const [cartProductsInfo, setCartProductsInfo] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountDetail, setDiscountDetail] = useState([]);

  useEffect(() => {
    getCustomerCartProducts();
  }, []);

  const getCustomerCartProducts = () => {
    if (!localStorage.customer_id) {
      let cartData = JSON.parse(localStorage.getItem('cart'));
      if (cartData) {
        // this.calcTotalItems(cartProducts);
        // setTotalCartItems(calculateTotalItems(cartProducts));
        getProductsInfoByCartData(cartData);
      } else {
        setCartProducts([]);
      }
      getDiscounts(cartData);
    } else {
      this.getProductsInfoByCartData([], localStorage.customer_id * 1);
    }
  };

  const getProductsInfoByCartData = (cartData, customerId = 0) => {
    const data = JSON.stringify({ cartData, customerId });
    const url = `${base}/api/getCustomerCartProducts`;

    axios.post(url, data, options).then((res) => {
      const cartProductsInfo = res.data.cartProducts;
      if (localStorage.customer_id) {
        getDiscounts(cartProductsInfo);
        // setTotalCartItems(calculateTotalItems(cartProductsInfo));
      }
      setCartProductsInfo(cartProductsInfo);
      // setTotalPrice(computeTotalPrice(cartProductsInfo));
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

  const addProductHandler = (data) => {
    const sendData = { ...data };
    delete sendData.quantity;
    const _cartProductsInfo = cartProductsInfo.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity < 5
        ? { ...data, quantity: data.quantity + 1 }
        : data;
    });

    if (!localStorage.getItem('customer_id')) {
      setCartProductsInfo(_cartProductsInfo);
      updateLocalStorage(_cartProductsInfo, 'cart');
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

    if (!localStorage.customer_id) {
      updateLocalStorage(_cartProductsInfo, 'cart');
      setCartProductsInfo(_cartProductsInfo);
    }
  };

  const deleteProductHandler = (data) => {
    const _cartProductsInfo = cartProductsInfo.filter(
      (item) => !isEqual(item, data)
    );

    if (!localStorage.customer_id) {
      updateLocalStorage(_cartProductsInfo, 'cart');
      setCartProductsInfo(_cartProductsInfo);
    }
  };

  return (
    <Component
      {...pageProps}
      {...{
        cartProductsInfo,
        discountAmount,
        discountDetail,
        addProductHandler,
        removeProductHandler,
        deleteProductHandler,
      }}
    />
  );
}

export default MyApp;
