import React from 'react';
import SubcategoryList from './subcategoryList';
import VendorImages from '../shared/vendorImages';

const Categories = ({ categories }) => {

  return (
    <>
        <div className="visible-md-block visible-lg-block">
          {/* <div className="col-md-3"> */}
            <div id="sp_vertical_megamenu" className="sp-vertical-megamenu clearfix">

              <h2 className="cat-title">
                <i className="fa fa-list-ul" aria-hidden="true" /> Categories
              </h2>

              <ul className="vf-megamenu clearfix megamenu-content">
                {categories.length > 0 &&
                  categories.map(
                    ({ category, subcategories, vendorImages }) => {
                      return (
                        <React.Fragment>
                          <li className="spvmm-havechild" key={category.id}>
                            <a
                              className="megamenu_a"
                              href={'/productList/' + category.id}
                            >
                              {category.category_name}
                              
                            </a>
                            <span className="vf-button icon-close"></span>

                            <div className="spvmm_container_menu_child">
                              <div
                                className="spvmm_menu_child childRespinssive"
                                // style={{ width: '875px',position:"fixed",overflowX:"auto",overflowY:"auto",zIndex:"1000" ,border:"1px solid red"}}
                              >
                                <div
                                  className="spvmm_numbers_col"
                                  
                                >
                                  <div className="row">
                                    {subcategories.length > 0 &&
                                      subcategories.map(
                                        ({ category, lastChilds }) => (
                                          <SubcategoryList 
                                            category={category}
                                            lastChilds={lastChilds}
                                          />
                                        ),
                                      )}
                                  </div>

                                  {vendorImages.length > 0 && (
                                    <div className="row">
                                      <p
                                        className="vendor-Image"
                                        
                                      >
                                        Brand
                                      </p>
                                      <ul className="spvmm_submm_ul">
                                        <div className="sub-cate-row scp-cate-brand">
                                          <ul className="sub-brand-list">
                                            <VendorImages ven_images={vendorImages}/>
                                            {/* {this.renderVendorImages(
                                              vendorImages,
                                            )} */}
                                          </ul>
                                        </div>
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        </React.Fragment>
                      );
                    },
                  )}

                <li className="text-left" className="spvmm-nochild">
                  <a
                    href="/moreCategory"
                    className="megamenu_b"
                  >
                    <i
                      className="fa fa-plus-circle"
                
                    >
                      {' '}
                      <span>More</span>
                    </i>
                  </a>
                </li>
              </ul>
            </div>
            
          {/* </div> */}
        </div>
    </>
  );
};

export default Categories;
