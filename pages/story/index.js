import Head from "next/head";
// import components
import Header from '../../components/header.component';
import Footer from '../../components/footer.component';

export default function Story() {
    return (
        <>
            <Head></Head>
            <Header />
            <main className=" md:w-4/5 m-auto">

                {/* banner */}
                <div className=" md:w-full md:h-[600px] md:grid md:grid-cols-2">
                    <div className=" md:w-full md:h-full bg-green-200"></div>
                    <div className=" md:w-full md:h-full bg-fuchsia-400"></div>
                    <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                        <h1 className="md:text-center">THE STORY</h1>
                        <h2 className="md:text-center md:text-4xl">LEUTI PERFECT SUBLIMATE SERUM</h2>
                    </div>
                </div>
                {/* end of banner */}

            </main>
            <Footer />
        </>
    );
}