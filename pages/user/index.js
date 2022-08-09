import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import CookiesService from "../../services/cookies.service";
import UserService from "../../services/user.service";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));

import Tab from "../../components/account/tab.component";

//import helpers
import Capitalize from "../../lib/helpers/capitalize.help";

export default function User({ userData }) {

    const [tab, setTab] = useState('account-tab');

    const handleClickTab = event => {

        event.preventDefault();
        setTab(event.currentTarget.id)
    }

    const handleClassName = (tab, tabId) => {
        return `md:h-16 md:flex md:items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300 ${tab === tabId && 'md:font-semibold'}`;
    }

    return (
        <>
            <Head></Head>
            <Header />
            <main className="md:w-4/5 flex flex-col space-y-9 m-auto md:py-20">

                <div className=" md:flex md:justify-between">
                    <span className="md:text-4xl">{`Welcome ${Capitalize(userData?.firstname)} ${Capitalize(userData.lastname)}`}</span>
                    <span className="md:text-4xl">Point 3000</span>
                </div>

                <div className="md:w-full md:flex md:space-x-40">
                    <div className="md:w-2/6">
                        <ul>
                            <li id="account-tab" className={handleClassName(tab, 'account-tab')} onClick={handleClickTab}>ACCOUNT</li>
                            <li id="address-tab" className={handleClassName(tab, 'address-tab')} onClick={handleClickTab}>ACCOUNT INFORMATION</li>
                            <li className="md:h-16 md:flex md:items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300">ORDER</li>
                            <li className="md:h-16 md:flex md:items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300">BILLING</li>
                            <li className="md:h-16 md:flex md:items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300">CART</li>
                            <li className="md:h-16 md:flex md:items-center md:border-y md:hover:font-bold md:cursor-pointer md:border-gray-300">LOGOUT</li>
                        </ul>
                    </div>

                    <Tab state={tab} data={userData} />
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