import Head from "next/head";
import dynamic from "next/dynamic";

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));

export default function User({ data }) {
    return (
        <>
            <Head></Head>
            <Header />
            <main>
                <div>user</div>
            </main>
            <Footer />
        </>
    );
}