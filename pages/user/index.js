import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import CookiesService from "../../services/cookies.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import PoinService from "../../services/point.service";
import CartService from "../../services/cart.service";
import OrderService from "../../services/order.service";
import RewardService from "../../services/reward.service";
import RoyaltyService from "../../services/royalty.service";
import SponsorService from "../../services/sponsor.service";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));
import Tab from "../../components/account/tab.component";

//import helpers
import Capitalize from "../../lib/helpers/capitalize.help";

export default function User({ userData, userDetail, point }) {

    const router = useRouter();
    const { menu } = router.query;

    const [tab, setTab] = useState(!menu ? 'account-tab' : menu);
    const [isOpen, setIsOpen] = useState(!menu ? false : true);

    const handleClickTab = (tab) => {

        return () => {

            router.push({
                query: {
                    menu: tab
                }
            })
                .then(() => {
                    setIsOpen(true);
                    setTab(tab);
                })

        }
    }

    const handleClassName = (tab, tabId) => {
        if (tab === null) return 'md:h-16 h-14 flex justify-between items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300 md:font-semibold';

        return `md:h-16 h-14 flex justify-between items-center md:hover:font-bold md:cursor-pointer ${tab === tabId && 'md:font-semibold'}`;
    }

    const handleLogout = () => {
        AuthService.logout();
        router.reload();
    };

    const handleBackMenu = () => {
        router.replace('/user')
            .then(() => setIsOpen(false));
    }

    //components
    const menuItem = (title) => {
        return (
            <>
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </>
        );
    }

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'medium',
        })
    }

    const navigationBarTitle = () => {

        if (menu === 'account-tab') return 'Account';
        if (menu === 'address-tab') return 'Account Information';
        if (menu === 'reward-tab') return 'Reward';
        if (menu === 'order-tab') return 'Order List';
        if (menu === 'sponsor-tab') return 'Sponsor';
    }

    //headers title
    const headerTitle = () => {

        if (tab === 'account-tab') return 'Account | Leuti Asia';
        if (tab === 'address-tab') return 'Account Information | Leuti Asia';
        if (tab === 'order-tab') return 'Order List | Leuti Asia';
        if (tab === 'reward-tab') return 'Reward | Leuti Asia';
        if (tab === 'sponsor-tab') return 'Sponsor | Leuti Asia';

        return 'Account | Leuti';
    }

    return (
        <>
            <Head>
                <title>{headerTitle()}</title>
            </Head>

            <Header />
            <main className="md:w-4/5 md:space-y-9 space-y-0 m-auto md:py-10 px-5">

                {/* back button on mobile view */}
                <button className={`${isOpen ? 'flex' : 'hidden'} md:hidden flex items-center space-x-1`} onClick={handleBackMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <p className="font-semibold">{navigationBarTitle()}</p>
                </button>
                {/* end back button on mobile view */}

                {/* welcome user section */}
                <div className={`${!isOpen ? 'visible' : 'hidden'} md:flex md:justify-between space-y-10 md:items-center`}>

                    {/* mobile version */}
                    <div className="w-full md:hidden flex flex-col space-y-3">
                        <div className="flex justify-center">
                            <div className=" w-36 h-36 flex justify-center items-center bg-gray-200">
                                <p className="capitalize text-xl text-gray-400">{userData?.roles[0]}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className=" text-2xl">{Capitalize(userData?.firstname)} {Capitalize(userData?.lastname)}</span>
                            <span className=" font-light">{userData?.username}</span>
                        </div>

                        <div className="flex border-b border-gray-300 py-5">
                            <div className="w-full flex flex-col text-center">
                                <span className="text-sm font-semibold">POINT</span>
                                <span>{point?.point}</span>
                            </div>
                            <div className="w-full flex flex-col text-center">
                                <span className="text-sm font-semibold">RANK</span>
                                <span>-</span>
                            </div>
                            <div className="w-full flex flex-col text-center">
                                <span className="text-sm font-semibold">JOIN</span>
                                <p>{convertDate(userData?.createdAt)}</p>
                            </div>
                        </div>

                    </div>
                    {/* end of mobile version */}
                </div>
                {/* end of welcome user section */}

                <div className="md:w-full md:flex md:space-x-40">

                    {/* menu list */}
                    <div className={`md:w-2/6 md:block mt-10 ${isOpen ? 'hidden' : 'block'}`}>

                        <div className="hidden md:flex md:justify-between mb-10 text-lg font-semibold">
                            <div>Welcome, {userData?.username}</div>
                            <div className="flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{point?.point}</span>
                            </div>
                        </div>

                        <ul className=" divide-y">
                            <li id="account-tab" className={handleClassName(tab, 'account-tab')} onClick={handleClickTab('account-tab')}>{menuItem('ACCOUNT')}</li>
                            <li id="address-tab" className={handleClassName(tab, 'address-tab')} onClick={handleClickTab('address-tab')}>{menuItem('ACCOUNT INFORMATION')}</li>
                            <li id="order-tab" className={handleClassName(tab, 'order-tab')} onClick={handleClickTab('order-tab')}>{menuItem('ORDER')}</li>
                            <li id="sponsor-tab" className={handleClassName(tab, 'sponsor-tab')} onClick={handleClickTab('sponsor-tab')}>{menuItem('SPONSOR')}</li>
                            <li id="billing-tab" className={handleClassName(tab, 'billing-tab')} onClick={handleClickTab('billing-tab')}>{menuItem('BILLING')}</li>
                            <li id="billing-tab" className={handleClassName(tab, 'reward-tab')} onClick={handleClickTab('reward-tab')}>{menuItem('REWARD')}</li>
                            <li id="logout-tab" className={handleClassName(tab, 'logout-tab')} onClick={handleLogout}>LOGOUT</li>
                        </ul>
                    </div>
                    {/* end of menu list */}

                    <div className={`md:w-full w-full md:block md:static mt-7 md:m-0 ${isOpen ? 'block relative left-0' : 'hidden'}`}>
                        <Tab data={userData} userDetail={userDetail} />
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}


export async function getServerSideProps(context) {

    const { req, res, query } = context;
    const { menu } = query;

    let isLogin = false;
    let user = {};
    let userData = null;
    let point = null;
    let carts = [];
    let userDetail = null;
    let orderList = [];
    let rewardList = [];
    let royalties = null;
    let sponsors = null;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                isLogin = true;

                userData = await (await UserService.getUserById(user?.userId))?.data?.data;
                point = await (await PoinService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                userDetail = userData?.detail;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                rewardList = await (await RewardService.getAllRewards())?.data?.data;
                if (menu === 'order-tab') orderList = await (await OrderService.getOrdersByUser(req, res))?.data?.data;
                if (menu === 'sponsor-tab') sponsors = await (await SponsorService.getAllSponsorByUser(req, res))?.data?.data;
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
            userData,
            userDetail,
            point,
            carts,
            orderList,
            rewardList,
            royalties,
            sponsors,
        }
    }
}