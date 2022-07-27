import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//image import
import imageCarousell1 from '../public/carousell1.jpg';
import imageCarousell2 from '../public/carousell2.jpg';

export default function Caroussell() {
    return (
        <Swiper
            loop={true}
            autoplay
            navigation={false}
            modules={[Autoplay]}
        >
            <SwiperSlide className='md:h-full md:w-full'>
                <Image
                    priority
                    quality={70}
                    src={imageCarousell1}
                />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-2'>
                    <h1 className='md:text-3xl md:font-semibold text-2xl font-semibold'>Leuti Perfect Sublimate Serum</h1>
                    <p>5 RANGKAIAN SKINCARE DALAM 1 PRODUK SEMPURNA</p>
                </div>
            </SwiperSlide>

            <SwiperSlide className='md:h-full md:w-full'>
                <Image
                    loading='lazy'
                    quality={70}
                    src={imageCarousell2}
                />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-2'>
                    <h1 className='md:text-3xl md:font-semibold text-2xl font-semibold'>Raih Reward Dengan Cara Mudah</h1>
                    <p>{'TOUR DESTINATION BALI, SINGAPORE & TURKI'}</p>
                </div>
            </SwiperSlide>

        </Swiper>
    );
}