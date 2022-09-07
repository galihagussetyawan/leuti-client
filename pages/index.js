import Head from 'next/head'
import dynamic from 'next/dynamic';

import CookiesService from '../services/cookies.service';

//import components
import Header from '../components/header.component';
import Caroussell from '../components/carousell.component';

import authService from '../services/auth.service';
import ProductService from '../services/product.service';
import CartService from '../services/cart.service';
import PointService from '../services/point.service';

const ProductDiscover = dynamic(() => import('../components/home/product-discover.component'));
const ProductHorizontalDiscover = dynamic(() => import('../components/home/product-horizontal-discover.component'));
const Footer = dynamic(() => import('../components/footer.component'));

export default function Home({ productList }) {

    return (
        <>
            <Head>
                <title>Leuti Perfect Sublimate Serum</title>
                <meta name="description" content="Mencari produk skincare yang cocok dengan kondisi kulit ibarat mencari tambatan hati. Pasalnya, produk skincare yang bagus sekalipun belum tentu cocok" />
                <meta name="keyword" content="produk, serum, kulit, produk perawatan kulit, leuti, skincare, skincare lokal, leuti skincare" />
            </Head>

            <Header />

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
    let point = 0;

    try {

        productList = await (await ProductService.getProducts())?.data?.data;
        const cookies = await CookiesService.getCookies('user', req, res);
        isAdmin = await authService.isAdmin(JSON.parse(cookies)?.accessToken);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data?.point;
                isLogin = true;
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
        }
    }
}