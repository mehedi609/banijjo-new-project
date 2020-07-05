import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Carousel from 'react-multi-carousel';
// import ProductCard from '../shared/product-card';

const fileUrl = process.env.REACT_APP_FILE_URL;
const base = process.env.REACT_APP_FRONTEND_SERVER_URL;

const style = { marginTop: "5px", marginBottom: "5px" };

const VendorCarouselSlider = () => {

    const [vendors, setVendors] = useState(null);

    const options = {
        items: 8,
        rewind: true,
        autoplay: true,
        slideBy: 1,
        loop: true
    };

    useEffect(() => {
        getVendors();
    }, []);

    const getVendors = () => {
        axios.get(`${base}/api/vendors`).then(res => setVendors(res.data.data));
    };

    console.log('vendors...', vendors);
  return (
    <>

    <Fragment>
      {vendors !== null && (
        <div className="row">
          <div className="row column">{""}</div>
          <div className="medium-12 columns">
            <h1 style={style} className="categoryHeading">
              {vendors.title}
            </h1>
            <div className="row small-up-7">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 hotDealDesk">
                    <Carousel
                        additionalTransfrom={1}
                        arrows
                        autoPlay
                        autoPlaySpeed={2000}
                        centerMode={false}
                        className=""
                        containerClass=""
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                        desktop: {
                            breakpoint: {
                            max: 3000,
                            min: 992,
                            },
                            items: 5,
                            partialVisibilityGutter: 40,
                        },
                        tablet: {
                            breakpoint: {
                            max: 991.98,
                            min: 576,
                            },
                            items: 3,
                        },
                        mobile: {
                            breakpoint: {
                            max: 575.98,
                            min: 0,
                            },
                            items: 1,
                        },
                        }}
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={2}
                        swipeable                
                        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    >
                      {vendors.vendors.length > 0 &&
                        vendors.vendors.map(({ name, vendor_id, logo }) => (
                          <a href={`/vendor/${vendor_id}`}>
                            <div className="frameTopSelection" key={vendor_id}>
                              <span className="helperframeTopSelection">
                                <img
                                  className="frameBrandImage"
                                  src={`${fileUrl}/upload/vendor/${logo}`}
                                  alt={name}
                                  title={name}
                                />
                              </span>
                            </div>
                          </a>
                        ))}
                    </Carousel>
                  </div>
                  <p className="gap">&nbsp;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>

    </>
  );
};

export default VendorCarouselSlider;
