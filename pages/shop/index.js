//import components
import Head from "next/head";
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