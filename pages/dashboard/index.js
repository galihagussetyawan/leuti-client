import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import AuthContext from "../../lib/context/auth.context";

import AuthService from "../../services/auth.service";
import CookiesService from "../../services/cookies.service";
import ProductService from "../../services/product.service";
import UserService from "../../services/user.service";
import PointService from "../../services/point.service";
import OrderService from "../../services/order.service";

const TabDashboardComponent = dynamic(() => import('../../components/dashboard/tab-dashboard.component'));

export default function Dashboard({ countNewOrders, countNowOrders }) {

    const router = useRouter();

    const { user } = useContext(AuthContext);
    const { tab } = router.query;

    const [newOrdersTotal, setNewOrdersTotal] = useState(countNewOrders);
    const [nowOrdersTotal, setNowOrdersTotal] = useState(countNowOrders);

    useEffect(() => {

        const interval = setInterval(() => {

            OrderService.getCountNewOrdersClient()
                .then(res => setNewOrdersTotal(res?.data?.data));

            OrderService.getCountNowOrdersClient()
                .then(res => setNowOrdersTotal(res?.data?.data))

        }, 1000 * 60)

        return () => clearInterval(interval);

    }, [newOrdersTotal, nowOrdersTotal])

    const styleActiveMenu = (id) => {

        if (id === tab) return 'font-semibold underline';
    }

    return (
        <>
            <Head>
                <title>Dashboard | Leuti</title>
            </Head>

            <header className="md:px-10 md:py-2 md:sticky md:top-0 md:flex md:z-10 md:justify-between md:border-b md:bg-white">

                <Link href={{ pathname: '/' }}>
                    <div className="md:w-32 md:h-14 md:relative md:hover:cursor-pointer">
                        <Image
                            priority
                            quality={100}
                            src={'/wordmark-logo.png'}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                </Link>

                <div className=" md:flex md:items-center">
                    <span>{user?.username}</span>
                </div>

            </header>

            <main className="md:w-full max-w-screen md:flex">

                {/* left column / menu */}
                <div className="md:min-w-[15%] md:max-w-[15%] md:border-r md:py-20 md:px-10">
                    <ul className="md:space-y-10 sticky top-40">
                        <li>
                            <Link href={{ pathname: '/dashboard' }}>OVERVIEW</Link>
                        </li>
                        <li className="md:space-y-3">
                            <span>PRODUCTS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li className={`${styleActiveMenu('product-list')} md:hover:underline`}>
                                    <Link href={{ query: { tab: 'product-list' } }}>PRODUCT LIST</Link>
                                </li>
                                <li className={`${styleActiveMenu('create-product')} md:hover:underline`}>
                                    <Link href={{ query: { tab: 'create-product' } }}>CREATE PRODUCT</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="md:space-y-3">
                            <span>AGENTS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li className={`${styleActiveMenu('agent-list')} md:hover:underline`}>
                                    <Link href={{ query: { tab: 'agent-list' } }}>AGENT LIST</Link>
                                </li>
                                <li>AGENT RANKING</li>
                            </ul>
                        </li>
                        <li className="md:space-y-3">
                            <span>ORDERS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li className={`${styleActiveMenu('new-orders')} md:flex md:justify-between md:hover:underline`}>
                                    <Link href={{ query: { tab: 'new-orders' } }}>NEW ORDERS</Link>
                                    <span className="min-w-[23px] min-h-[23px] md:px-2 md:flex justify-center md:items-center md:text-white md:bg-red-600">{newOrdersTotal}</span>
                                </li>
                                <li className={`${styleActiveMenu('now-orders')} md:flex md:justify-between md:hover:underline`}>
                                    <Link href={{ query: { tab: 'now-orders' } }}>NOW ORDERS</Link>
                                    <span className=" min-w-[23px] min-h-[23px] md:px-2 md:flex justify-center md:items-center md:text-white md:bg-red-600">{nowOrdersTotal}</span>
                                </li>
                                <li className={`${styleActiveMenu('history-orders')} md:hover:underline`}>
                                    <Link href={{ query: { tab: 'history-orders' } }}>HiSTORY ORDERS</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {/* end of left column/menu */}

                <div className="md:w-full md:py-20 md:px-5 md:bg-slate-100">
                    <TabDashboardComponent />
                </div>

            </main>
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res, query } = context;
    const { tab, productid, page } = query;

    let isAdmin = false;
    let user = {};
    let productList = null;
    let product = null;
    let userList = [];
    let pointList = [];
    let ordersAllList = [];
    let countNewOrders = 0
    let countNowOrders = 0;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        isAdmin = await AuthService.isAdmin(JSON.parse(cookies).accessToken);
        productList = await (await ProductService.getProducts())?.data?.data;

        if (productid) {
            product = await (await ProductService.getProductById(productid))?.data?.data;
        }

        if (!isAdmin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed) {
                user = cookiesParsed;
                userList = await (await UserService.getUsers(req, res, page))?.data?.data;
                pointList = await (await PointService.getPoints(req, res))?.data?.data;
                ordersAllList = await (await OrderService.getAllOrders(tab, req, res))?.data?.data;
                countNewOrders = await (await OrderService.getCountNewOrders(req, res))?.data?.data;
                countNowOrders = await (await OrderService.getCountNowOrders(req, res))?.data?.data;
            }
        }

    } catch (error) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            user,
            productList,
            product,
            userList,
            pointList,
            ordersAllList,
            countNewOrders,
            countNowOrders,
        }
    }
}