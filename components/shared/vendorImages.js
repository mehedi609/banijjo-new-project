import React from 'react';
// const fileUrl = process.env.NEXT_PUBLIC_FILE_URL';
const fileUrl = 'https://admin.banijjo.com.bd/';

const VendorImages = ({ ven_images }) => {
  return ven_images.map((item) => (
    <li className="sup-brand-item" key={item.vendor_id}>
      <a className="megamenu_a" href={'/vendor/' + item.vendor_id}>
        {item.logo !== null ? (
          <img
            src={fileUrl + '/upload/vendor/' + item.logo}
            className="img-fluid"
          />
        ) : (
          <img
            src={fileUrl + '/upload/vendor/default.png'}
            className="img-fluid"
          />
        )}
      </a>
    </li>
  ));
};
export default VendorImages;
