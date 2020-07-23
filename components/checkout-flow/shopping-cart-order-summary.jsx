import React from 'react';
import { calculateTotalItems, computeTotalPrice } from '../../utils/utils';

const ShoppingCartOrderSummary = ({ cartProductsInfo, discountAmount }) => {
  const totalCartItems = calculateTotalItems(cartProductsInfo);
  const totalPrice = computeTotalPrice(cartProductsInfo);

  return (
    <>
      <div className="col-md-12">
        <strong className="strong-left-subtotal">
          Subtotal (
          {totalCartItems === 0 || totalCartItems === 1
            ? `${totalCartItems} item`
            : `${totalCartItems} items`}
          )
        </strong>
        <div className="float-right">
          <span>
            <em>৳ &nbsp;</em>
          </span>
          <span>{totalPrice}</span>
        </div>
      </div>
      <div className="col-md-12">
        <strong className="strong-left-vat">VAT & Tax</strong>
        <div className="float-right">
          <span>
            <em>৳ &nbsp;</em>
          </span>
          <span>0</span>
        </div>
      </div>
      <div className="col-md-12">
        <strong className="strong-left-discount">Discount</strong>
        <div className="float-right">
          <span>
            <em>৳ &nbsp;</em>
          </span>
          <span>{discountAmount}</span>
        </div>
      </div>
      <div className="col-md-12">
        <strong>
          Promo Code
          <span
            style={{ cursor: 'pointer' }}
            className="badge badge-success btn-apply rounded ml-1"
          >
            Apply
          </span>
        </strong>
      </div>
      <div className="col-md-12">
        <strong className="strong-left-vat">Shipping</strong>
        <div className="float-right">
          <span>
            <em>৳ &nbsp;</em>
          </span>
          <span>0</span>
        </div>
        <hr />
      </div>
      <div className="col-md-12">
        <strong className="strong-left-order">Order Total</strong>
        <div className="float-right">
          <span>
            <em>৳ &nbsp;</em>
          </span>
          <span>{totalPrice - discountAmount}</span>
        </div>
        <hr />
      </div>
    </>
  );
};

export default ShoppingCartOrderSummary;
