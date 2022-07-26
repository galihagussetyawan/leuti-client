import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer.component";
import Header from "../../components/header.component";

export default function Register() {
    return (
        <>
            <Header />

            <main className="flex md:px-10 md:py-14">
                <div className="md:w-2/5 bg-gray-200">
                    <Image
                        width={300}
                        height={300}
                        src={'/images2.jpg'}
                        layout='responsive'
                        loading='lazy'
                        objectFit='cover'
                    />
                </div>

                <div className="md:w-3/5 md:flex md:flex-col md:px-36 md:gap-14 md:justify-center">
                    <h1 className=" md:text-3xl">WELCOME</h1>

                    <div className=" md:flex md:flex-col md:gap-5">

                        <div className="md:w-3/5 md:flex gap-5">
                            <div className="md:w-full md:flex md:flex-col">
                                <span>Firstname</span>
                                <input className=" md:h-12 outline-none md:px-3 border border-gray-400" />
                            </div>
                            <div className="md:w-full md:flex md:flex-col">
                                <span>Lastname</span>
                                <input className=" md:h-12 outline-none md:px-3 border border-gray-400" />
                            </div>
                        </div>
                        <div className="md:w-3/5 md:flex md:flex-col">
                            <span>Email address</span>
                            <input type={'email'} className=" md:h-12 outline-none md:px-3 border border-gray-400" />
                        </div>
                        <div className="md:w-3/5 md:flex md:flex-col">
                            <span>Password</span>
                            <input type={'password'} className=" md:h-12 outline-none md:px-3 border border-gray-400" />
                        </div>
                    </div>

                    <div>
                        <button className=" md:h-12 px-10 rounded-full text-white bg-black">CREATE ACCOUNT</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="md:text-xl md:font-semibold">Already have an account</span>
                        <Link href={{ pathname: 'login' }}>
                            <span className=" md:cursor-pointer md:hover:underline">Sign In Here</span>
                        </Link>
                    </div>
                </div>


            </main>

            <Footer />
        </>
    );
}