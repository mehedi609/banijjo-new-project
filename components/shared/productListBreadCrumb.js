import React from 'react';
import AppLink from './AppLink';

const ProductListBreadCrumb = ({ breadcrumbs }) => (
  <>
    <ul className="breadcrumbProduct px-3 py-2 mb-2">
      {breadcrumbs.length > 0 &&
        breadcrumbs.map(({ id, category_name }) => (
          <li className="d-inline-block" key={id}>
            <AppLink href={`/productList/[id]`} as={`/productList/${id}`}>
              <a className="text-primary">{category_name}</a>
            </AppLink>
          </li>
        ))}
    </ul>
  </>
);

export default ProductListBreadCrumb;
