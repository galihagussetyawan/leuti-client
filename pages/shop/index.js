import Head from "next/head";

import CookiesService from "../../services/cookies.service";

import Footer from "../../components/footer.component";
import Header from "../../components/header.component"

export default function Shop() {
    return (
        <div>
            <Head></Head>

            <Header />
            <main>
                <h1 className=" m-auto text-7xl">Shop Comming Soon</h1>
            </main>

            <Footer />
        </div>
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