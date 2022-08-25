import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";

import CookiesService from "../../services/cookies.service";
import CartService from "../../services/cart.service";
import ProductService from "../../services/product.service";

import Footer from "../../components/footer.component";
import Header from "../../components/header.component"

import AuthContext from "../../lib/context/auth.context";
import LocalCurrency from "../../lib/helpers/local-currency.help";
import { useRouter } from "next/router";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function Shop({ productList }) {

    const router = useRouter();
    const { isLogin } = useContext(AuthContext);

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    return (
        <div>
            <Head></Head>

            <Header />
            <main className="md:w-4/5 flex flex-col space-y-20 m-auto">

                <div className="text-center mt-14 space-y-5">
                    <span className="font-semibold text-5xl">LEUTI SHOP</span>
                    <p className="md:w-1/2 md:m-auto mx-5 leading-relaxed text-left md:text-center">LEUTI Perfect Sublimate Serum diciptakan bagi orang-orang yang menuntut kesempurnaan dan kualitas tinggi. Sebelum menyentuh pasar, serum ini telah melewati uji sampling keefektifitasan dimana 98% dari 100 orang dengan kulit normal sebagai sampling menunjukkan hasil yang memuaskan dalam jangka waktu maksimal 2 minggu. 80% dari mereka mengatakan bahwa hasil yang bagus dirasakan sejak pertama kali pemakaian serum LEUTI Perfect Sublimate Serum. Efek pada kulit dimana kulit menjadi lebih putih, flawless, halus, lembab, kenyal seperti sedang menyentuh agar-agar dirasakan secara bersamaan. </p>
                </div>

                {
                    productList?.map((data, index) => {
                        return (

                            <div key={index} className="space-y-5">
                                <div className=" grid md:grid-cols-3 md:gap-5 grid-cols-1">

                                    {
                                        data?.images?.map((image, index) => {
                                            return (
                                                <div key={index} className={`md:w-full md:h-[700px] w-full h-[450px] ${index !== 0 && 'hidden md:block'} relative overflow-hidden bg-gray-100`}>
                                                    <Image
                                                        className="scale-105"
                                                        loader={imageLoader}
                                                        src={image?.name}
                                                        quality={50}
                                                        objectPosition='center'
                                                        objectFit='cover'
                                                        layout='fill'
                                                    />
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div className="flex flex-col px-5 md:px-0">
                                    <span className=" font-light uppercase">{data?.category}</span>
                                    <span className=" md:text-lg">{data?.name}</span>
                                    {isLogin && <span className="mt-5 text-lg">{LocalCurrency(data?.price)}</span>}
                                </div>

                                <div className="text-center md:text-left">
                                    <a onClick={
                                        handleNavigate(
                                            {
                                                pathname: `/product/${data?.name?.toLowerCase().replaceAll(' ', '-')}`,
                                                query: {
                                                    id: data?.id
                                                }
                                            }
                                        )
                                    }>
                                        <button className=" md:w-64 w-40 py-5 rounded-full border border-black">PRODUCT DETAIL</button>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }

            </main>

            <Footer />
        </div>
    );
}


export async function getServerSideProps(context) {

    const { req, res, } = context;
    let isLogin = false;
    let user = {};
    let productList = null;
    let carts = [];

    try {

        productList = await (await ProductService.getProducts())?.data?.data;
        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
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
            productList,
            carts,
        }
    }
}