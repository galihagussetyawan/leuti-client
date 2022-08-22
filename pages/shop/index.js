import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import CookiesService from "../../services/cookies.service";

import Footer from "../../components/footer.component";
import Header from "../../components/header.component"

// import LocalCurrency from '../../lib/helpers/local-currency.help';
import AuthContext from "../../lib/context/auth.context";

export default function Shop() {

    const { isLogin } = useContext(AuthContext);

    return (
        <div>
            <Head></Head>

            <Header />
            <main className="md:w-4/5 flex flex-col space-y-20 m-auto">

                <div className="text-center mt-14 space-y-5">
                    <span className="font-semibold text-5xl">LEUTI SHOP</span>
                    <p className="md:w-1/2 md:m-auto mx-5 leading-relaxed text-left md:text-center">LEUTI Perfect Sublimate Serum diciptakan bagi orang-orang yang menuntut kesempurnaan dan kualitas tinggi. Sebelum menyentuh pasar, serum ini telah melewati uji sampling keefektifitasan dimana 98% dari 100 orang dengan kulit normal sebagai sampling menunjukkan hasil yang memuaskan dalam jangka waktu maksimal 2 minggu. 80% dari mereka mengatakan bahwa hasil yang bagus dirasakan sejak pertama kali pemakaian serum LEUTI Perfect Sublimate Serum. Efek pada kulit dimana kulit menjadi lebih putih, flawless, halus, lembab, kenyal seperti sedang menyentuh agar-agar dirasakan secara bersamaan. </p>
                </div>

                <div className=" space-y-5">
                    <div className=" grid md:grid-cols-3 md:gap-5 grid-cols-1">
                        <div className="md:w-full md:h-[700px] w-full h-[450px]  relative overflow-hidden bg-gray-100">
                            <Image
                                src={'/images1.jpg'}
                                quality={50}
                                objectPosition='center'
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>

                        <div className="md:w-full md:h-[700px] w-full h-1/4 md:relative overflow-hidden hidden md:block bg-gray-100">
                            <Image
                                src={'/images1.jpg'}
                                quality={50}
                                objectPosition='center'
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>

                        <div className="md:w-full md:h-[700px] w-full h-1/4 md:relative overflow-hidden hidden md:block bg-gray-100">
                            <Image
                                src={'/images1.jpg'}
                                quality={50}
                                objectPosition='center'
                                objectFit='cover'
                                layout='fill'
                            />
                        </div>

                    </div>

                    <div className="flex flex-col px-5 md:px-0">
                        <span className=" font-light">SKINCARE</span>
                        <span className=" md:text-lg">Leuti Perfect Sublimate Serum</span>
                        {isLogin && <span className="mt-5 text-lg">Rp203.000</span>}
                    </div>

                    <div className="text-center md:text-left">
                        <Link href={{ pathname: '/product/leuti-perfect-sublimate-serum' }}>
                            <button className=" md:w-64 w-40 py-5 rounded-full border border-black">PRODUCT DETAIL</button>
                        </Link>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}


export async function getServerSideProps(context) {

    const { req, res } = context;
    let isLogin = false;
    let user = {};

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
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
            isLogin,
            user,
        }
    }
}