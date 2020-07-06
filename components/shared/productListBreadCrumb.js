import React from 'react';
import PropTypes from 'prop-types';
import AppLink from './AppLink';

const ProductListBreadCrumb = ({ breadcrumbs }) => {
  //   const { id, category_name } = breadcrumbs.pop();
  return (
    <>
      <ul className="breadcrumbProduct px-3 py-2 mb-2">
        {breadcrumbs.length > 0 &&
          breadcrumbs.map(({ id, category_name }) => (
            <li className="d-inline-block" key={id}>
              <AppLink href={`/productList/[id]`} as={`/productList/${id}`}>
                {category_name}
              </AppLink>
            </li>
          ))}
      </ul>
    </>
  );
};

ProductListBreadCrumb.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
};

export default ProductListBreadCrumb;
