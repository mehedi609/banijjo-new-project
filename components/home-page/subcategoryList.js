import React from 'react';
const SubcategoryList = ({ category, lastChilds }) => {
  return (
    <>
      <ul key={category.parent_category_id} className="spvmm_submm_ul">
        <li className="spvmm_submm_li  spvmm-havechildchild" key={category.id}>
          <a className="megamenu_a" href={'/productList/' + category.id}>
            {category.category_name}
          </a>
          {lastChilds.length > 0 && (
            <ul
              className="spvmm_submm_ul"
              style={{
                zIndex: 1000,
              }}
            >
              {lastChilds.map((item) => (
                <li className="spvmm_submm_li" key={item.id}>
                  <a className="megamenu_a" href={'/productList/' + item.id}>
                    {item.category_name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </>
  );
};
export default SubcategoryList;
