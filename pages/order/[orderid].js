import Head from "next/head"
import dynamic from "next/dynamic"

import CookiesService from "../../services/cookies.service"
import OrderService from "../../services/order.service"
import PointService from "../../services/point.service"
import RoyaltyService from "../../services/royalty.service"
import CartService from "../../services/cart.service"

import Header from "../../components/header.component"
const Footer = dynamic(() => import('../../components/footer.component'))
const ShippingAddressPaymentOrder = dynamic(() => import('../../components/order/shpping-payment.order.component'));
const InvoiceOrder = dynamic(() => import('../../components/order/invoice.order.component'));

export default function Order({ order }) {

    const tab = () => {

        if (order?.status === 'created') return <ShippingAddressPaymentOrder />
        if (order?.status === 'unpaid' || 'approved') return <InvoiceOrder />

        return <div>Kosong</div>;
    }

    return (
        <>
            <Head>
                <title>Order | Leuti Asia</title>
            </Head>
            <Header />
            <main>
                {tab()}
            </main>
            <Footer />

        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res, params } = context;
    const { orderid } = params;

    let isLogin = false;
    let user = {};
    let carts = [];
    let order = null;
    let point = null;
    let royalties = null;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                order = (await OrderService.getOrderById(orderid, req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                isLogin = true;
            }

        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }
    }

    // order exception
    if (!order) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            isLogin,
            user,
            carts,
            order,
            point,
            royalties,
        }
    }
}