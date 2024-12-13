import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import { final } from "../assets/swiper/final.js"
import "swiper/css";
import "swiper/css/autoplay";

const MySwiper = () => {
  return (
    <div className="-mt-7 md:-mt-0">
      <Swiper
        className="-z-1 flex h-auto md:h-3 shadow md:w-5/6 justify-center items-center"
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,//most IMP
        }}
      >
        <SwiperSlide >
          <img src={final.s1} className="flex justify-center items-center" alt="" />
        </SwiperSlide>
        <SwiperSlide >
          <img className="flex justify-center items-center" src={final.s2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="flex justify-center items-center" src={final.s3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={final.s4} className="flex justify-center items-center" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={final.s5} className="flex justify-center items-center" alt="" />
        </SwiperSlide>
      </Swiper>

    </div>
  );
}

export default MySwiper 