import React from 'react';
import Head from 'next/head';
import BaseLayout from 'components/layout/base-layout';

import Product_Card from 'components/shared/Product_Card';
import ProductListBreadCrumb from 'components/shared/productListBreadCrumb';
import CategoriesMb from 'components/home-page/category-sidebar/categories-mb';

import { fetcher } from 'utils/fetcher';
import MainCategoriesSidebar from 'components/home-page/category-sidebar/main-categories-sidebar';

const ProductList = ({ categories, productList }) => {
  return (
    <BaseLayout>
      <Head>
        <title>Product List</title>
        <meta name="description" content="page containing list of products" />
      </Head>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="d-none d-lg-block">
              <MainCategoriesSidebar categories={categories} />
            </div>

            <div className="d-block d-lg-none mb-4">
              <CategoriesMb categories={categories} />
            </div>
          </div>

          <div className="col-lg-9 col-md-12">
            {productList.length > 0 &&
              productList.map(({ breadcrumbs, products }) => (
                <>
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
                </>
              ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const base = process.env.FRONTEND_SERVER_URL;
  const { id } = params;

  let categories = await fetcher(`${base}/api/all_category_list`);
  categories = categories.data;
  const productList = await fetcher(`${base}/api/productListByCat/${id}`);

  return {
    props: {
      categories,
      productList,
    },
  };
};

export default ProductList;
