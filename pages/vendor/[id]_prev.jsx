import React, { useState, Fragment } from 'react';
import Head from 'next/head';

import BaseLayout from '../../components/layout/base-layout';

import Product_Card from '../../components/shared/Product_Card';

import { fetcher } from 'utils/fetcher';
import {
  calDiscountPercentage,
  capitalizeStr,
  shorten_the_name,
} from 'utils/utils';

const { sampleSize } = require('lodash');

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';

const Vendor = (props) => {
  const { vendorInfo, categoriesArr, selectedCatVal, dataSet, items } = props;

  console.log(props);

  const dataForAllCat = (dataSet) => {
    return dataSet.map((item) => ({
      ...item,
      products: sampleSize(item.products, 8),
      seeMore: false,
    }));
  };

  const dataForSingleCat = (dataSet, catId) => (e) => {
    const items = dataSet.filter((item) => item.categoryId === catId);
    return items.map((item) => ({
      ...item,
      seeMore: true,
    }));
  };

  const onChangeCatHandler = (e) => {
    const selectedCatVal = e.target.value * 1;
    if (selectedCatVal !== 0) {
      const items = dataForSingleCat(dataSet, selectedCatVal);
      // this.setState({ selectedCatVal, items });
    } else if (selectedCatVal === 0) {
      const items = dataForAllCat(dataSet, selectedCatVal);
      // this.setState({ selectedCatVal, items });
    }
  };

  const onClickHandler = (data) => (e) => {
    console.log(dataSet, data);
    // const fullItems = this.dataForSingleCat(this.state.dataSet, data);
    // this.setState(prevState => {
    //   const items = prevState.items.map(item =>
    //     item.categoryId === data ? fullItems[0] : item
    //   );
    //   return { items };
    // });
  };

  return (
    <BaseLayout>
      <Head>
        <title>Vendor Details</title>
        <meta
          name="description"
          content="page containing products of specific vendor"
        />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-2 col-lg-1">
            <img
              src={fileUrl + '/upload/vendor/' + vendorInfo.logo}
              className="img-fluid mb-1"
              alt={vendorInfo.name}
              title={vendorInfo.name}
            />
          </div>
          <div className="col-4 col-lg-8">
            <h1 className="h5 pt-3">{capitalizeStr(vendorInfo.name)}</h1>
          </div>
          <div className="col-6 col-lg-3">
            <label id="lbl-select-category"></label>
            <select
              className="custom-select mt-2"
              defaultValue={selectedCatVal}
              onChange={onChangeCatHandler}
              aria-labelledby="lbl-select-category"
            >
              <option value="0">All Categories</option>
              {categoriesArr.map((item) => (
                <option value={item.category_id} key={item.category_id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <img
              className="img-fluid"
              style={{ width: '100%', ojbectFit: 'cover' }}
              src={fileUrl + '/upload/vendor/' + vendorInfo.cover_photo}
              alt={vendorInfo.name}
              title={vendorInfo.name}
            />
          </div>
        </div>

        {items.length > 0 &&
          items.map((item) => (
            <Fragment key={item.categoryId}>
              <div className="row">
                <div className="col-12">
                  <h1 className="h5 vendor-title py-1 px-2 mt-2">
                    {capitalizeStr(item.categoryName)}
                  </h1>
                </div>
              </div>

              <div className="row">
                {item.products.length > 0 &&
                  item.products.map((product) => (
                    <div className="col-md-3" key={product.product_id}>
                      <Product_Card product={product} />
                    </div>
                  ))}
              </div>

              {!item.seeMore && (
                <div className="row">
                  <div className="offset-md-5 col-md-2 text-center">
                    <button
                      type="submit"
                      className="btn-sm btn-success btn-color rounded-0  mt-2 mb-2"
                      onClick={onClickHandler(item.categoryId)}
                      aria-label="See More Button"
                    >
                      See More
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const base = process.env.FRONTEND_SERVER_URL;
  const { id } = params;
  const selectedCatVal = 0;

  let vendorInfo = await fetcher(`${base}/api/vendorInfoById/${id}`);
  vendorInfo = vendorInfo.vendorInfo;

  let categoriesArr = await fetcher(`${base}/api/categoriesByVendorId/${id}`);
  categoriesArr = categoriesArr.result;

  let dataSet = await fetcher(`${base}/api/getVendorProductsByCategory/${id}`);
  dataSet = dataSet.result;

  const items = dataSet.map((item) => ({
    ...item,
    products: sampleSize(item.products, 8),
    seeMore: false,
  }));

  return {
    props: {
      vendorInfo,
      categoriesArr,
      selectedCatVal,
      dataSet,
      items,
    },
  };
};

export default Vendor;
