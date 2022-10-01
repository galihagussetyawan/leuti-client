import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper";

import "swiper/css"


export default function TestimonialCarousell() {
    return (
        <div>
            <Swiper
                className="w-full flex gap-5"
                autoplay={{ delay: 3000 }}
                loop
                slidesPerView={'auto'}
                spaceBetween={20}
                modules={[Autoplay]}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
            >
                <SwiperSlide>
                    <div className='h-64 bg-yellow-500'></div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='h-64 bg-red-500'></div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='h-64 bg-green-500'></div>
                </SwiperSlide>

            </Swiper>

            <div className="w-full flex justify-center md:justify-start mt-5">
                <button className="md:w-64 w-1/2 rounded-full py-5 border border-black">SHOW MORE REVIEWS</button>
            </div>
        </div>
    )
}