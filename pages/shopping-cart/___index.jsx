import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/layout/base-layout';
import Head from 'next/head';
import ListingCartProducts from '../../components/listing-cart-products';
import axios from 'axios';
import { calculateTotalItems, computeTotalPrice } from '../../utils/utils';
import { sweetAlert } from '../../utils/sweetalert';
import { useRouter } from 'next/router';
import withTotalCartProducts from '../../HOC/withTotalCartProducts';
import { isEqual } from 'lodash';

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;
const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

const ShoppingCart = ({ cartProductsInfo }) => {
  /*const [cartProductsInfo, setCartProductsInfo] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountDetail, setDiscountDetail] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);*/

  const router = useRouter();

  /*useEffect(() => {
    getCustomerCartProducts();
  }, []);*/

  /*const getProductsInfoByCartData = (cartData, customerId = 0) => {
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
  };*/

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
        <title>Shopping Cart</title>
        <meta name="description" content="page containing product details" />
      </Head>

      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-8 col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-light text-center" />

              {/*<ListingCartProducts cartProductsInfo={cartProductsInfo} />*/}

              {/*<ListingCartProducts
                cartProducts={cartProductsInfo}
                addProduct={addProductHandler}
                removeProduct={removeProductHandler}
                deleteProduct={deleteProductHandler}
              />*/}

              <ListingCartProducts />

              <div className="card-footer">
                <div className="text-right">
                  <p className="my-0">
                    {' '}
                    Total price:
                    <b>
                      <em>৳&nbsp;</em> {/*{totalPrice}*/}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h4>Order Summary</h4>
              </div>
              <div className="panel-body">
                <div className="col-md-12">
                  <strong className="strong-left-subtotal">
                    {/* Subtotal (
                    {totalCartItems === 0 || totalCartItems === 1
                      ? `${totalCartItems} item`
                      : `${totalCartItems} items`}
                    )*/}
                  </strong>
                  <div className="float-right">
                    <span>
                      <em>৳ &nbsp;</em>
                    </span>
                    {/*<span>{totalPrice}</span>*/}
                  </div>
                </div>
                <div className="col-md-12">
                  <strong className="strong-left-vat">VAT & Tax</strong>
                  <div className="float-right">
                    <span>
                      <em>৳ &nbsp;</em>
                    </span>
                    <span>0</span>
                  </div>
                </div>
                <div className="col-md-12">
                  <strong className="strong-left-discount">Discount</strong>
                  <div className="float-right">
                    <span>
                      <em>৳ &nbsp;</em>
                    </span>
                    {/*<span>{discountAmount}</span>*/}
                  </div>
                </div>
                <div className="col-md-12">
                  <strong>
                    Promo Code
                    <span
                      style={{ cursor: 'pointer' }}
                      className="badge badge-success btn-apply rounded ml-1"
                    >
                      Apply
                    </span>
                  </strong>
                </div>
                <div className="col-md-12">
                  <strong className="strong-left-vat">Shipping</strong>
                  <div className="float-right">
                    <span>
                      <em>৳ &nbsp;</em>
                    </span>
                    <span>0</span>
                  </div>
                  <hr />
                </div>
                <div className="col-md-12">
                  <strong className="strong-left-order">Order Total</strong>
                  <div className="float-right">
                    <span>
                      <em>৳ &nbsp;</em>
                    </span>
                    {/*<span>{totalPrice - discountAmount}</span>*/}
                  </div>
                  <hr />
                </div>
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

export default withTotalCartProducts(ShoppingCart);
