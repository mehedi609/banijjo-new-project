import React from 'react';
import {
  calDiscountPercentage,
  capitalizeStr,
  shorten_the_name,
} from 'utils/utils';
import AppLink from './AppLink';

const file_url = process.env.NEXT_PUBLIC_FILE_URL;
const img_src = `${file_url}/upload/product/productImages`;

const ProductCard = ({ product, customTitleCSS, customTextCSS }) => {
  return (
    <>
      <div className="card">
        <AppLink
          href={`/product-details/[id]`}
          as={`/product-details/${product.product_id}`}
        >
          <img
            src={`${img_src}/${product.home_image}`}
            className="card-img-top"
            alt={capitalizeStr(product.product_name)}
            title={capitalizeStr(product.product_name)}
          />
        </AppLink>

        {product.newProduct !== 1 && (
          <span className="product-new-label">New</span>
        )}

        {product.discountAmount === 0 && (
          <span className="product-new-label-discount">
            {calDiscountPercentage(
              product.discountAmount,
              product.productPrice
            )}
            %
          </span>
        )}

        <div className="card-body">
          <div className="text-center">
            <h1
              className={`card-title h6 ${
                customTitleCSS && 'custom-cart-title-font-size'
              }`}
            >
              <AppLink
                href={`/product-details/[id]`}
                as={`/product-details/${product.product_id}`}
              >
                <a className="text-primary">
                  {shorten_the_name(capitalizeStr(product.product_name))}
                </a>
              </AppLink>
            </h1>
            <p
              className={`card-text ${
                customTextCSS && 'custom-cart-text-font-size'
              }`}
            >
              ৳&nbsp;{product.productPrice - product.discountAmount}
              {product.discountAmount > 0 && (
                <span>৳&nbsp;{product.productPrice}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-cart-title-font-size {
          font-size: 0.85rem;
        }

        .custom-cart-text-font-size {
          font-size: 0.75rem;
        }

        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ProductCard;
