import Header from '../../components/header.component';
import Footer from '../../components/footer.component';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <>
            <Header />

            <main className="flex md:px-10 md:py-14">

                <div className="md:w-2/5 md:h-[600px] hidden md:block md:relative bg-gray-200">
                    <Image
                        src={'/images2.jpg'}
                        layout='fill'
                        loading='lazy'
                        objectFit='cover'
                    />
                </div>

                <div className="md:w-3/5 w-full flex flex-col justify-center md:px-36 px-5 md:gap-10 mt-5 gap-14 md:justify-center">
                    <h1 className="text-2xl md:text-3xl">LOGIN</h1>

                    <div className="flex flex-col md:gap-5 gap-3">

                        <div className="md:w-3/5 flex flex-col">
                            <span>Username atau Email</span>
                            <input className="md:h-12 h-9 outline-none px-3 border border-gray-500" />
                        </div>
                        <div className="md:w-3/5 flex flex-col">
                            <span>Password</span>
                            <input type={'password'} className="md:h-12 h-9 outline-none px-3 border border-gray-500" />
                        </div>
                    </div>

                    <div>
                        <button className="md:h-12 h-12 w-52 rounded-full text-white bg-black">LOGIN</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xl md:text-xl font-semibold">Don’t have an account yet ?</span>
                        <Link href={{ pathname: '/register' }}>
                            <span className="md:cursor-pointer md:hover:underline underline font-medium">Create An Account</span>
                        </Link>
                    </div>
                </div>


            </main>

            <Footer />
        </>
    );
}