import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isEqual } from 'lodash';
import { computeTotalPrice, updateLocalStorage } from '../utils/utils';

const { Provider, Consumer } = React.createContext();

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;
const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

const ContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartProductsDetail, setCartProductsDetail] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountDetail, setDiscountDetail] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    getCustomerCartProducts();
  }, []);

  const getCustomerCartProducts = () => {
    if (!localStorage.customer_id) {
      let cartData = JSON.parse(localStorage.getItem('cart'));
      if (cartData) {
        getProductsInfoByCartData(cartData, 0);
      } else {
        setCartProducts([]);
      }
    } else {
      getProductsInfoByCartData([], localStorage.customer_id * 1);
    }
  };

  const getProductsInfoByCartData = (cartData, customerId = 0) => {
    const data = JSON.stringify({ cartData, customerId });
    const url = `${base}/api/getCustomerCartProducts`;

    axios.post(url, data, options).then(({ data }) => {
      const _cartProductsInfo = data.cartProducts;
      setCartProductsDetail(_cartProductsInfo);
    });
  };

  const addProductHandler = (data) => {
    const sendData = { ...data };
    delete sendData.quantity;
    const _cartProductsDetail = cartProductsDetail.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity < 5
        ? { ...data, quantity: data.quantity + 1 }
        : data;
    });

    if (!localStorage.getItem('customer_id')) {
      setCartProductsDetail(_cartProductsDetail);
      updateLocalStorage(_cartProductsDetail, 'cart');
    }
  };

  const deleteProductHandler = (data) => {
    console.log(data);
  };

  const removeProductHandler = (data) => {
    console.log(data);
  };

  return (
    <Provider
      value={{
        cartProducts: cartProductsDetail,
        addProductHandler,
        deleteProductHandler,
        removeProductHandler,
      }}
    >
      {children}
    </Provider>
  );
};

export { ContextProvider, Consumer as ContextConsumer };
