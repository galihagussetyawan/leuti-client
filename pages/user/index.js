import Head from "next/head";
import dynamic from "next/dynamic";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));

import CookiesService from "../../services/cookies.service";
import UserService from "../../services/user.service";

export default function User({ data }) {

    const convertTimes = (date) => {

        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'full',
        });
    }

    return (
        <>
            <Head></Head>
            <Header />
            <main>
                <h1>{data?.username}</h1>
                <span>{convertTimes(data?.createdAt)}</span>
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
                isLogin = true;
                user = cookiesParsed;
                userData = await UserService.getUserById(cookiesParsed.userId);
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
            data: userData?.data?.data,
        }
    }
}