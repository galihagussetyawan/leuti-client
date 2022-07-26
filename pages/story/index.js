import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import axios from "axios";

import CookiesService from "../../services/cookies.service";
import CartService from "../../services/cart.service";
import PointService from "../../services/point.service";
import RoyaltyService from "../../services/royalty.service";

// import components
const Footer = dynamic(() => import('../../components/footer.component'));

export default function Story({ contentList }) {
    return (
        <>
            <Head>
                <title>LEUTI STORIES - Leuti Perfect Sublimate Serum</title>
                <meta name="description" content="LEUTI Perfect Sublimate Serum diciptakan bagi orang-orang yang menuntut kesempurnaan dan kualitas tinggi. Sebelum menyentuh pasar, serum ini telah melewati uji sampling keefektifitasan dimana 98% dari 100 orang dengan kulit normal sebagai sampling menunjukkan hasil yang memuaskan dalam jangka waktu maksimal 2 minggu. 80% dari mereka mengatakan bahwa hasil yang bagus dirasakan sejak pertama kali pemakaian serum LEUTI Perfect Sublimate Serum. Efek pada kulit dimana kulit menjadi lebih putih, flawless, halus, lembab, kenyal seperti sedang menyentuh agar-agar dirasakan secara bersamaan" />
            </Head>

            <main className=" md:w-4/5 m-auto flex flex-col md:gap-28 gap-14 md:px-0 px-5">

                {/* banner */}
                <div className=" md:w-full md:h-[600px] md:grid md:grid-cols-2 md:bg-gray-100">
                    <div className=" md:w-full md:h-full relative">
                        <Image
                            src={'/images2.jpg'}
                            alt={'leuti image'}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                        />
                    </div>
                    <div className=" md:w-full md:h-full relative">
                        <Image
                            src={'/images4.jpg'}
                            alt={'leuti image'}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                        />
                    </div>
                    <div className="md:flex md:flex-col md:gap-3 text-center md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                        <h1 className="md:text-center md:text-lg text-2xl">THE STORY</h1>
                        <h2 className="md:text-center md:text-4xl">LEUTI PERFECT SUBLIMATE SERUM</h2>
                    </div>
                </div>
                {/* end of banner */}

                <div className="md:w-1/2 flex flex-col md:gap-10 gap-5">
                    <h3 className="md:text-xl text-lg">LEUTI STORIES</h3>
                    <p className=" leading-relaxed">LEUTI Perfect Sublimate Serum diciptakan bagi orang-orang yang menuntut kesempurnaan dan kualitas tinggi. Sebelum menyentuh pasar, serum ini telah melewati uji sampling keefektifitasan dimana 98% dari 100 orang dengan kulit normal sebagai sampling menunjukkan hasil yang memuaskan dalam jangka waktu maksimal 2 minggu. 80% dari mereka mengatakan bahwa hasil yang bagus dirasakan sejak pertama kali pemakaian serum LEUTI Perfect Sublimate Serum. Efek pada kulit dimana kulit menjadi lebih putih, flawless, halus, lembab, kenyal seperti sedang menyentuh agar-agar dirasakan secara bersamaan. </p>
                </div>

                <div className="md:w-full flex justify-center">
                    <div className="md:w-96 w-60 h-52 relative">
                        <Image
                            src={'/wordmark-logo-with-slogan.png'}
                            alt={'leuti logo image'}
                            loading='lazy'
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                </div>

                <div className="md:w-1/2 md:font-semibold md:text-lg font-semibold">
                    <p>ALASAN DIBALIK LAHIRNYA LEUTI PERFECT SUBLIMATE SERUM YANGE SEMPURNA UNTUK MEMENUHI KEBUTUHAN SEMUA SKINCARE ANDA</p>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-5">

                    {
                        contentList?.map((data, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-5 md:mt-10 mt-20">
                                    <div className="md:w-full md:h-[700px] w-full h-96 relative bg-gray-100">
                                        <Image
                                            src={data.image}
                                            alt={`images ${data.title}`}
                                            loading='lazy'
                                            layout='fill'
                                            objectPosition='center'
                                            objectFit='cover'
                                        />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <h3 className="md:font-semibold md:text-lg font-semibold">{data.title}</h3>
                                        <p className=" leading-relaxed">{data.desc.split('/n')}</p>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>

            </main>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    const host = req.headers.host;
    let isLogin = false;
    let user = {};
    let carts = [];
    let point = null;
    let royalties = null;

    const { data, error } = await axios.get(`http://${host}/api/story/content`);

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                isLogin = true;
            }
        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }
    }

    return {
        props: {
            contentList: data,
            isLogin,
            user,
            carts,
            point,
            royalties,
        }
    }
}