import React from 'react';
import AppLink from '../../shared/AppLink';

const ListingSubcategories = ({ subcategories }) => {
  return (
    <>
      {subcategories.map(({ category: { id, category_name }, lastChilds }) => (
        <ul className="spvmm_submm_ul" key={id}>
          <li className="spvmm_submm_li  spvmm-havechildchild">
            <AppLink href="/productList/[id]" as={`/productList/${id}`}>
              <a className="megamenu_a">{category_name}</a>
            </AppLink>
            {lastChilds.length > 0 && (
              <ul
                className="spvmm_submm_ul"
                style={{
                  zIndex: 1000,
                }}
              >
                {lastChilds.map(({ id, category_name }) => (
                  <li className="spvmm_submm_li" key={id}>
                    <AppLink href="/productList/[id]" as={`/productList/${id}`}>
                      <a className="megamenu_a">{category_name}</a>
                    </AppLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      ))}
    </>
  );
};

export default ListingSubcategories;
