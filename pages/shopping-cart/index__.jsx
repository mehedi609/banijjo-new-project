import React, { Component, Fragment } from 'react';

import { isEqual } from 'lodash';
import axios from 'axios';
import Head from 'next/head';
import BaseLayout from '../../components/layout/base-layout';
import { withRouter } from 'next/router';
import { sweetAlert } from '../../utils/sweetalert';
import PromoCode from '../../components/promo-code';
import ListingCartProducts from '../../components/listing-cart-products';
import { computeTotalPrice } from '../../utils/utils';

const base = process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL;
const frontEndUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

class ShoppingCart extends Component {
  state = {
    promoCode: '',
    cartProducts: [],
    discountAmount: 0,
    promoCodeAmount: 0,
    discountDetail: [],
    promoCodeDetail: [],
    cartProductsInfo: [],
    totalPrice: 0,
    totalItems: 0,
  };

  componentDidMount() {
    this.getCustomerCartProducts();
  }

  getDiscounts(cartProducts) {
    const body = JSON.stringify({
      cartProducts: cartProducts,
      customerId: localStorage.customer_id,
    });

    axios.post(`${base}/api/getDiscounts`, body, options).then(({ data }) => {
      this.setState({
        discountAmount: data.data,
        discountDetail: data.dataDetail,
      });
    });
  }

  getProductsInfoByCartData = (cartData, customerId = 0) => {
    const data = JSON.stringify({ cartData, customerId });
    const url = `${base}/api/getCustomerCartProducts`;

    axios.post(url, data, options).then((res) => {
      const cartProductsInfo = res.data.cartProducts;
      if (localStorage.customer_id) {
        this.calcTotalItems(cartProductsInfo);
        this.getDiscounts(cartProductsInfo);
      }
      const totalPrice = computeTotalPrice(cartProductsInfo);
      this.setState({ cartProductsInfo, totalPrice });
    });
  };

  getCustomerCartProducts() {
    if (!localStorage.customer_id) {
      let cartData = JSON.parse(localStorage.getItem('cart'));

      if (cartData) {
        this.calcTotalItems(cartData);
        this.getProductsInfoByCartData(cartData);
      } else {
        this.setState({
          revisedCartDataKeyValue: [],
          itemQuantityState: 0,
          cartProducts: [],
        });
      }
      this.getDiscounts(cartData);
    } else {
      this.getProductsInfoByCartData([], localStorage.customer_id * 1);
    }
  }

  updateLocalStorage = (productsInfo, key) => {
    const data = productsInfo.map(({ color, size, id, quantity }) => {
      return {
        productId: id,
        colorId: color ? color.id : 0,
        sizeId: size ? size.id : 0,
        quantity,
      };
    });

    this.calcTotalItems(data);
    if (localStorage.getItem(key)) localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  /*computeTotalPrice = (cartProducts) => {
    let totalPrice = 0;
    for (const item of cartProducts) {
      totalPrice += item.quantity * item.productPrice;
    }
    return totalPrice;
  };*/

  calcTotalItems = (cartData) => {
    let totalItems = 0;
    for (const cartDatum of cartData) {
      totalItems += cartDatum.quantity;
    }
    this.setState({ totalItems });
  };

  // Helper Functions Ends

  onClickPlusHandler = (data) => {
    const sendData = { ...data };
    delete sendData.quantity;
    const cartProductsInfo = this.state.cartProductsInfo.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity < 5
        ? { ...data, quantity: data.quantity + 1 }
        : data;
    });

    const totalPrice = this.computeTotalPrice(cartProductsInfo);

    if (!localStorage.getItem('customer_id')) {
      this.updateLocalStorage(cartProductsInfo, 'cart');
      this.setState({ cartProductsInfo, totalPrice });
    } else if (localStorage.getItem('customer_id')) {
      const data = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductsInfo,
      });
      const url = `${base}/api/updateCustomerCartProducts`;

      axios.post(url, data, options).then((res) => {
        if (res.data.data) {
          this.calcTotalItems(cartProductsInfo);
          this.setState({ cartProductsInfo, totalPrice });
        }
      });
    }
  };

  onClickMinusHandler = (data) => {
    const sendData = { ...data };
    delete sendData.quantity;
    const cartProductsInfo = this.state.cartProductsInfo.map((data) => {
      const newData = { ...data };
      delete newData.quantity;
      return isEqual(newData, sendData) && data.quantity > 1
        ? { ...data, quantity: data.quantity - 1 }
        : data;
    });

    const totalPrice = this.computeTotalPrice(cartProductsInfo);

    if (!localStorage.getItem('customer_id')) {
      this.updateLocalStorage(cartProductsInfo, 'cart');
      this.setState({ cartProductsInfo, totalPrice });
    } else if (localStorage.getItem('customer_id')) {
      const data = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductsInfo,
      });
      const url = `${base}/api/updateCustomerCartProducts`;

      axios.post(url, data, options).then((res) => {
        console.log(res.data);
        if (res.data.data) {
          this.calcTotalItems(cartProductsInfo);
          this.setState({ cartProductsInfo, totalPrice });
        }
      });
    }
  };

  onClickDeleteHandler = (data) => {
    const cartProductsInfo = this.state.cartProductsInfo.filter(
      (item) => !isEqual(item, data)
    );

    const totalPrice = this.computeTotalPrice(cartProductsInfo);

    if (!localStorage.customer_id) {
      this.updateLocalStorage(cartProductsInfo, 'cart');

      this.setState({ cartProductsInfo, totalPrice });
    } else {
      const url = `${base}/api/deleteCustomerCartProducts`;
      const body = JSON.stringify({
        customerId: localStorage.customer_id,
        table_name: 'temp_sell',
        cartProductInfo: data,
      });

      axios.post(url, body, options).then((res) => {
        if (res.data.data) {
          this.calcTotalItems(cartProductsInfo);
          this.setState({ cartProductsInfo, totalPrice });
        }
      });
    }
  };

  checkInventory = () => {
    const { cartProductsInfo } = this.state;
    const body = JSON.stringify({ cartProducts: cartProductsInfo });

    if (cartProductsInfo.length > 0) {
      axios
        .post(`${base}/api/checkInventory`, body, options)
        .then(({ data }) => {
          if (data.data) {
            this.props.router.push('/checkout');
          } else {
            sweetAlert(data.message);
          }
        });
    } else {
      sweetAlert('Your cart is empty!');
    }
  };

  render() {
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

                <ListingCartProducts
                  cartProducts={this.state.cartProductsInfo}
                />

                <div className="card-footer">
                  <div className="text-right">
                    <p className="my-0">
                      {' '}
                      Total price:
                      <b>
                        <em>৳&nbsp;</em> {this.state.totalPrice}
                      </b>
                    </p>

                    <button
                      style={{ display: 'none' }}
                      id="LoginRegisterModalButton"
                      type="button"
                      data-toggle="modal"
                      data-target="#LoginRegisterModal"
                    />
                    <button
                      style={{ display: 'none' }}
                      id="ShippingModalButton"
                      type="button"
                      data-toggle="modal"
                      data-target="#ShippingModal"
                    />
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
                      Subtotal (
                      {this.state.totalItems === 0 ||
                      this.state.totalItems === 1
                        ? `${this.state.totalItems} item`
                        : `${this.state.totalItems} items`}
                      )
                    </strong>
                    <div className="float-right">
                      <span>
                        <em>৳ &nbsp;</em>
                      </span>
                      <span>{this.state.totalPrice}</span>
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
                      <span>{this.state.discountAmount}</span>
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
                    <div className="float-right">
                      <span>
                        <em>৳ &nbsp;</em>
                      </span>
                      <span>{this.state.promoCodeAmount}</span>
                    </div>
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
                      <span>
                        {this.state.totalPrice -
                          (this.state.discountAmount +
                            this.state.promoCodeAmount)}
                      </span>
                    </div>
                    <hr />
                  </div>
                  <button
                    onClick={this.checkInventory}
                    className="btn btn-primary btn-place-order"
                  >
                    Check Out
                  </button>

                  <button
                    onClick={() => this.props.router.push('/')}
                    className="btn btn-primary btn-continue-shop"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PromoCode />
      </BaseLayout>
    );
  }
}
export default withRouter(ShoppingCart);
