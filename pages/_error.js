import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

//import components
import Header from "../components/header.component";
const Footer = dynamic(() => import('../components/footer.component'));

export default function Error({ statusCode }) {

    const router = useRouter();

    const handleNavigate = (url) => {

        return () => router.replace(url);
    }

    const componentContent = () => {

        if (statusCode === 404) {
            return (
                <div className="flex flex-col space-y-20 md:py-60 justify-center items-center">
                    <h1 className="md:text-9xl">404</h1>
                    <p className="text-2xl">This page has been probably moved somewhere.</p>
                    <button className="uppercase py-5 px-20 rounded-full text-white bg-black" onClick={handleNavigate('/')}>back to homepage</button>
                </div>
            );
        }

        if (statusCode >= 500) {
            return (
                <div className="flex flex-col space-y-20 md:py-60 justify-center items-center">
                    <h1 className="md:text-9xl">500</h1>
                    <p className="text-2xl">Internal Server Error</p>
                </div>
            )
        }
    }

    return (
        <>
            <Head></Head>
            <Header />
            <main>
                {componentContent()}
            </main>
            <Footer />
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res?.statusCode : err ? err?.statusCode : 404;
    return { statusCode }
}