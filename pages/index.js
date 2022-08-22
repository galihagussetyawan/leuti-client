import Head from 'next/head'
import dynamic from 'next/dynamic';

import CookiesService from '../services/cookies.service';

//import components
import Header from '../components/header.component';
import Caroussell from '../components/carousell.component';

import authService from '../services/auth.service';
import ProductService from '../services/product.service';

const ProductDiscover = dynamic(() => import('../components/home/product-discover.component'));
// const ProductDisplay = dynamic(() => import('../components/home/product-display.component'));
const ProductHorizontalDiscover = dynamic(() => import('../components/home/product-horizontal-discover.component'));
const Footer = dynamic(() => import('../components/footer.component'));

export default function Home({ productList }) {
    return (
        <>
            <Head>
                <title>LEUTI.ID | Leuti Perfect Sublimate Serum</title>
                <meta name="description" content="Leuti" />
            </Head>

            <Header />

            <main className='md:w-4/5 flex flex-col space-y-20 m-auto'>

                {/* carousell */}
                <div className='md:w-full md:h-[650px] w-full h-screen flex justify-center md:my-10 bg-white md:bg-gray-100'>
                    <Caroussell />
                </div>
                {/* end carousell */}

                {
                    productList.map((data, index) => {
                        return <ProductDiscover key={index} images={data.images} name={data.name} />
                    })
                }
                {/* <ProductDisplay /> */}
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
    let productList;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);
        isAdmin = await authService.isAdmin(JSON.parse(cookies).accessToken);
        productList = await ProductService.getProducts();

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
            isAdmin,
            productList: productList.data.data,
        }
    }
}