import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper";

export default function Caroussell() {
    return (
        <Swiper
            className='mySwiper md:w-full md:h-full w-full h-full'
            autoplay
            loop
            pagination
            modules={[Autoplay, Pagination,]}
        >
            <SwiperSlide>
                <div className='w-full h-full flex flex-col'>
                    <div className='h-1/2 w-full md:w-full md:h-full relative bg-gray-100'>
                        <Image
                            priority
                            quality={70}
                            src={'/carousell1.jpg'}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                        />
                    </div>
                    <div className='h-1/2 flex flex-col gap-5 justify-center items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center'>
                        <h1 className='w-11/12 md:w-full text-center text-5xl font-light md:text-4xl md:font-semibold'>Leuti Perfect Sublimate Serum</h1>
                        <p className='w-11/12 text-center font-light md:font-normal'>5 RANGKAIAN SKINCARE DALAM 1 PRODUK SEMPURNA</p>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className='w-full h-full flex flex-col'>
                    <div className='h-1/2 w-full md:w-full md:h-full relative bg-gray-100'>
                        <Image
                            priority
                            quality={70}
                            src={'/carousell2.jpg'}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                        />
                    </div>
                    <div className='h-1/2 flex flex-col gap-5 justify-center items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center'>
                        <h1 className='w-11/12 md:w-full text-center text-5xl font-light md:text-4xl md:font-semibold'>Dapatkan Reward Dengan Mudah</h1>
                        <p className='w-11/12 text-center font-light md:font-normal'>TOUR DESTINATION BALI, SINGAPORE & TURKI</p>
                    </div>
                </div>
            </SwiperSlide>

        </Swiper>
    );
}