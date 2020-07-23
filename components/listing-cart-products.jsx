import React from 'react';
import { computeTotalPrice } from '../utils/utils';
const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const ListingCartProducts = ({
  cartProductsInfo,
  addProductHandler,
  removeProductHandler,
  deleteProductHandler,
}) => {
  const totalPrice = computeTotalPrice(cartProductsInfo);

  return (
    <div className="card">
      <div className="card-header bg-dark text-light text-center" />

      <div className="card-body">
        {cartProductsInfo.length > 0 &&
          cartProductsInfo.map((item) => (
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row" key={item.product_name}>
                  <div className="col-md-3">
                    <img
                      src={`${fileUrl}/upload/product/productImages/${item.home_image}`}
                      className="img-fluid"
                    />
                  </div>

                  <div className="col-md-4">
                    <h1 className="h5">{item.product_name}</h1>
                    {item.color && (
                      <p className="mb-1">
                        Color:&nbsp;
                        <b>{item.color.colorName}</b>
                      </p>
                    )}
                    {item.size && (
                      <p className="mb-1">
                        Size:&nbsp;
                        <b>{item.size.size}</b>
                      </p>
                    )}
                    <p className="mb-1">
                      <em>৳&nbsp;</em> {item.productPrice}
                    </p>
                  </div>

                  <div className="col-md-3 my-auto">
                    <div className="quantity">
                      <div className="quantity-select">
                        {/*Minus Button*/}
                        <div
                          onClick={() => removeProductHandler(item)}
                          className="entry value-minus1"
                        >
                          &nbsp;
                        </div>
                        <div className="entry value1">
                          <span>{item.quantity}</span>
                        </div>
                        {/*Plus Button*/}
                        <div
                          onClick={() => addProductHandler(item)}
                          className="entry value-plus1 active"
                        >
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2 my-auto">
                    <div className="text-center">
                      <button
                        onClick={() => deleteProductHandler(item)}
                        type="button"
                        className="btn btn-outline-danger btn-xs"
                        style={{
                          borderColor: 'transparent',
                          background: 'transparent',
                        }}
                      >
                        <i className="fas fa-trash fa-2x text-danger" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
      </div>

      <div className="card-footer">
        <div className="text-right">
          <p className="my-0">
            {' '}
            Total price:
            <b>
              <em>৳&nbsp;</em> {totalPrice}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCartProducts;
