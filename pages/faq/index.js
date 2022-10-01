import Head from "next/head";

import CartService from "../../services/cart.service";
import CookiesService from "../../services/cookies.service";
import PointService from "../../services/point.service";
import RoyaltyService from "../../services/royalty.service";

import Footer from "../../components/footer.component";
import Header from "../../components/header.component";
import AccordionFaqComponent from "../../components/faq/accordion.faq.component";

const faqData = [
    {
        title: 'Apakah LEUTI itu?',
        description: 'LEUTI adalah brand Indonesia yang bergerak dalam bidang estetika khususnya perawatan kulit yang mempersembahkan produk-produk extraordinary.'
    },
    {
        title: 'Produk apa saja yang sudah dikeluarkan LEUTI saat ini?',
        description: 'Produk yang sudah dikeluarkan LEUTI yaitu Perfect Sublimate Serum, yaitu serum dengan efektifitas 5 skincare sekaligus.'
    },
    {
        title: 'LEUTI Perfect Sublimate Serum paling cocok untuk jenis kulit yang bagaimana?',
        description: 'LEUTI Perfect Sublimate Serum cocok digunakan untuk kulit normal cenderung ke kering'
    },
    {
        title: 'Apa efektifitas LEUTI Perfect Sublimate Serum?',
        description: 'Efektifitas LEUTI Perfect Sublimate Serum sangat banyak, yaitu memudarkan flek hitam, membuat kuti menjadi lebih cerah, halus, lembab dan sebagai anti-aging sehingga kulit terasa lebih kenyal karena mengandung anti oksidan yang kuat. '
    },
    {
        title: 'Bagaimana cara order produk-produk LEUTI?',
        description: 'Untuk order produk dapat langsung melalui chat wa yang tertera pada kontak website, instagram leuti_official, atau melalui agen-agen LEUTI terdekat.'
    },
    {
        title: 'Bagaimana jika tidak cocok menggunakan produk LEUTI?',
        description: 'Kemungkinan ketidak cocokan terhadap produk LEUTI sangat minim, karena sebelum produk dipasarkan telah melalui uji klinis pada 100 orang. Namun tetap ada kemungkinan kecil untuk terjadinya alergi yaitu ditandai dengan gatal. Jika terjadi alergi, maka pemakaian dapat dihentikan.',
    },

];

export default function Faq() {

    return (
        <>
            <Head>
                <title>FAQ | Leuti Asia</title>
            </Head>

            <main className="md:w-4/5 md:space-y-9 space-y-10 m-auto md:py-10 px-5">
                <h1 className="text-2xl text-center capitalize">Frequently asked questions</h1>

                <div className="w-full md:w-3/5 m-auto flex flex-col space-y-4">

                    {
                        faqData?.map((data, index) => {
                            return (
                                <AccordionFaqComponent key={index} id={index} title={data?.title}>
                                    <p>{data?.description}</p>
                                </AccordionFaqComponent>
                            );
                        })
                    }

                </div>

            </main>

            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    let isLogin = false;
    let user = {};
    let carts = [];
    let point = null;
    let royalties = null;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
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
            carts,
            point,
            royalties,
        }
    }
}