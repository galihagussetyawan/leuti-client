import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer.component";
import Header from "../../components/header.component";

export default function Register() {
    return (
        <>
            <Header />

            <main className="flex flex-col md:flex-row md:px-10 md:py-14">

                <div className="md:w-2/5 hidden md:block md:relative bg-gray-100">
                    <Image
                        src={'/images2.jpg'}
                        layout='fill'
                        loading='lazy'
                        objectFit='cover'
                    />
                </div>

                <div className="md:w-3/5 h-screen flex flex-col justify-center md:px-36 px-5 md:gap-14 gap-10 md:justify-center">
                    <h1 className=" text-3xl md:text-3xl">WELCOME!</h1>

                    <div className="flex flex-col md:gap-5 gap-5">

                        <div className="md:w-3/5 flex flex-col gap-5">
                            <div className="md:w-full flex flex-col gap-2">
                                <span>Firstname</span>
                                <input className=" h-12 outline-none md:px-3 border border-gray-400" />
                            </div>
                            <div className="md:w-full flex flex-col gap-2">
                                <span>Lastname</span>
                                <input className=" h-12 outline-none md:px-3 border border-gray-400" />
                            </div>
                        </div>
                        <div className="md:w-3/5 flex flex-col gap-2">
                            <span>Email address</span>
                            <input type={'email'} className="h-12 outline-none md:px-3 border border-gray-400" />
                        </div>
                        <div className="md:w-3/5 flex flex-col gap-2">
                            <span>Password</span>
                            <input type={'password'} className="h-12 outline-none md:px-3 border border-gray-400" />
                        </div>
                    </div>

                    <div>
                        <button className=" md:h-12 h-12 px-10 rounded-full text-white bg-black">CREATE ACCOUNT</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className=" text-xl md:text-xl font-semibold">Already have an account</span>
                        <Link href={{ pathname: 'login' }}>
                            <span className=" md:cursor-pointer md:hover:underline underline font-medium">Sign In Here</span>
                        </Link>
                    </div>
                </div>


            </main>

            <Footer />
        </>
    );
}