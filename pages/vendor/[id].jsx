import React from 'react';
import Head from 'next/head';
import BaseLayout from 'components/layout/base-layout';
import { fetcher } from 'utils/fetcher';
import { capitalizeStr } from 'utils/utils';
import ProductCard from 'components/shared/product-card';
const { sampleSize } = require('lodash');

const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

class Vendor extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }*/

  state = { ...this.props };

  dataForAllCat(dataSet) {
    return dataSet.map((item) => ({
      ...item,
      products: sampleSize(item.products, 8),
      seeMore: false,
    }));
  }

  dataForSingleCat(dataSet, catId) {
    const items = dataSet.filter((item) => item.categoryId === catId);
    return items.map((item) => ({
      ...item,
      seeMore: true,
    }));
  }

  onChangeCatHandler = (e) => {
    const selectedCatVal = e.target.value * 1;
    if (selectedCatVal !== 0) {
      const items = this.dataForSingleCat(this.state.dataSet, selectedCatVal);
      this.setState({ selectedCatVal, items });
    } else if (selectedCatVal === 0) {
      const items = this.dataForAllCat(this.state.dataSet, selectedCatVal);
      this.setState({ selectedCatVal, items });
    }
  };

  onClickHandler = (data) => (e) => {
    const fullItems = this.dataForSingleCat(this.state.dataSet, data);
    this.setState((prevState) => {
      const items = prevState.items.map((item) =>
        item.categoryId === data ? fullItems[0] : item
      );
      return { items };
    });
  };

  render() {
    const { vendorInfo, categoriesArr, selectedCatVal, items } = this.state;

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
          <div className="row mt-2">
            <div className="col-2 col-lg-1">
              <img
                src={fileUrl + '/upload/vendor/' + vendorInfo.logo}
                className="img-fluid"
                alt={vendorInfo.name}
                title={vendorInfo.name}
              />
            </div>

            <div className="col-4 col-lg-8">
              <h1 className="h5 pt-3">{capitalizeStr(vendorInfo.name)}</h1>
            </div>

            <div className="col-6 col-lg-3">
              <select
                onChange={this.onChangeCatHandler}
                className="custom-select mt-2"
                defaultValue={selectedCatVal}
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

          <div className="row mt-3 mb-4">
            <div className="col-12">
              <img
                className="img-fluid"
                style={{ width: '100%', ojbectFit: 'cover' }}
                src={`${fileUrl}/upload/vendor/${vendorInfo.cover_photo}`}
                alt={vendorInfo.name}
                title={vendorInfo.name}
              />
            </div>
          </div>

          {items.length > 0 &&
            items.map((item) => (
              <div key={item.categoryId}>
                <div className="row mt-2">
                  <div className="col-12">
                    <h1 className="h5 vendor-title py-2 pl-2">
                      {capitalizeStr(item.categoryName)}
                    </h1>
                  </div>
                </div>

                <div className="row mt-1">
                  {item.products.length > 0 &&
                    item.products.map((product) => (
                      <div
                        className="col-md-3 mb-md-3 mb-sm-2"
                        key={product.product_id}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                </div>

                {!item.seeMore && (
                  <div className="row mb-3">
                    {/*<div className="offset-md-5 col-md-2 text-center">*/}
                    <div className="col-12">
                      <button
                        type="submit"
                        onClick={this.onClickHandler(item.categoryId)}
                        className="btn btn-sm btn-primary rounded-0 d-block mx-auto"
                        aria-label="See More Button"
                      >
                        See More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        <style jsx>{`
          .vendor-title {
            color: #565356;
            background-color: #d0d2d7;
          }
        `}</style>
      </BaseLayout>
    );
  }
}

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
