import React, { useState } from 'react';
import Head from 'next/head';

import InfiniteScroll from 'react-infinite-scroll-component';

import { capitalizeStr } from 'utils/utils';
import { fetcher } from 'utils/fetcher';

import BaseLayout from 'components/layout/base-layout';
import MainSlider from 'components/home-page/main-slider';
import SubSlider from 'components/home-page/sub-slider';

import ProductCard from 'components/shared/product-card';

import CategoriesMb from '../components/home-page/category-sidebar/categories-mb';

import VendorCarouselSlider from '../components/home-page/vendor-carousel-slider';
import MainCategoriesSidebar from '../components/home-page/category-sidebar/main-categories-sidebar';
import HotDealSlider from '../components/home-page/hot-deal-slider';
import ListingFeaturedCategoryTree from '../components/home-page/listing-featured-category-tree';

const Home = (props) => {
  const {
    mainSliderImages,
    bannerImages,
    hotDeals,
    topSelectionBig,
    topSelection,
    newForYou,
    storesWillLove,
    others,
    categories,
    vendors,
    featuredCategories,
  } = props;

  const [otherProducts, setOtherProducts] = useState(others.products);
  const [otherProductsDesk, setOtherProductsDesk] = useState([
    ...others.products.slice(0, 5),
  ]);
  const [otherProductsMb, setOtherProductsMb] = useState([
    ...others.products.slice(0, 6),
  ]);

  const [visibleDesk, setVisibleDesk] = useState(5);
  const [visibleMb, setVisibleMb] = useState(6);

  const hotDealProducts = hotDeals.products;
  const bannerImagesProducts = bannerImages.products;
  const topSelectionProducts = topSelection.products.slice(0, 3);
  const topSelectionBigProducts = topSelectionBig.products.slice(0, 3);
  const newForYouProducts = topSelectionBig.products.slice(0, 2);
  const storesWillLoveProducts = storesWillLove.products.slice(0, 2);

  const fetchMoreDataDesk = () => {
    setTimeout(() => {
      setOtherProductsDesk([
        ...otherProductsDesk,
        ...otherProducts.slice(visibleDesk, visibleDesk + 5),
      ]);
      setVisibleDesk(visibleDesk + 5);
    }, 300);
  };

  const fetchMoreDataMb = () => {
    setTimeout(() => {
      setOtherProductsMb([
        ...otherProductsMb,
        ...otherProducts.slice(visibleMb, visibleMb + 6),
      ]);
      setVisibleMb(visibleMb + 6);
    }, 300);
  };

  return (
    <>
      <BaseLayout>
        <Head>
          <title>Banijjo | বাণিজ্য : দেশ - ই - বাজার</title>
          <link rel="stylesheet" href="/css/home-page.css" />
        </Head>

        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="d-none d-lg-block">
                {/* <h2>Categories Desktop</h2> */}
                {/*<Categories categories={categories} />*/}
                <MainCategoriesSidebar categories={categories} />
              </div>

              <div className="d-block d-lg-none mb-4">
                <CategoriesMb categories={categories} />
              </div>
            </div>

            <div className="col-lg-9 col-md-12">
              <MainSlider images={mainSliderImages} />
              <SubSlider products={bannerImagesProducts} />
            </div>
          </div>

          <div className="mt-4">
            <h1 className="h5">{capitalizeStr(hotDeals.title)}</h1>
            <HotDealSlider products={hotDealProducts} />
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-12">
                  <h1 className="h5 float-left">{topSelection.title}</h1>
                  <div className="float-right see-more">
                    <a href="#">See more</a>
                  </div>
                </div>
              </div>

              <div className="row">
                {topSelectionProducts.map((product) => (
                  <div className="col-4" key={product.product_id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 col-md-12 mt-3 mt-lg-0">
              <div className="row">
                <div className="col-12">
                  <h1 className="h5 float-left">{topSelectionBig.title}</h1>
                  <div className="float-right see-more">
                    <a href="#">See more</a>
                  </div>
                </div>
              </div>

              <div className="row">
                {topSelectionBigProducts.map((product) => (
                  <div className="col-4" key={product.product_id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-12">
                  <h1 className="h5 float-left">
                    {capitalizeStr(newForYou.title)}
                  </h1>
                  <div className="float-right see-more">
                    <a href="#">See more</a>
                  </div>
                </div>
              </div>

              <div className="row">
                {newForYouProducts.map((product) => (
                  <div className="col-6" key={product.product_id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 col-md-12 mt-3 mt-lg-0">
              <div className="row">
                <div className="col-12">
                  <h1 className="h5 float-left">{storesWillLove.title}</h1>
                  <div className="float-right see-more">
                    <a href="#">See more</a>
                  </div>
                </div>
              </div>

              <div className="row">
                {storesWillLoveProducts.map((product) => (
                  <div className="col-6" key={product.product_id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="h5">{capitalizeStr(vendors.title)}</h1>
            <VendorCarouselSlider vendors={vendors.vendors} />
          </div>

          <div className="mt-4">
            <h1 className="h5">Featured Categories</h1>
            <ListingFeaturedCategoryTree
              featuredCategories={featuredCategories}
            />
          </div>

          <div className="d-none d-lg-block mt-4">
            <h1 className="h5">{capitalizeStr(others.title)}</h1>

            <div className="row">
              <InfiniteScroll
                dataLength={otherProductsDesk.length}
                next={fetchMoreDataDesk}
                hasMore={true}
                // loader={<CustomSpinner />}
              >
                {otherProductsDesk.map((product) => (
                  <div
                    className="col-md-5ths mb-3 custom-fade-in"
                    key={product.product_id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>

          <div className="d-block d-lg-none mt-4">
            <h1 className="h5">{capitalizeStr(others.title)}</h1>

            <div className="row">
              <InfiniteScroll
                dataLength={otherProductsMb.length}
                next={fetchMoreDataMb}
                hasMore={true}
                // loader={<CustomSpinner />}
              >
                {otherProductsMb.map((product) => (
                  <div
                    className="col-3ths mb-3 custom-fade-in"
                    key={product.product_id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const base = process.env.FRONTEND_SERVER_URL;

  const res = await fetcher(`${base}/api/feature_product_list`);
  const res2 = await fetcher(`${base}/api/top_main_banners`);
  const res3 = await fetcher(`${base}/api/all_category_list`);
  const res_vendor = await fetcher(`${base}/api/vendors`);
  const featuredCategories = await fetcher(`${base}/api/feature_category`);

  const mainSliderImages = res2.data;
  const categories = res3.data;
  const vendors = res_vendor.data;

  const resultArr = res.data;

  let bannerImages = null;
  let hotDeals = null;
  let topSelection = null;
  let topSelectionBig = null;
  let newForYou = null;
  let storesWillLove = null;
  let others = null;

  for (const resultArrElement of resultArr) {
    const key = Object.keys(resultArrElement)[0];

    if (key === '1') {
      bannerImages = resultArrElement['1'];
    } else if (key === '2') {
      hotDeals = resultArrElement['2'];
    } else if (key === '3') {
      topSelection = resultArrElement['3'];
    } else if (key === '4') {
      newForYou = resultArrElement['4'];
    } else if (key === '5') {
      topSelectionBig = resultArrElement['5'];
    } else if (key === '6') {
      storesWillLove = resultArrElement['6'];
    } else if (key === '7') {
      others = resultArrElement['7'];
    }
  }

  return {
    props: {
      mainSliderImages,
      bannerImages,
      hotDeals,
      topSelectionBig,
      topSelection,
      newForYou,
      storesWillLove,
      others,
      categories,
      vendors,
      featuredCategories,
    },
  };
};

export default Home;
