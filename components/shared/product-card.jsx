import React from 'react';
import Link from 'next/link';
import { capitalizeStr, shorten_the_name } from 'utils/utils';
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

        <div className="card-body">
          <div className="text-center">
            <AppLink
              href={`/product-details/[id]`}
              as={`/product-details/${product.product_id}`}
            >
              <h1
                className={`card-title h6 text-normal ${
                  customTitleCSS && 'custom-cart-title-font-size'
                }`}
              >
                {shorten_the_name(capitalizeStr(product.product_name))}
              </h1>
            </AppLink>
            <p
              className={`card-text ${
                customTextCSS && 'custom-cart-text-font-size'
              }`}
            >
              ৳&nbsp;{product.productPrice}
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
      `}</style>
    </>
  );
};

export default ProductCard;
