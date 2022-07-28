import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer.component";
import Header from "../../components/header.component";

export default function Register() {
    return (
        <>
            <Header />

            <main className="flex flex-col md:flex-row md:px-10 md:py-14">

                <div className="md:w-2/5 md:h-[600px] hidden md:flex md:relative bg-gray-100">
                    <Image
                        src={'/images2.jpg'}
                        layout='fill'
                        loading='lazy'
                        objectFit='cover'
                    />
                </div>

                <div className="md:w-3/5 flex flex-col justify-center md:px-36 px-5 md:gap-10 mt-5 gap-14 md:justify-center">
                    <h1 className="text-4xl md:text-3xl">Create account</h1>

                    <div className="flex flex-col md:gap-5 gap-5">

                        <div className="md:w-3/5 grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1">
                                <label>Firstname</label>
                                <input className="h-12 outline-none px-3 border border-gray-500" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Lastname</label>
                                <input className="h-12 outline-none px-3 border border-gray-500" />
                            </div>
                        </div>
                        <div className="md:w-3/5 flex flex-col gap-1">
                            <label>Username</label>
                            <input className="h-12 outline-none px-3 border border-gray-500" />
                        </div>
                        <div className="md:w-3/5 flex flex-col gap-1">
                            <label>Email</label>
                            <input type={'email'} className="h-12 outline-none px-3 border border-gray-500" />
                        </div>
                        <div className="md:w-3/5 flex flex-col gap-1">
                            <label>Password</label>
                            <input type={'password'} className="h-12 outline-none px-3 border border-gray-500" />
                        </div>
                    </div>

                    <div>
                        <button className="md:h-12 h-12 w-52 rounded-full text-white bg-black">CREATE ACCOUNT</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xl md:text-xl font-semibold">Already have an account</span>
                        <Link href={{ pathname: 'login' }}>
                            <span className="md:cursor-pointer md:hover:underline underline font-medium">Sign In Here</span>
                        </Link>
                    </div>
                </div>


            </main>

            <Footer />
        </>
    );
}