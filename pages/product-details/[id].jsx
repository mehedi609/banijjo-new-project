import React, { Fragment } from 'react';
import Head from 'next/head';
import Carousel from 'react-multi-carousel';
import BaseLayout from '../../components/layout/base-layout';
import SameVendorOrSameCatProducts from './SameVendorOrSameCatProducts';

import { fetcher } from 'utils/fetcher';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };

    this.addWishDirect = this.addWishDirect.bind(this);
    this.addWishLocal = this.addWishLocal.bind(this);
    this.createAccountNext = this.createAccountNext.bind(this);
    this.customerLoginSubmit = this.customerLoginSubmit.bind(this);

    console.log(this.state);
  }

  handleClickMinus = () => {
    this.setState((prevState) => ({
      productQuantity:
        prevState.productQuantity > 1
          ? prevState.productQuantity - 1
          : prevState.productQuantity,
    }));
  };

  handleClickPlus = () => {
    this.setState((prevState) => ({
      productQuantity:
        prevState.productQuantity < 5
          ? prevState.productQuantity + 1
          : prevState.productQuantity,
    }));
  };

  productDescriptions() {
    let descriptionText = [];
    if (this.state.product_full_description.length > 0) {
      this.state.product_full_description.forEach((item, key) => {
        descriptionText.push(
          <React.Fragment key={key}>
            <h3>{item.title}</h3>
            {item.descriptionImage ? (
              <img
                src={
                  fileUrl +
                  '/upload/product/productDescriptionImages/' +
                  item.descriptionImage
                }
                alt={''}
              />
            ) : (
              ''
            )}

            <p>{item.description}</p>
          </React.Fragment>
        );
      });
    } else {
      descriptionText.push(
        <p style={{ color: '#ec1c24' }}>No Descriptions Added</p>
      );
    }
    return descriptionText;
  }

  specificationDetailsPart() {
    const spcArray = [];
    if (this.state.product_specification_name.length > 1) {
      this.state.product_specification_name.forEach((item, key) => {
        if (key === 1) {
          spcArray.push(<h5>{item.specificationName.toUpperCase()} :</h5>);
          this.state.product_specification_name.forEach((item1, key1) => {
            if (item.specificationName === item1.specificationName) {
              spcArray.push(
                <div className="colr ert">
                  <div className="check">
                    <label className="checkbox">
                      <input type="checkbox" name="checkbox" checked="" />
                      <i> </i>
                      {item1.specificationNameValue}
                    </label>
                  </div>
                </div>
              );
            }
          });
          spcArray.push(<div className="clearfix"> </div>);
        }
      });
    }
    return spcArray;
  }

  isSelectedProductExists = () => {
    const { productId, selectedSizeId, selectedColorId } = this.state;

    const selectedProduct = {
      productId,
      colorId: selectedColorId === '' ? 0 : selectedColorId * 1,
      sizeId: selectedSizeId === '' ? 0 : selectedSizeId * 1,
    };

    const isExists = this.state.combinations.filter((item) => {
      const newItem = { ...item };
      delete newItem.quantity;
      return isEqual(newItem, selectedProduct);
    });

    if (isExists.length > 0) {
      this.setState({ selectedProductStockAmount: isExists[0].quantity });
      return true;
    }

    return false;
  };

  updateLocalStorage = (key) => {
    //
  };

  addToLocalStorage = (data) => (e) => {
    // debugger;
    const {
      productId,
      selectedSizeId,
      selectedColorId,
      productQuantity,
      onlyColor,
      onlySize,
      noColorAndSize,
    } = this.state;

    if (onlyColor) {
      if (this.state.selectedColorId === '') {
        this.showAlert('Please Select a Color');
        return;
      }
    } else if (onlySize) {
      if (this.state.selectedSizeId === '')
        this.showAlert('Please Select a Size');
    } else if (!noColorAndSize) {
      if (this.state.selectedColorId === '') {
        this.showAlert('Please Select a Color');
        return;
      }

      if (this.state.selectedSizeId === '') {
        this.showAlert('Please Select a Size');
        return;
      }
    }

    if (!this.isSelectedProductExists()) {
      this.showAlert('Product is Out of Stock!');
      return;
    }

    const cartObj = {
      productId,
      colorId: selectedColorId === '' ? 0 : selectedColorId * 1,
      sizeId: selectedSizeId === '' ? 0 : selectedSizeId * 1,
      quantity: productQuantity * 1,
    };

    if (!localStorage.customer_id) {
      const cartDataExisting = JSON.parse(localStorage.getItem(data));

      if (cartDataExisting && cartDataExisting.length) {
        localStorage.removeItem(data);
        let cardUpdated = false;

        const revisedCartData = cartDataExisting.map((item) => {
          const { productId, colorId, sizeId, quantity } = item;
          if (
            productId === cartObj.productId &&
            colorId === cartObj.colorId &&
            sizeId === cartObj.sizeId
          ) {
            item.quantity = quantity + cartObj.quantity;
            cardUpdated = true;
          }

          item.quantity = item.quantity >= 5 ? 5 : item.quantity;
          return item;
        });

        if (!cardUpdated) revisedCartData.push(cartObj);
        localStorage.setItem(data, JSON.stringify(revisedCartData));
      } else {
        localStorage.setItem(data, JSON.stringify([{ ...cartObj }]));
      }
      let id = '';
      if (data === 'cart') id = 'successCartMessage';
      else if (data === 'wish') id = 'WishListModalButton';
      var link = document.getElementById(id);
      link.click();
    } else {
      fetch(base + '/api/add_cart_direct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cartObj,
          customerId: localStorage.customer_id * 1,
          buttonClick: data,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          if (response.data === true) {
            let id = '';
            if (data === 'cart') id = 'successCartMessage';
            else if (data === 'wish') id = 'WishListModalButton';
            var link = document.getElementById(id);
            link.click();
          }
        });
    }
  };

  addCartDirect = (data) => (e) => {
    fetch(base + '/api/add_cart_direct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: this.state.productId,
        customerId: localStorage.customer_id,
        quantity: this.state.productQuantity,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.data === true) {
          var link = document.getElementById('successCartMessage');
          link.click();
        }
      });
  };

  addWishLocal = (data) => {
    console.log({ data });

    /*let wishArr = [
      { productId: this.state.productId, quantity: this.state.productQuantity }
    ];
    let wishDataExisting = JSON.parse(localStorage.getItem("wish"));
    localStorage.removeItem("wish");
    if (wishDataExisting) {
      wishDataExisting.push({
        productId: this.state.productId,
        quantity: this.state.productQuantity
      });
      localStorage.setItem("wish", JSON.stringify(wishDataExisting));
    } else {
      localStorage.setItem("wish", JSON.stringify(wishArr));
    }
    var link = document.getElementById("WishListModalButton");
    link.click();*/
  };

  addWishDirect() {
    fetch(base + '/api/add_wish_direct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: this.state.productId,
        customerId: localStorage.customer_id,
        quantity: this.state.productQuantity,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.data === true) {
          var link = document.getElementById('WishListModalButton');
          link.click();
        }
      });
  }

  customerLoginSubmit(event) {
    event.preventDefault();
    fetch(base + '/api/loginCustomerInitial', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: event.target.emailField.value,
        password: event.target.passwordField.value,
        productId: this.state.productId,
        quantity: this.state.productQuantity,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log('aa', response);
        if (response.data !== '') {
          localStorage.setItem('customer_id', response.data);
          var link = document.getElementById('successCartMessage');
          var hide = document.getElementById('hideLogin');
          hide.click();
          link.click();
        }
      });
  }

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
      fetch(base + '/api/saveCustomerInitial', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
          productId: this.state.productId,
          quantity: this.state.productQuantity,
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

  selectSizeHandler = (e) => {
    this.setState({ selectedSizeId: e.target.value });
  };

  selectColorHandler = (e) => {
    this.setState({
      selectedColorId: e.target.id,
      selectedColorName: e.target.name,
    });
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

  render() {
    const {
      category_id,
      vendor_id,

      product_id,
      productName,
      productQuantity,

      homeImage,
      showClickedImage,
      product_full_description,
      carouselImages,
      qc_status,
      product_sku,
      productPrice,
      metaTags,

      colors,
      sizes,
      onlyColor,
      onlySize,
      noColorAndSize,
      colorAndSize,

      selectedSizeId,
      selectedColorId,
      selectedColorName,

      combinations,
      discountAmount,
      product_list_same_vendor_other_cat,
      product_list_same_category_other_ven,
    } = this.state;

    return (
      <BaseLayout>
        <Head>
          <title>Product Detail</title>
          <meta name="description" content="page containing product details" />
          <link rel="stylesheet" href="/css/product-details.css" />

          <script
            type="text/javascript"
            src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"
          ></script>
        </Head>

        <div className="container">
          <div className="d-none d-lg-block mt-2">
            <div className="row">
              <div className="col-4">Zoom Images</div>

              <div className="col-8">
                <h1 className="h4 mb-n1">{productName}</h1>

                <div className="row">
                  <div className="col-12">
                    {/* Color Selection  */}
                    {colors.length > 0 && (
                      <div className="color-quality mt-3">
                        <h6>Color: {selectedColorName}</h6>
                        <div className="row">
                          {colors.map(
                            ({ colorId, imageName, colorName, seletected }) => (
                              <div key={colorId} className="col-1 mb-1">
                                <img
                                  src={`${fileUrl}/upload/product/productImages/${imageName}`}
                                  onClick={this.selectColorHandler}
                                  className="img-fluid"
                                  id={colorId}
                                  name={colorName}
                                  alt={colorName}
                                  width="50"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    {/* Sizes Selection  */}
                    {sizes.length > 0 && (
                      <div className="d-inline-block mr-5 mt-2">
                        <h6>Size: </h6>
                        <select
                          className="form-control rounded-0"
                          value={selectedSizeId}
                          onChange={this.selectSizeHandler}
                        >
                          <option value="">Select a Size</option>
                          {sizes.map(({ id, size, size_type_id }) => (
                            <option value={id} key={id}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Quantity Selection */}
                    <div className="d-inline-block  mt-3">
                      <h6>Quantity</h6>
                      <div className="quantity">
                        <div className="quantity-select">
                          <div
                            onClick={this.handleClickMinus}
                            className="value-minus"
                          >
                            &nbsp;
                          </div>
                          <div className="value">
                            <span>{this.state.productQuantity}</span>
                          </div>
                          <div
                            onClick={this.handleClickPlus}
                            className="value-plus active"
                          >
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Price */}
                <div className="simpleCart_shelfItem mt-3">
                  <p>
                    {this.state.discountAmount === 0 ? (
                      <Fragment>
                        <i className="item_price">
                          ৳&nbsp;{this.state.productPrice}
                        </i>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span>৳{this.state.productPrice}</span>{' '}
                        <i className="item_price">
                          ৳{this.state.productPrice - this.state.discountAmount}
                        </i>
                      </Fragment>
                    )}
                  </p>
                  <button
                    className="btn btn-outline-success rounded-0 mr-3"
                    onClick={this.addToLocalStorage('cart')}
                  >
                    Add to cart
                  </button>
                  <button
                    className="btn btn-outline-success rounded-0"
                    onClick={this.addToLocalStorage('wish')}
                  >
                    Add to wish list
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* OVERVIEW, CUSTOMER REVIEWS, SPECIFICATIONS */}
          <div className="row">
            <div className="col-12">
              <div className="sap_tabs mt-4">
                <div id="horizontalTab1">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a
                        className="d-inline-block resp-tab-item px-3  py-1 m-1"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        OVERVIEW
                      </a>
                      <a
                        className="d-inline-block resp-tab-item px-3 py-1 m-1"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#nav-profile"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        CUSTOMER REVIEWS
                      </a>
                      <a
                        className="d-inline-block resp-tab-item px-3 py-1 m-1"
                        id="nav-contact-tab"
                        data-toggle="tab"
                        href="#nav-contact"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        SPECIFICATIONS
                      </a>
                    </div>
                  </nav>

                  <div className="tab-content pl-1" id="nav-tabContent">
                    <div
                      className="tab-pane resp-tab-content additional_info_grid p-4 fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      OVERVIEW
                    </div>

                    <div
                      className="tab-pane resp-tab-content additional_info_grid p-4 fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      CUSTOMER REVIEWS
                    </div>

                    <div
                      className="tab-pane resp-tab-content additional_info_grid p-4 fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      SPECIFICATIONS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END OF  OVERVIEW, CUSTOMER REVIEWS, SPECIFICATIONS */}

          {/*Same Category - Other Vendor Products*/}
          {product_list_same_category_other_ven.length > 0 && (
            <div className="row">
              <div className="col-12">
                <SameVendorOrSameCatProducts
                  vorc={'c'}
                  id={category_id}
                  products={product_list_same_category_other_ven}
                />
              </div>
            </div>
          )}

          {/*Same Vendor - Other Category Products*/}
          {product_list_same_vendor_other_cat.length > 0 && (
            <div className="row">
              <div className="col-12">
                <SameVendorOrSameCatProducts
                  vorc={'v'}
                  id={vendor_id}
                  products={product_list_same_vendor_other_cat}
                />
              </div>
            </div>
          )}
        </div>
        {/* END OF CONTAINER  */}
      </BaseLayout>
    );
  }
}

export const getServerSideProps = async ({ params }) => {
  const base = process.env.FRONTEND_SERVER_URL;
  const { id } = params;

  let combinations = await fetcher(
    `${base}/api/productCombinationsFromStock/${id}`
  );
  combinations = combinations.combinations;

  let discountAmount = await fetcher(
    `${base}/api/getDiscountByProductId/${id}`
  );
  discountAmount = discountAmount.discountAmount;

  let product_list_same_vendor_other_cat = await fetcher(
    `${base}/api/sameVendorOrCat/${id}/v`
  );
  product_list_same_vendor_other_cat =
    product_list_same_vendor_other_cat.sameVendorOrCat;

  let product_list_same_category_other_ven = await fetcher(
    `${base}/api/sameVendorOrCat/${id}/c`
  );
  product_list_same_category_other_ven =
    product_list_same_category_other_ven.sameVendorOrCat;

  // let test = {
  //   category_id: 4,
  //   discountAmount: 0,
  //   home_image: "5_2240x1680.png",
  //   newProduct: 0,
  //   productPrice: 500,
  //   product_id: 1,
  //   product_name: "Basket",
  //   product_sku: "BNJ-00027-00001",
  //   vendor_id: 27
  // }
  // product_list_same_category_other_ven.push(test)

  const productDetails = await fetcher(`${base}/api/productDetails/${id}`);
  const {
    product_name,
    productPrice,
    home_image,
    category_id,
    vendor_id,
    metaTags,
    colors,
    sizes,
    carouselImages,
    description,
    qc_status,
    product_sku,
  } = productDetails;

  return {
    props: {
      category_id,
      vendor_id,

      product_id: id,
      productName: product_name,
      productQuantity: 1,

      homeImage: !!home_image ? home_image : 'default.png',
      showClickedImage: !!home_image ? home_image : 'default.png',
      product_full_description: description,
      carouselImages: !!carouselImages && carouselImages,
      qc_status: !!qc_status && qc_status,
      product_sku: !!product_sku && product_sku,
      productPrice: !!productPrice && productPrice,
      metaTags: !!metaTags && metaTags,

      colors,
      sizes,
      onlyColor: colors.length > 0 && sizes.length === 0,
      onlySize: sizes.length > 0 && colors.length === 0,
      noColorAndSize: colors.length === 0 && sizes.length === 0,
      colorAndSize: colors.length > 0 && sizes.length > 0,

      selectedSizeId: '',
      selectedColorId: '',
      selectedColorName: '',

      combinations,
      discountAmount,
      product_list_same_vendor_other_cat,
      product_list_same_category_other_ven,
    },
  };
};

export default ProductDetails;
