import React from 'react';
import AppLink from '../../shared/AppLink';

const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const ListingVendorImages = ({ vendorImages }) => {
  return (
    <>
      {vendorImages.map(({ vendor_id, logo }) => (
        <li className="sup-brand-item" key={vendor_id}>
          <AppLink href="/vendor/[id]" as={`/vendor/${vendor_id}`}>
            <a className="megamenu_a">
              {logo !== null ? (
                <img
                  src={`${fileUrl}/upload/vendor/${logo}`}
                  className="img-fluid"
                />
              ) : (
                <img
                  src={`${fileUrl}/upload/vendor/default.png`}
                  className="img-fluid"
                />
              )}
            </a>
          </AppLink>
        </li>
      ))}
    </>
  );
};

export default ListingVendorImages;
