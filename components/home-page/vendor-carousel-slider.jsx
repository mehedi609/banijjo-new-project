import React from 'react';
import Carousel from 'react-multi-carousel';
import AppLink from '../shared/AppLink';
import { capitalizeStr } from '../../utils/utils';

const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;

const VendorCarouselSlider = ({ vendors }) => {
  return (
    <>
      {vendors && (
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
              items: 8,
              partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: {
                max: 991.98,
                min: 576,
              },
              items: 5,
            },
            mobile: {
              breakpoint: {
                max: 575.98,
                min: 0,
              },
              items: 3,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={2}
          swipeable
          removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
        >
          {vendors.length > 0 &&
            vendors.map(({ name, vendor_id, logo }) => (
              <div className="card mr-1" key={vendor_id}>
                <AppLink href="/vendor/[id]" as={`/vendor/${vendor_id}`}>
                  <img
                    className="card-img-top cursor-pointer"
                    src={`${fileUrl}/upload/vendor/${logo}`}
                    alt={capitalizeStr(name)}
                    title={capitalizeStr(name)}
                  />
                </AppLink>
              </div>
            ))}
        </Carousel>
      )}
    </>
  );
};

export default VendorCarouselSlider;
