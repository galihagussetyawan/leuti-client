import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import CookiesService from "../../services/cookies.service";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));

import Tab from "../../components/account/tab.component";

//import helpers
import Capitalize from "../../lib/helpers/capitalize.help";
import { useRouter } from "next/router";

export default function User({ userData }) {

    const router = useRouter();

    const [tab, setTab] = useState('account-tab');
    const [isOpen, setIsOpen] = useState(false);

    const handleClickTab = event => {

        event.preventDefault();
        setTab(event.currentTarget.id);
        setIsOpen(true);
    }

    const handleClassName = (tab, tabId) => {
        return `md:h-16 h-10 flex justify-between items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300 ${tab === tabId && 'md:font-semibold'}`;
    }

    const handleLogout = () => {
        AuthService.logout();
        router.reload();
    };

    const handleBackMenu = () => {
        setIsOpen(false);
    }

    //components
    const menuItem = (title) => {
        return (
            <>
                <span>{title}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </>
        );
    }

    return (
        <>
            <Head></Head>
            <Header />
            <main className="md:w-4/5 md:space-y-9 space-y-0 m-auto md:py-10 px-5">

                {/* back button on mobile view */}
                <button className={`${isOpen ? 'flex' : 'hidden'} md:hidden flex space-x-3`} onClick={handleBackMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>back</span>
                </button>
                {/* end back button on mobile view */}

                {/* welcome user section */}
                <div className={`${!isOpen ? 'visible' : 'hidden'} md:flex md:justify-between md:items-center`}>

                    {/* dekstop version */}
                    <span className="md:text-4xl md:block hidden">Welcome {Capitalize(userData?.firstname)} {Capitalize(userData?.lastname)}</span>
                    <span className="md:text-xl md:block hidden">POINT 3000</span>
                    {/* end of dekstop version */}

                    {/* mobile version */}
                    <div className="w-full md:hidden flex flex-col space-y-3">
                        <div className="flex justify-center">
                            <div className=" w-36 h-36 bg-gray-300"></div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span>{Capitalize(userData?.firstname)} {Capitalize(userData?.lastname)}</span>
                            <span>{userData?.username}</span>
                        </div>

                        <div className="flex">
                            <div className="w-full flex flex-col text-center bg-red-300">
                                <span>POINT</span>
                                <span>213123</span>
                            </div>
                            <div className="w-full flex flex-col text-center bg-green-400">join</div>
                        </div>

                    </div>
                    {/* end of mobile version */}
                </div>
                {/* end of welcome user section */}

                <div className="md:w-full md:flex md:space-x-40">

                    {/* menu list */}
                    <div className={`md:w-2/6 md:block ${isOpen ? 'hidden' : 'block'}`}>
                        <ul>
                            <li id="account-tab" className={handleClassName(tab, 'account-tab')} onClick={handleClickTab}>{menuItem('ACCOUNT')}</li>
                            <li id="address-tab" className={handleClassName(tab, 'address-tab')} onClick={handleClickTab}>{menuItem('ACCOUNT INFORMATION')}</li>
                            <li id="order-tab" className={handleClassName(tab, 'order-tab')} onClick={handleClickTab}>{menuItem('ORDER')}</li>
                            <li id="sponsor-tab" className={handleClassName(tab, 'sponsor-tab')} onClick={handleClickTab}>{menuItem('SPONSOR')}</li>
                            <li id="billing-tab" className={handleClassName(tab, 'billing-tab')} onClick={handleClickTab}>{menuItem('BILLING')}</li>
                            <li id="cart-tab" className={handleClassName(tab, 'cart-tab')} onClick={handleClickTab}>{menuItem('CART')}</li>
                            <li id="logout-tab" className={handleClassName(tab, 'logout-tab')} onClick={handleLogout}>LOGOUT</li>
                        </ul>
                    </div>
                    {/* end of menu list */}

                    <div className={`md:w-full w-full md:block md:static ${isOpen ? 'block relative left-0' : 'hidden'}`}>
                        <Tab state={tab} data={userData} />
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}


export async function getServerSideProps(context) {

    const { req, res } = context;
    let isLogin = false;
    let user = {};
    let userData;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                isLogin = true;

                userData = await UserService.getUserById(user.userId);
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
            userData: userData.data.data,
        }
    }
}