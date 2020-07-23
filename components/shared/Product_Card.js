import React from 'react';
import {
  calDiscountPercentage,
  capitalizeStr,
  shorten_the_name_upto_six,
} from 'utils/utils';
import AppLink from './AppLink';
// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL';
const fileUrl = 'https://admin.banijjo.com.bd/';

const Product_Card = ({ product }) => {
  product['images'] = JSON.parse(product.image);

  return (
    <>
      <div className="card">
        <AppLink
          href={`/product-details/[id]`}
          as={`/product-details/${product.product_id}`}
        >
          <img
            className="card-img-top"
            src={`${fileUrl}/upload/product/productImages/${product.home_image}`}
            onMouseOver={(e) =>
              (e.currentTarget.src = `${fileUrl}/upload/product/productImages/${product.images[1].imageName}`)
            }
            onMouseOut={(e) =>
              (e.currentTarget.src = `${fileUrl}/upload/product/productImages/${product.home_image}`)
            }
            alt={capitalizeStr(product.product_name)}
            title={capitalizeStr(product.product_name)}
          />
        </AppLink>

        {product.newProduct !== 1 && (
          <span className="product-new-label-small-carousel">New</span>
        )}

        {product.discountAmount === 0 && (
          <span className="product-new-label-discount-small-carousel">
            {calDiscountPercentage(
              product.discountAmount,
              product.productPrice
            )}
            %
          </span>
        )}

        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h6">
              <AppLink
                href={`/product-details/[id]`}
                as={`/product-details/${product.product_id}`}
              >
                <a className="text-primary">
                  {capitalizeStr(
                    shorten_the_name_upto_six(product.product_name)
                  )}
                </a>
              </AppLink>
            </h1>

            <p className="card-text">
              ৳&nbsp;{product.productPrice - product.discountAmount}
              {product.discountAmount > 0 && (
                <span>৳&nbsp;{product.productPrice}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product_Card;
