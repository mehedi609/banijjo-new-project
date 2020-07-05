import React, { Fragment } from 'react';
import Head from 'next/head';
import BaseLayout from '../../components/layout/base-layout';

import Product_Card from '../../components/shared/Product_Card';
import ProductListBreadCrumb from '../../components/shared/productListBreadCrumb';
import Categories from '../../components/home-page/mainCategories';
import CategoriesMb from '../../components/home-page/categories-mb';

import { fetcher } from 'utils/fetcher';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';

const ProductList = (props) => {

  const {    
    categories,
    productList
  } = props;
    
  console.log(productList);


  return (
    <BaseLayout>

      <Head>
        <title>Product List</title>
        <meta name="description" content="page containing list of products" />
      </Head>

      <div className="container">
        <div className="row">

          <div className="col-3">

            <div className="d-none d-lg-block">
              <Categories categories={categories} />
            </div>

            <div className="d-block d-lg-none mb-4">
              <CategoriesMb categories={categories} />
            </div>

          </div>

          <div className="col-9">
            { productList.length > 0 && productList.map(({ breadcrumbs, products }) => (
              <Fragment>

                <div className="row">
                  <div className="col-12">                    
                      <ProductListBreadCrumb breadcrumbs={breadcrumbs} />                    
                  </div>
                </div>

                <div className="row">
                  { products.map(product => (
                    <div className="col-md-4">                    
                      <Product_Card product={product} />
                    </div>
                  ))}
                </div>

              </Fragment>
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
      productList
    },
  };
};

export default ProductList;
