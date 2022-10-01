import Head from 'next/head'
import dynamic from 'next/dynamic';
import { deleteCookie } from 'cookies-next';

import CookiesService from '../services/cookies.service';

//import components
import Caroussell from '../components/carousell.component';

import authService from '../services/auth.service';
import ProductService from '../services/product.service';
import CartService from '../services/cart.service';
import PointService from '../services/point.service';
import RoyaltyService from '../services/royalty.service';

const ProductDiscover = dynamic(() => import('../components/home/product-discover.component'));
const ProductHorizontalDiscover = dynamic(() => import('../components/home/product-horizontal-discover.component'));
const Footer = dynamic(() => import('../components/footer.component'));
const TestimonialCarousell = dynamic(() => import('../components/home/testimonials.carousell.home.component'));

export default function Home({ productList }) {

    return (
        <>
            <Head>
                <title>Leuti Perfect Sublimate Serum</title>
                <meta property="og:title" content="Leuti Perfect Sublimate Serum" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Mencari produk skincare yang cocok dengan kondisi kulit ibarat mencari tambatan hati. Pasalnya, produk skincare yang bagus sekalipun belum tentu cocok. Solusinya ada di Leuti Perfect Sublimate Serum" />
                <meta property="og:description" content="Mencari produk skincare yang cocok dengan kondisi kulit ibarat mencari tambatan hati. Pasalnya, produk skincare yang bagus sekalipun belum tentu cocok. Solusinya ada di Leuti Perfect Sublimate Serum" />
                <meta name="keywords" content="produk, serum, kulit, produk perawatan kulit, leuti, skincare, skincare lokal, leuti skincare" />
                <meta property="og:url" content="https://leuti.asia" />
                <meta property="og:type" content="website" />
                <meta name="robots" content="all" />
                <meta name="googlebot" content="index,follow" />
            </Head>

            <main className='md:w-4/5 flex flex-col space-y-20 m-auto'>

                {/* carousell */}
                <div className='md:w-full md:h-[650px] w-full h-screen flex justify-center md:my-10 bg-white md:bg-gray-100'>
                    <Caroussell />
                </div>
                {/* end carousell */}

                {
                    productList?.map((data, index) => {
                        return <ProductDiscover
                            key={index}
                            id={data?.id}
                            images={data?.images}
                            name={data?.name}
                            category={data?.category}
                            price={data?.price}
                        />
                    })
                }
                <ProductHorizontalDiscover />
                <TestimonialCarousell />

            </main>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    let isLogin = false;
    let user = {};
    let isAdmin = false;
    let productList = null;
    let carts = [];
    let point = null;
    let royalties = null;

    try {

        productList = await (await ProductService.getProducts())?.data?.data;
        const cookies = await CookiesService.getCookies('user', req, res);

        if (!await authService.isAgent(req, res)) {
            deleteCookie('user', { req, res });
        }

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                isLogin = true;
                isAdmin = await authService.isAdmin(req, res);
            }

        }

    } catch (error) {

        if (error?.code === 'ECONNREFUSED') {
            return {
                notFound: true,
            }
        }

        if (error) {
            isLogin = false;
        }
    }

    return {
        props: {
            isLogin,
            user,
            isAdmin,
            productList,
            carts,
            point,
            royalties,
        }
    }
}