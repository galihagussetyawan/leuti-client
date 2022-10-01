import Head from "next/head";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper";

import Footer from "../../components/footer.component";

import "swiper/css"
import "swiper/css/pagination";

export default function Reward() {
    return (
        <>
            <Head></Head>
            <main className="md:w-4/5 flex flex-col space-y-20 m-auto">

                {/* slideshow */}
                <Swiper
                    className="mySwiper w-full md:h-screen"
                    autoplay={{ delay: 7000 }}
                    loop
                    pagination={{ dynamicBullets: true }}
                    parallax
                    modules={[Autoplay, Pagination]}
                >

                    <SwiperSlide>
                        <video autoPlay muted loop src='./reward-turkey-destination.mp4' className="w-full h-full bg-gray-100" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <video autoPlay muted loop src='./reward-thailand-destination.mp4' className="w-full h-full bg-gray-100" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <video autoPlay muted loop src='./reward-bali-destination.mp4' className="w-full h-full bg-gray-100" />
                    </SwiperSlide>

                </Swiper>
                {/* end of slideshow */}

            </main>
            <Footer />
        </>
    )
}