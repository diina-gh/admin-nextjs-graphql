import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/thumbs";
// import required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";


export default function ProductGalery() {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  return (
    <div className="z-10">

      <Swiper className="swiper-type1" style={{"--swiper-navigation-color": "#fff","--swiper-pagination-color": "#fff",}} spaceBetween={10} navigation={false} pagination={{ "clickable": true }} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]}>
        
        <SwiperSlide className="slider-type1">
          <div className="w-full h-full flex flex-row justify-center">
            <div className='p-image2 self-center'>
                <img src="images/product/product1.png" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slider-type1">
          <div className="w-full h-full flex flex-row justify-center">
              <div className='p-image2 self-center'>
                  <img src="images/product/product12.png" />
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slider-type1">
          <div className="w-full h-full flex flex-row justify-center">
              <div className='p-image2 self-center'>
                  <img src="images/product/product13.png" />
              </div>
          </div>
        </SwiperSlide>

      </Swiper>

      <Swiper className="swiper-type2 casper2 mt-4" onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} >
        
        <SwiperSlide className="slider-type2">
          <div className="w-full h-full flex flex-row justify-center">
            <div className='p-image3 self-center'>
                <img src="images/product/product1.png" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slider-type2">
          <div className="w-full h-full flex flex-row justify-center">
            <div className='p-image3 self-center'>
                <img src="images/product/product12.png" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slider-type2">
          <div className="w-full h-full flex flex-row justify-center">
              <div className='p-image3 self-center'>
                  <img src="images/product/product13.png" />
              </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  );
}
