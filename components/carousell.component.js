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
                    <div className='h-1/2 w-full md:w-full md:h-full relative'>
                        <Image
                            priority
                            quality={75}
                            src={'/carousell1.jpg'}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                    <div className='h-1/2 flex flex-col gap-5 justify-center items-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 text-center'>
                        <h1 className='w-11/12 md:w-full text-center text-5xl font-light md:text-4xl md:font-semibold'>Leuti Perfect Sublimate Serum</h1>
                        <p className='w-11/12 text-center font-light md:font-normal'>5 RANGKAIAN SKINCARE DALAM 1 PRODUK SEMPURNA</p>
                    </div>
                </div>
            </SwiperSlide>

            {/* <SwiperSlide>
                <div className='h-full w-full relative'>
                    <Image
                        quality={100}
                        loading='lazy'
                        src={'/carousell2.jpg'}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-2'>
                    <h1 className='md:text-4xl md:font-semibold text-2xl font-semibold'>Raih Reward Dengan Cara Mudah</h1>
                    <p>{'TOUR DESTINATION BALI, SINGAPORE & TURKI'}</p>
                </div>
            </SwiperSlide> */}

            <SwiperSlide>
                <div className='w-full h-full flex flex-col'>
                    <div className='h-1/2 w-full md:w-full md:h-full relative'>
                        <Image
                            loading='lazy'
                            quality={75}
                            src={'/carousell2.jpg'}
                            layout='fill'
                            objectFit='cover'
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