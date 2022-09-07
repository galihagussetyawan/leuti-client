import dynamic from "next/dynamic";
import Head from "next/head";

//import components
import Header from "../components/header.component";
const Footer = dynamic(() => import('../components/footer.component'));

export default function Error({ statusCode }) {
    return (
        <>
            <Head></Head>
            <Header />
            <main>
                <p>
                    {statusCode
                        ? `An error ${statusCode} occurred on server`
                        : 'An error occurred on client'}
                </p>
            </main>
            <Footer />
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404
    return { statusCode }
}