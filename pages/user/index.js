import Head from "next/head";
import dynamic from "next/dynamic";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));

import CookiesService from "../../services/cookies.service";

export default function User() {
    return (
        <>
            <Head></Head>
            <Header />
            <main>user</main>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    let isLogin = false;
    let user = {};

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

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
        }
    }
}