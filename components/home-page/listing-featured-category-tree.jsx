import React from 'react';

const CardDemo = ({ maxHeight = null, customFontSize = null }) => (
  <>
    <div className="card">
      <img
        className="card-img-top max-height-65"
        // style={{ maxHeight: '65px' }}
        src="/images/card-demo-image.png"
        alt="card-img"
      />

      <div className="card-body">
        <div className="text-center">
          <h1 className="card-title h4 mb-0 custom-font-size">
            <a className="text-primary">Product</a>
          </h1>
          <p className="card-text custom-font-size">৳&nbsp;2000</p>
        </div>
      </div>
    </div>

    <style jsx>{`
      .custom-font-size {
        font-size: 14px;
      }
      .max-height-65 {
        max-height: 65px;
      }

      .max-height-85 {
        max-height: 85px;
      }
    `}</style>
  </>
);

const ListingFeaturedCategoryTree = ({ featuredCategories }) => {
  return (
    <>
      <div className="row no-gutters">
        <div className="col-3 my-auto pr-4">
          <div className="card">
            <img
              className="card-img-top"
              src="/images/card-demo-image.png"
              alt="card-img"
            />

            <div className="card-body">
              <div className="text-center">
                <h1 className="card-title h4 my-1">
                  <a className="text-primary">Product</a>
                </h1>
                <p className={`card-text`}>৳&nbsp;2000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-2 my-auto pr-4">
          <div className="row ">
            <div className="col-12">
              <div className="card">
                <img
                  className="card-img-top"
                  style={{ maxHeight: '85px' }}
                  src="/images/card-demo-image.png"
                  alt="card-img"
                />

                <div className="card-body">
                  <div className="text-center">
                    <h1 className="card-title h6 custom-font-size mb-0">
                      <a className="text-primary">Product</a>
                    </h1>
                    <p className="card-text custom-font-size">৳&nbsp;2000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-1">
              <div className="card">
                <img
                  className="card-img-top"
                  style={{ maxHeight: '85px' }}
                  src="/images/card-demo-image.png"
                  alt="card-img"
                />

                <div className="card-body">
                  <div className="text-center">
                    <h1 className="card-title h6 custom-font-size mb-0">
                      <a className="text-primary">Product</a>
                    </h1>
                    <p className="card-text custom-font-size">৳&nbsp;2000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-7 my-auto">
          <div className="row no-gutters mt-n4">
            <div className="col-6 pr-4">
              <div className="row">
                <div className="col-12 mt-n2">
                  <h1 className="h6 d-inline-block text-primary">
                    Category 1-1
                  </h1>
                  <a
                    href="#!"
                    className="text-primary float-right mr-1"
                    style={{ fontSize: '1rem' }}
                  >
                    See More
                  </a>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-4">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="row">
                <div className="col-12 mt-n2">
                  <h1 className="h6 d-inline-block text-primary">
                    Category 1-2
                  </h1>
                  <a
                    href="#!"
                    className="text-primary float-right mr-1"
                    style={{ fontSize: '1rem' }}
                  >
                    See More
                  </a>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-4">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2 no-gutters">
            <div className="col-6 pr-4">
              <div className="row">
                <div className="col-12">
                  <h1 className="h6 d-inline-block text-primary">
                    Category 2-1
                  </h1>
                  <a
                    href="#!"
                    className="text-primary float-right mr-1"
                    style={{ fontSize: '1rem' }}
                  >
                    See More
                  </a>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-4">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <h1 className="h6 d-inline-block text-primary">
                    Category 2-2
                  </h1>
                  <a
                    href="#!"
                    className="text-primary float-right mr-1"
                    style={{ fontSize: '1rem' }}
                  >
                    See More
                  </a>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-4">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
                <div className="col-4 pl-2">
                  <CardDemo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mt-2 {
          margin-top: 1.4rem !important;
        }
      `}</style>
    </>
  );
};

export default ListingFeaturedCategoryTree;
