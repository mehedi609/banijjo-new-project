import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Product_Card from '../../components/shared/Product_Card';

// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL';
const fileUrl = 'https://admin.banijjo.com.bd/';

const SameVendorOrSameCatProducts = ({ vorc, id, products }) => {
  const [otherProducts] = useState(products);
  const [otherProductsDesk, setOtherProductsDesk] = useState([
    ...products.slice(0, 5),
  ]);

  const [visibleDesk, setVisibleDesk] = useState(5);

  const fetchMoreDataDesk = () => {
    setTimeout(() => {
      setOtherProductsDesk([
        ...otherProductsDesk,
        ...otherProducts.slice(visibleDesk, visibleDesk + 5),
      ]);
      setVisibleDesk(visibleDesk + 5);
    }, 300);
  };

  return (
    <>
      {/* <h1 className="h5">{title}</h1> */}

      {vorc === 'c' && (
        <div className="row">
          <div className="col-12">
            <h1 className="h5 float-left">Other Brands</h1>
            <div className="float-right see-more">
              <a href={`/productList/${id}`}>
                <span className="seeMore">See more</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {vorc === 'v' && (
        <div className="row">
          <div className="col-12">
            <h1 className="h5 float-left">Other Products</h1>
            <div className="float-right see-more">
              <a href={`/vendor/${id}`}>
                <span className="seeMore">See more</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <InfiniteScroll
          dataLength={otherProductsDesk.length}
          next={fetchMoreDataDesk}
          hasMore={true}
        >
          {otherProductsDesk.map((product) => (
            <div
              className="col-md-5ths mb-3 custom-fade-in"
              key={product.product_id}
            >
              <Product_Card product={product} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default SameVendorOrSameCatProducts;
