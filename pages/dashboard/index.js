import { useContext } from "react";
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

import TabDashboardComponent from "../../components/dashboard/tab-dashboard.component";

export default function Dashboard() {

    const router = useRouter();

    const { user } = useContext(AuthContext);
    const { tab } = router.query;

    return (
        <>
            <Head>
                <title>{!tab ? 'Dashboard' : 'Dashboard | ' + tab}</title>
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

            <main className="md:flex">

                {/* left column / menu */}
                <div className="md:w-1/5 md:border-r md:py-20 md:px-10 ">
                    <ul className=" md:space-y-10">
                        <li>
                            <Link href={{ pathname: '/dashboard' }}>OVERVIEW</Link>
                        </li>
                        <li className="md:space-y-3">
                            <span>PRODUCTS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li>
                                    <Link href={{ query: { tab: 'product-list' } }}>PRODUCT LIST</Link>
                                </li>
                                <li>
                                    <Link href={{ query: { tab: 'create-product' } }}>CREATE PRODUCT</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="md:space-y-3">
                            <span>AGENTS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li>
                                    <Link href={{ query: { tab: 'agent-list' } }}>AGENT LIST</Link>
                                </li>
                                <li>AGENT RANKING</li>
                            </ul>
                        </li>
                        <li className="md:space-y-3">
                            <span>ORDERS</span>
                            <ul className="md:ml-10 md:space-y-3 md:text-gray-500">
                                <li>NEW ORDER</li>
                                <li>ORDER HISTORY</li>
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
    const { orderstatus } = query;

    let isAdmin = false;
    let user = {};
    let productList;
    let userList = [];
    let pointList = [];
    let ordersAllList = [];


    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        isAdmin = await AuthService.isAdmin(JSON.parse(cookies).accessToken);
        productList = await ProductService.getProducts();

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
                userList = await (await UserService.getUsers(req, res))?.data?.data;
                pointList = await (await PointService.getPoints(req, res))?.data?.data;
                ordersAllList = await (await OrderService.getAllOrders(orderstatus, req, res))?.data?.data;
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
            productList: productList?.data?.data,
            userList,
            pointList,
            ordersAllList,
        }
    }
}