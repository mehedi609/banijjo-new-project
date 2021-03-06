import React from 'react';
import Carousel from 'react-multi-carousel';
import { capitalizeStr } from '../../utils/utils';

const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const img_src = `${fileUrl}/upload/product/productImages`;

const MainSlider = ({ images }) => {
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="pl-0"
        containerClass="container"
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
            items: 1,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 991.98,
              min: 576,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 575.98,
              min: 0,
            },
            items: 1,
          },
        }}
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
      >
        {images.map((item) => (
          <a
            href={item.url}
            key={item.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="img-fluid"
              src={`${img_src}/${item.image}`}
              alt={capitalizeStr(item.name)}
              title={capitalizeStr(item.name)}
            />
          </a>
        ))}
      </Carousel>
    </>
  );
};

export default MainSlider;
