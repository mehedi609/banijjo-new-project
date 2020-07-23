import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
  calDiscountPercentage,
  capitalizeStr,
  shorten_the_name,
} from '../../utils/utils';

// import "./ListingFeaturedCat.css";

// const fileUrl = process.env.REACT_APP_FILE_URL;
const fileUrl = 'https://admin.banijjo.com.bd/';
const base = process.env.FRONTEND_SERVER_URL;

const img_src = `${fileUrl}/upload/product/productImages/`;

const style = { marginTop: '5px', marginBottom: '5px' };
const style_see_more = {
  float: 'right',
  color: '#009345',
  fontSize: '11px',
  fontWeight: 'normal',
};

const ListingFeaturedCat = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${base}/api/feature_category`)
      .then((res) => setFeaturedCategories(res.data));
  }, []);

  return (
    <Fragment>
      {featuredCategories.length > 0 &&
        featuredCategories.map(
          (item, index) =>
            item.parent !== null && (
              <Fragment>
                {/*Desktop View*/}
                <div className="row categoryFeatureDivDes">
                  {index === 0 && (
                    <h1
                      className="categoryHeading"
                      style={{ ...style, paddingLeft: '15px' }}
                    >
                      Featured Categories
                    </h1>
                  )}

                  <div className="medium-4 columns">
                    <div className="row">
                      <div className="medium-2 columns">
                        <p className="gap">&nbsp;</p>
                        <p className="gap">&nbsp;</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-8 featureCatBigImgageFirst">
                        <div className="frameFeatureCat">
                          <a href={`/productDetails/${item.parent.product_id}`}>
                            <span className="helperframeFeatureCat">
                              {item.parent.newProduct === 1 && (
                                <span className="featuredcatoneimage_new_label_topSelection">
                                  New
                                </span>
                              )}
                              {item.parent.discountAmount !== 0 && (
                                <span className="featuredcatoneimage_new_label_discount_topSelection">
                                  {calDiscountPercentage(
                                    item.parent.discountAmount,
                                    item.parent.productPrice
                                  )}
                                  %
                                </span>
                              )}

                              <img
                                src={`${img_src}${item.parent.home_image}`}
                                alt={item.parent.product_name}
                                title={capitalizeStr(item.parent.product_name)}
                              />
                            </span>
                          </a>
                        </div>

                        <div className="product-content-topSelection ">
                          <h3 className="featuredcatoneimage_title_topSelection">
                            <a
                              href={`/productDetails/${item.parent.product_id}`}
                              className="aclass"
                            >
                              {capitalizeStr(
                                shorten_the_name(item.parent.product_name)
                              )}
                            </a>
                          </h3>

                          <div className="featuredcatoneimage_price_topSelection">
                            ৳&nbsp;
                            {item.parent.productPrice -
                              item.parent.discountAmount}
                            {item.parent.discountAmount > 0 && (
                              <span>৳&nbsp;{item.parent.productPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p>{''}</p>

                      <div className="col-md-4">
                        <div className="row featureCatBigImgMob">
                          {item.subCat.length > 0 &&
                            item.subCat.map((product) => (
                              <Fragment>
                                <div
                                  className="col-md-12 featureCatsmOne"
                                  style={{
                                    float: 'left',
                                    marginBottom: '35px',
                                  }}
                                >
                                  <div className="frameFeatureCatSmTwo">
                                    <a
                                      href={`/productDetails/${product.product_id}`}
                                    >
                                      <span className="helperframeFeatureCatSmTwo">
                                        {product.newProduct === 1 && (
                                          <span className="featuredcattwoimage_new_label_topSelection">
                                            New
                                          </span>
                                        )}
                                        {product.discountAmount !== 0 && (
                                          <span className="featuredcattwoimage_new_label_discount_topSelection">
                                            {calDiscountPercentage(
                                              product.discountAmount,
                                              product.productPrice
                                            )}
                                            %
                                          </span>
                                        )}
                                        <img
                                          src={`${img_src}${product.home_image}`}
                                          alt={product.product_name}
                                          title={capitalizeStr(
                                            product.product_name
                                          )}
                                        />
                                      </span>
                                    </a>
                                  </div>

                                  <div
                                    className="product-content-topSelection "
                                    style={{ paddingRight: '9px' }}
                                  >
                                    <h3 className="featuredcattwoimage_title_topSelection">
                                      <a
                                        href={`/productDetails/${product.product_id}`}
                                        className="aclass"
                                      >
                                        {capitalizeStr(
                                          shorten_the_name(product.product_name)
                                        )}
                                      </a>
                                    </h3>
                                    <div className="featuredcattwoimage_price_topSelection">
                                      ৳&nbsp;
                                      {product.productPrice -
                                        product.discountAmount}
                                      {product.discountAmount > 0 && (
                                        <span>
                                          ৳&nbsp;{product.productPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            ))}
                        </div>
                      </div>

                      <div className="medium-4 columns">{''}</div>
                    </div>
                  </div>

                  {item.tree1.length > 0 && (
                    <div className="medium-8 columns">
                      {showingTrees(item.tree1)}
                    </div>
                  )}

                  {item.tree2.length > 0 && (
                    <div
                      className="medium-8 columns"
                      style={{ marginTop: '20px' }}
                    >
                      {showingTrees(item.tree2)}
                    </div>
                  )}
                </div>

                {/*Mobile view*/}
                <div className="row categoryFeatureDivMobile">
                  {index === 0 && (
                    <h1
                      className="categoryHeading"
                      style={{ ...style, paddingLeft: '15px' }}
                    >
                      Featured Categories
                    </h1>
                  )}

                  <div className="medium-12 columns">
                    <div className="row">
                      <div className="medium-2 columns">
                        <p className="gap">&nbsp;</p>
                        <p className="gap">&nbsp;</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 featureCatBigImgageFirstMobile">
                        <div className="frameTopSelection">
                          <span className="helperframeTopSelection">
                            {item.parent.newProduct === 1 && (
                              <span className="featuredcatoneimage_new_label_topSelection">
                                New
                              </span>
                            )}
                            {item.parent.discountAmount !== 0 && (
                              <span className="featuredcatoneimage_new_label_discount_topSelmob">
                                {calDiscountPercentage(
                                  item.parent.discountAmount,
                                  item.parent.productPrice
                                )}
                                %
                              </span>
                            )}

                            <img
                              src={`${img_src}${item.parent.home_image}`}
                              alt={item.parent.product_name}
                              title={capitalizeStr(item.parent.product_name)}
                            />
                          </span>
                        </div>

                        <div className="product-content-topSelection ">
                          <h3 className="featuredcatoneimage_title_topSelection">
                            <a
                              href={`/productDetails/${item.parent.product_id}`}
                              className="aclass"
                            >
                              {capitalizeStr(
                                shorten_the_name(item.parent.product_name)
                              )}
                            </a>
                          </h3>

                          <div className="featuredcatoneimage_price_topSelection">
                            ৳&nbsp;
                            {item.parent.productPrice -
                              item.parent.discountAmount}
                            {item.parent.discountAmount > 0 && (
                              <span>৳&nbsp;{item.parent.productPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p>{''}</p>

                      <div className="col-md-6 featureCatTwoImageMobile">
                        <div className="row small-up-2 featureCatBigImgMob">
                          {item.subCat.length > 0 &&
                            item.subCat.map((product) => (
                              <Fragment>
                                <div className="column">
                                  <div className="frameTopSelection">
                                    <span className="helperframeTopSelection">
                                      {product.newProduct === 1 && (
                                        <span className="featuredcattwoimage_new_label_topSelection">
                                          New
                                        </span>
                                      )}
                                      {product.discountAmount !== 0 && (
                                        <span className="featuredcattwoimage_new_label_discount_topSelmob">
                                          {calDiscountPercentage(
                                            product.discountAmount,
                                            product.productPrice
                                          )}
                                          %
                                        </span>
                                      )}
                                      <img
                                        src={`${img_src}${product.home_image}`}
                                        alt={product.product_name}
                                        title={capitalizeStr(
                                          product.product_name
                                        )}
                                      />
                                    </span>
                                  </div>

                                  <div className="product-content-topSelection ">
                                    <h3 className="featuredcattwoimage_title_topSelection">
                                      <a
                                        href={`/productDetails/${product.product_id}`}
                                        className="aclass"
                                      >
                                        {capitalizeStr(
                                          shorten_the_name(product.product_name)
                                        )}
                                      </a>
                                    </h3>
                                    <div className="featuredcattwoimage_price_topSelection">
                                      ৳&nbsp;
                                      {product.productPrice -
                                        product.discountAmount}
                                      {product.discountAmount > 0 && (
                                        <span>
                                          ৳&nbsp;{product.productPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            ))}
                        </div>
                      </div>

                      <div className="medium-4 columns">{''}</div>
                    </div>
                  </div>

                  {item.tree1.length > 0 && (
                    <div className="medium-12 columns">
                      {showingTrees2([item.tree1[0]])}
                    </div>
                  )}

                  {item.tree2.length > 0 && (
                    <div
                      className="medium-12 columns"
                      // style={{ marginTop: '20px' }}
                      style={{ marginTop: '2px' }}
                    >
                      {showingTrees2([item.tree2[0]])}
                    </div>
                  )}
                </div>
              </Fragment>
            )
        )}
    </Fragment>
  );
};

const showingTrees = (tree) => (
  <div className="row">
    {tree.map(({ cat_info, products }) => (
      <div
        className="medium-4 columns featureCatTreeImgDes"
        style={{ float: 'left', paddingLeft: '0' }}
        key={cat_info.id}
      >
        <h1 style={{ fontSize: '12px', padding: '2px' }}>
          {cat_info.category_name}
          <a href={`/productList/${cat_info.id}`}>
            {products.length > 2 && (
              <span style={style_see_more}>See more</span>
            )}
          </a>
        </h1>
        {products.length > 0 &&
          products.map((product) => (
            <a
              href={`/productDetails/${product.product_id}`}
              key={product.product_id}
            >
              <div
                className="col-md-4"
                style={{
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  float: 'left',
                }}
              >
                <div className="frameFeatureCatSm">
                  <span className="helperframeFeatureCatSm">
                    {product.newProduct === 1 && (
                      <span className="featuredcat_new_label_topSelection">
                        New
                      </span>
                    )}
                    {product.discountAmount !== 0 && (
                      <span className="featuredcat_new_label_discount_topSelection">
                        {calDiscountPercentage(
                          product.discountAmount,
                          product.productPrice
                        )}
                        %
                      </span>
                    )}

                    <img
                      src={`${img_src}${product.home_image}`}
                      alt={product.product_name}
                      title={capitalizeStr(product.product_name)}
                    />
                  </span>
                </div>
                <div className="product-content-topSelection">
                  <h3 className="featuredcat_title_topSelection">
                    <a
                      href={`/productDetails/${product.product_id}`}
                      className="aclass"
                    >
                      {capitalizeStr(shorten_the_name(product.product_name))}
                    </a>
                  </h3>

                  <div className="featuredcat_price_topSelection">
                    ৳&nbsp;{product.productPrice - product.discountAmount}
                    {product.discountAmount > 0 && (
                      <span>৳&nbsp;{product.productPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    ))}
  </div>
);

const showingTrees2 = (tree) => (
  <div className="row">
    {tree.map(({ cat_info, products }) => (
      <div className="medium-12 columns" key={cat_info.id}>
        <h1 style={{ fontSize: '12px', marginLeft: '-5px', marginTop: '10px' }}>
          {cat_info.category_name}
          <a href={`/productList/${cat_info.id}`}>
            {products.length > 2 && (
              <span style={style_see_more}>See more</span>
            )}
          </a>
        </h1>

        {products.length > 0 && (
          <div className="row small-up-3 moreCat">
            {products.map((product) => (
              <div
                className="column"
                style={{
                  paddingRight: '10px',
                  paddingLeft: '10px',
                }}
              >
                <a href={`/productDetails/${product.product_id}`}>
                  <div className="moreCatDiv">
                    <span className="moreCatSpan">
                      {product.newProduct === 1 && (
                        <span className="featuredcat_new_label_topSelection">
                          New
                        </span>
                      )}
                      {product.discountAmount !== 0 && (
                        <span className="featuredcat_new_label_discount_topSelemob">
                          {calDiscountPercentage(
                            product.discountAmount,
                            product.productPrice
                          )}
                          %
                        </span>
                      )}

                      <img
                        src={`${img_src}${product.home_image}`}
                        alt={product.product_name}
                        title={capitalizeStr(product.product_name)}
                      />
                    </span>
                  </div>
                </a>

                <div className="product-content-topSelection">
                  <h3 className="featuredcat_title_topSelection">
                    <a
                      href={`/productDetails/${product.product_id}`}
                      className="aclass"
                    >
                      {capitalizeStr(shorten_the_name(product.product_name))}
                    </a>
                  </h3>

                  <div className="featuredcat_price_topSelection">
                    ৳&nbsp;{product.productPrice - product.discountAmount}
                    {product.discountAmount > 0 && (
                      <span>৳&nbsp;{product.productPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default ListingFeaturedCat;
