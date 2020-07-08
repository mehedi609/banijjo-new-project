import React from 'react';
import Head from 'next/head';

import BaseLayout from '../components/layout/base-layout';

import Product_Card from '../components/shared/Product_Card';
import ProductListBreadCrumb from '../components/shared/productListBreadCrumb';
import CategoriesMb from '../components/home-page/category-sidebar/categories-mb';

import { fetcher } from 'utils/fetcher';
import axios from 'axios';
import MainCategoriesSidebar from '../components/home-page/category-sidebar/main-categories-sidebar';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';
const base = process.env.FRONTEND_SERVER_URL;

const emailPattern = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

const options = {
  headers: { 'Content-Type': 'application/json' },
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };

    this.payOrder = this.payOrder.bind(this);
    this.paySsl = this.paySsl.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadProduct = this.loadProduct.bind(this);
    this.changeAgreement = this.changeAgreement.bind(this);
    this.checkInventory = this.checkInventory.bind(this);
    this.searchPromoCode = this.searchPromoCode.bind(this);
  }

  componentDidMount() {
    this.getCustomerAddress();
    // this.getAllCategories()
    // this.gettermsConditions()
    this.getCustomerCartProducts();
  }

  getCustomerAddress = () => {
    const customerId = localStorage.customer_id ? localStorage.customer_id : 0;
    if (customerId) {
      axios.get(`${base}/api/get_customer_info/${customerId}`).then((res) => {
        const { name, address, phone_number } = res.data;
        this.setState({
          customerName: name ? name : '',
          customerAddress: address ? address : '',
          customerPhone: phone_number ? phone_number : '',
        });
      });
    }
  };

  getDiscounts(cartProducts) {
    fetch(base + '/api/getDiscounts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartProducts: cartProducts,
        customerId: localStorage.customer_id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        this.setState({
          discountAmount: response.data,
          discountDetail: response.dataDetail,
        });
      });
  }

  // gettermsConditions = async () => {
  //     fetch(base + "/api/get_terms_conditions", {
  //         method: "GET"
  //     })
  //         .then(res => {
  //             return res.json();
  //         })
  //         .then(termsConditions => {
  //             this.setState({ termsMessage: termsConditions.data });
  //             return false;
  //         });
  // }

  changeAgreement() {
    if (this.state.checkAgreement === false) {
      this.setState({ checkAgreement: !this.state.checkAgreement }, () => {
        console.log('aaa', this.state);
      });
    } else {
      this.setState({ checkAgreement: !this.state.checkAgreement }, () => {
        console.log('bbb', this.state);
      });
    }
  }

  requiredFunc() {
    let cartData = JSON.parse(localStorage.getItem('cart'));
    let productIds = [];

    if (cartData) {
      cartData.forEach(function (val, index) {
        productIds.push(val.productId);
      });

      let uniqueProductIds = productIds.filter((v, i, a) => a.indexOf(v) === i);
      let revisedCartData = [];

      uniqueProductIds.forEach(function (valParent, keyParent) {
        let totalCount = 0;
        cartData.forEach(function (val, key) {
          if (parseInt(valParent) === parseInt(val.productId)) {
            totalCount += val.quantity;
          }
        });
        revisedCartData.push({ productId: valParent, quantity: totalCount });
      });

      let revisedCartDataKeyValue = [];
      revisedCartData.forEach(function (value, key) {
        revisedCartDataKeyValue[value.productId] = value.quantity;
      });
      return revisedCartDataKeyValue;
    } else {
      return [];
    }
  }

  getProductsInfoByCartData = (cartData, customerId = 0) => {
    console.log({ cartData });
    console.log({ customerId });
    const data = JSON.stringify({ cartData, customerId });
    const url = `${base}/api/getCustomerCartProducts`;

    axios.post(url, data, options).then((res) => {
      const cartProductsInfo = res.data.cartProducts;
      if (localStorage.customer_id) {
        this.calcTotalItems(cartProductsInfo);
        this.getDiscounts(cartProductsInfo);
      }
      const totalPrice = this.computeTotalPrice(cartProductsInfo);
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

  // Helper Functions Starts
  updateLocalStorage = (productsInfo, key) => {
    const data = productsInfo.map(({ color, size, id, quantity }) => ({
      productId: id,
      colorId: color.id,
      sizeId: size.id,
      quantity,
    }));
    this.calcTotalItems(data);
    if (localStorage.getItem(key)) localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  computeTotalPrice = (cartProducts) => {
    let totalPrice = 0;
    for (const item of cartProducts) {
      totalPrice += item.quantity * item.productPrice;
    }
    return totalPrice;
  };

  calcTotalItems = (cartData) => {
    let totalItems = 0;
    for (const cartDatum of cartData) {
      totalItems += cartDatum.quantity;
    }
    this.setState({ totalItems });
  };

  showAlert(text) {
    swal({
      title: 'Warning!',
      text,
      icon: 'warning',
      timer: 4000,
      button: false,
    });
  }
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
        // console.log(res.data);
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
      (item) => !isEqual(item, data),
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

  payOrder() {
    fetch(base + '/api/payOrder', {
      method: 'POST',
      crossDomain: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: localStorage.customer_id * 1,
        discountAmount: this.state.discountAmount,
        discountDetail: this.state.discountDetail,
        promoCodeAmount: this.state.promoCodeAmount,
        promoCodeDetail: this.state.promoCodeDetail,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response);
        if (response.data === true) {
          this.setState({ responseMessage: response.message });
          var link = document.getElementById('successCartMessage');
          var cartModalclose = document.getElementById('cartModalClose');
          var paymentModalClose = document.getElementById('paymentModalClose');
          paymentModalClose.click();
          cartModalclose.click();
          link.click();
        } else if (response.data === false) {
          this.setState({ responseMessage: response.message });
          link = document.getElementById('successCartMessage');
          cartModalclose = document.getElementById('cartModalClose');
          paymentModalClose = document.getElementById('paymentModalClose');
          paymentModalClose.click();
          cartModalclose.click();
          link.click();
        }
      });
  }

  paySsl() {
    fetch(base + '/api/paySsl', {
      method: 'POST',
      crossDomain: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: localStorage.customer_id,
        discountAmount: this.state.discountAmount,
        discountDetail: this.state.discountDetail,
        promoCodeAmount: this.state.promoCodeAmount,
        promoCodeDetail: this.state.promoCodeDetail,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response.data);
        window.location.href = response.data;
      });
  }

  // getAllCategories() {
  //     fetch(base + "/api/all_category_list_more", {
  //         method: "GET"
  //     })
  //         .then(res => {
  //             return res.json();
  //         })
  //         .then(categories => {
  //             this.setState({ Categories: categories.data });
  //             return false;
  //         });
  // }

  loadProduct() {
    window.location.href = '/';
  }

  addressSubmit = (event) => {
    event.preventDefault();

    fetch(base + '/api/saveCustomerAddress', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.customerName,
        phone_number: this.state.customerPhone,
        address: this.state.customerAddress,
        city_id: event.target.city.value,
        district_id: event.target.district.value,
        area_id: event.target.area.value,
        customerId: localStorage.customer_id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (!response.error) {
          this.setState({ isAddress: true });
          const addressModalClose = document.getElementById('closeAddress');
          const cartModalclose = document.getElementById('cartModalClose');
          const ShippingModalOpen = document.getElementById(
            'ShippingModalButton',
          );
          addressModalClose.click();
          cartModalclose.click();
          ShippingModalOpen.click();
        }
      });
  };

  searchPromoCode(event) {
    event.preventDefault();
    let promoCodeInput = event.target.promoCodeText.value;
    let totalAmount = event.target.totalAmount.value;

    fetch(base + '/api/getPromoCodeAmount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        promoCodeInput: promoCodeInput,
        totalAmount: totalAmount,
        customerId: localStorage.customer_id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.data > 0) {
          this.setState({
            promoCodeAmount: response.data,
            promoCodeDetail: response.dataDetail,
          });
        }
        var hidePromoCodeModal = document.getElementById('hidePromoCodeModal');
        hidePromoCodeModal.click();
      });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeEmailHandler = (e) => {
    if (this.state.loginError !== '') {
      this.setState({ loginError: '' });
    }
    this.setState({ email: e.target.value });
  };

  onChangePasswordHandler = (e) => {
    if (this.state.loginError !== '') {
      this.setState({ loginError: '' });
    }
    this.setState({ password: e.target.value });
  };

  customerLoginSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const { password } = this.state;

    fetch(base + '/api/loginCustomerInitial', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log('aa', response);
        if (!response.error) {
          localStorage.setItem('customer_id', response.data);
          var link = document.getElementById('successCartMessage');
          var hide = document.getElementById('hideLogin');
          hide.click();
          link.click();
        } else if (response.error) {
          this.setState({
            loginError: 'Login Fail! Invalid Credentials',
            password: '',
          });
        }
      });
  };

  createAccountNext(event) {
    event.preventDefault();
    if (event.target.email.value === '' || event.target.email.value == null) {
      this.setState({
        emailError: 'Email cannot be empty',
      });
      return false;
    } else if (
      !emailPattern.test(event.target.email.value) &&
      event.target.email.value > 0
    ) {
      this.setState({
        emailError: 'Enter a valid Password',
      });
      return false;
    } else if (
      event.target.password.value === '' ||
      event.target.password.value == null
    ) {
      this.setState({
        passwordError: 'Password cannot be empty',
      });
      return false;
    } else {
      let cartData = JSON.parse(localStorage.getItem('cart'));
      let productIds = [];
      cartData.forEach(function (val, index) {
        productIds.push(val.productId);
      });
      let uniqueProductIds = productIds.filter((v, i, a) => a.indexOf(v) === i);
      let revisedCartData = [];
      uniqueProductIds.forEach(function (valParent, keyParent) {
        let totalCount = 0;
        cartData.forEach(function (val, key) {
          if (parseInt(valParent) === parseInt(val.productId)) {
            totalCount += val.quantity;
          }
        });
        revisedCartData.push({ productId: valParent, quantity: totalCount });
      });

      fetch(base + '/api/saveCustomerInitial', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
          cartData: revisedCartData,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.data !== '') {
            localStorage.setItem('customer_id', response.data);
            var hideLogin = document.getElementById('hideLogin');
            var link = document.getElementById('successCartMessage');
            hideLogin.click();
            link.click();
          }
        });
    }
  }

  checkInventory(type) {
    console.log({ type });
    const { cartProductsInfo } = this.state;
    if (cartProductsInfo.length > 0) {
      fetch(base + '/api/checkInventory', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartProducts: cartProductsInfo,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.data) {
            if (type === 'Order Place') {
              var LoginRegisterModal = document.getElementById(
                'LoginRegisterModalButton',
              );
              var ShippingModalOpen = document.getElementById(
                'ShippingModalButton',
              );
              if (!localStorage.customer_id) {
                LoginRegisterModal.click();
              } else {
                ShippingModalOpen.click();
              }
            } else if (type === 'Order Confirm') {
              var PaymentModalButton = document.getElementById(
                'PaymentModalButton',
              );
              PaymentModalButton.click();
            }
          } else {
            this.showAlert(response.message);
          }
        });
    } else {
      this.showAlert('Your cart is empty!');
    }
  }

  paymentModalCloseHandler = () => {
    const ShippingModalOpen = document.getElementById('ShippingModalButton');
    ShippingModalOpen.click();
  };

  promoCodeModalDisplay() {
    var PromoCodeModalButton = document.getElementById('PromoCodeModalButton');
    PromoCodeModalButton.click();
  }

  render() {
    const {
      categories,

      customerName,
      customerAddress,
      customerPhone,

      email,
      password,
      loginError,
      // Categories,
      textArray,
      // allCategories,
      cartProducts,
      isAddress,
      checkAgreement,
      responseMessage,
      termsMessage,
      itemQuantityState,
      customerInfo,
      discountAmount,
      promoCodeAmount,
      discountDetail,
      promoCodeDetail,
      revisedCartData,
      cartProductsInfo,
      totalPrice,
      totalItems,
    } = this.state;

    console.log(this.state);

    return (
      <BaseLayout>
        <Head>
          <title>Shopping Cart</title>
          <meta
            name="description"
            content="page detailing the products user wants to purchase"
          />
          <link rel="stylesheet" href="/css/shopping-cart.css" />

          <script
            type="text/javascript"
            src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"
          ></script>
        </Head>

        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="d-none d-lg-block">
                <MainCategoriesSidebar categories={categories} />
              </div>

              <div className="d-block d-lg-none mb-4">
                <CategoriesMb categories={categories} />
              </div>
            </div>

            <div className="col-9">
              {/* <div className="row">
                                <div className="col-12">
                                    <ul className="breadcrumbProduct px-3 py-2 mb-2">
                                        <li className="d-inline-block">
                                            <a href="/productList/2">Shirt</a>
                                        </li>
                                        <li className="d-inline-block">
                                            <a href="/productList/16">Half Shirt</a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}

              {cartProducts.length > 0 &&
                cartProducts.map(({ breadcrumbs, products }) => (
                  <Fragment>
                    <div className="row">
                      <div className="col-12">
                        <ProductListBreadCrumb breadcrumbs={breadcrumbs} />
                      </div>
                    </div>

                    <div className="row">
                      {products.map((product) => (
                        <div className="col-md-4">
                          <Product_Card product={product} />
                        </div>
                      ))}
                    </div>
                  </Fragment>
                ))}

              {/* <div className="row">
                                <div className="col-md-4">
                                    <div className="card card-border-radious mb-3">
                                        <img src="https://admin.banijjo.com.bd/upload/product/productImages/2_2240x1680.png" className="card-img-top" alt="..." />
                                        <div className="card-body custom-card-padding">
                                            <div className="text-center">
                                                <h5 className="card-title">Juice Crd</h5>
                                                <p className="card-text">৳&nbsp;70</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-border-radious mb-3">
                                        <img src="https://admin.banijjo.com.bd/upload/product/productImages/2_2240x1680.png" className="card-img-top" alt="..." />
                                        <div className="card-body custom-card-padding">
                                            <div className="text-center">
                                                <h5 className="card-title">Juice Crd</h5>
                                                <p className="card-text">৳&nbsp;70</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-border-radious mb-3">
                                        <img src="https://admin.banijjo.com.bd/upload/product/productImages/2_2240x1680.png" className="card-img-top" alt="..." />
                                        <div className="card-body custom-card-padding">
                                            <div className="text-center">
                                                <h5 className="card-title">Juice Crd</h5>
                                                <p className="card-text">৳&nbsp;70</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6">
              <div className="card">
                <div className="card-header bg-dark text-light text-center"></div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src="https://admin.banijjo.com.bd/upload/product/productImages/2_2240x1680.png"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-4">
                      <h1 className="h5">Pname</h1>
                      <p className="mb-1">
                        Color:&nbsp;
                        <b>red</b>
                      </p>
                      <p className="mb-1">
                        Size:&nbsp;
                        <b>XL</b>
                      </p>
                      <p className="mb-1">
                        <em>৳&nbsp;</em> 1200
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="quantity">
                        <div className="quantity-select">
                          <div className="entry value-minus1">&nbsp;</div>
                          <div className="entry value1">
                            <span>10</span>
                          </div>
                          <div className="entry value-plus1 active">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="text-center">
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          style={{ fontSize: '24px', color: 'red' }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="text-right">
                    <p className="my-0">
                      {' '}
                      Total price:
                      <b>
                        <em>৳&nbsp;</em> 1200
                      </b>
                    </p>
                    <button
                      style={{ display: 'none' }}
                      id="LoginRegisterModalButton"
                      type="button"
                      data-toggle="modal"
                      data-target="#LoginRegisterModal"
                    ></button>
                    <button
                      style={{ display: 'none' }}
                      id="ShippingModalButton"
                      type="button"
                      data-toggle="modal"
                      data-target="#ShippingModal"
                    ></button>
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
                    <strong className="strong-left-subtotal">Subtotal</strong>
                    <div className="float-right">
                      <span>
                        <em>৳ &nbsp;</em>
                      </span>
                      <span>0</span>
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
                      <span>0</span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <strong>
                      Promo Code
                      <span
                        style={{ cursor: 'pointer' }}
                        className="badge badge-success btn-apply rounded"
                      >
                        Apply
                      </span>
                    </strong>
                    <div className="float-right">
                      <span>
                        <em>৳ &nbsp;</em>
                      </span>
                      <span>0</span>
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
                      <span>545</span>
                    </div>
                    <hr />
                  </div>
                  <button className="btn btn-primary btn-place-order">
                    Place Order
                  </button>
                  <button
                    className="btn btn-primary btn-continue-shop"
                    id="PromoCodeModalButton"
                    type="button"
                    data-toggle="modal"
                    data-target="#PromoCodeModal"
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
  }
}

export const getServerSideProps = async () => {
  let base = process.env.FRONTEND_SERVER_URL;

  let categories = await fetcher(`${base}/api/all_category_list`);
  categories = categories.data;

  let termsMessage = await fetcher(`${base}/api/get_terms_conditions`);
  termsMessage = termsMessage.data;

  return {
    props: {
      categories,

      customerName: '',
      customerAddress: '',
      customerPhone: '',

      email: '',
      password: '',
      loginError: '',
      // Categories: [],
      textArray: [],
      // allCategories: [],
      cartProducts: [],
      isAddress: false,
      checkAgreement: false,
      responseMessage: '',
      termsMessage: termsMessage,
      itemQuantityState: [],
      customerInfo: [],
      discountAmount: 0,
      promoCodeAmount: 0,
      discountDetail: [],
      promoCodeDetail: [],
      revisedCartData: [],
      cartProductsInfo: [],
      totalPrice: 0,
      totalItems: 0,
    },
  };
};

export default ShoppingCart;
