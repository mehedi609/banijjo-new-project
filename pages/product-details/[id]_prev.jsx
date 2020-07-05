import React from 'react';
import Head from 'next/head';

import BaseLayout from '../../components/layout/base-layout';

import { fetcher } from 'utils/fetcher';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';

const ProductDetail = (props) => {
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
  } = props;

  console.log(props);

  return (
    <BaseLayout>
      <Head>
        <title>Product Detail</title>
        <link rel="stylesheet" href="/css/product-details.css" />
      </Head>

      <div className="container">
        <div className="d-none d-lg-block mt-2">
          <div className="row">
            <div className="col-4">Zoom Image</div>

            <div className="col-8">
              <h1 className="h4 mb-n1">{product_name}</h1>

              <div className="row">
                <div className="col-12">
                  <div className="color-quality mt-3">
                    <h6>Color:</h6>
                    <div className="row">
                      {colors.length > 0 &&
                        colors.map((color) => (
                          <div className="col-1 mb-1" key={color.colorId}>
                            <img
                              src={`${fileUrl}/upload/product/productImages/${color.imageName}`}
                              className="img-fluid"
                              id={color.colorId}
                              name={color.colorName}
                              alt={color.colorName}
                              width="50"
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="d-inline-block mr-5 mt-2">
                    <h6>Size: </h6>
                    <select className="form-control rounded-0">
                      <option>Select a Size</option>
                      <option value="6">Xl</option>
                    </select>
                  </div>
                  <div className="d-inline-block  mt-3">
                    <h6>Quantity</h6>
                    <div className="quantity">
                      <div className="quantity-select">
                        <div className="value-minus">&nbsp;</div>
                        <div className="value">
                          <span>1</span>
                        </div>
                        <div className="value-plus active">&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="simpleCart_shelfItem mt-3">
                <p>
                  <i>৳&nbsp;{productPrice}</i>
                </p>
                <button className="btn btn-outline-success rounded-0 mr-3">
                  Add to cart
                </button>
                <button className="btn btn-outline-success rounded-0">
                  Add to wish list
                </button>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const base = process.env.FRONTEND_SERVER_URL;
  const { id } = params;
  const selectedCatVal = 0;

  const res = await fetcher(`${base}/api/productDetails/${id}`);

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
  } = res;

  return {
    props: {
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
    },
  };
};

export default ProductDetail;
