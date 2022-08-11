import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import UserService from '../../services/user.service';
import CookiesService from "../../services/cookies.service";

import Footer from "../../components/footer.component";
import Header from "../../components/header.component";

export default function Register() {

    const router = useRouter();

    const [error, setError] = useState();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeFirstname = event => {
        setFirstname(event.target.value);
    }

    const handleChangeLastname = event => {
        setLastname(event.target.value);
    }

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSignUp = () => {
        setError();

        UserService.createUser(firstname, lastname, username, email, password)
            .then(res => {

                if (res.status === 201) {
                    CookiesService.setCookies('user', res.data.data);
                    router.push('/');
                }

            })
            .catch(error => setError(error.response.data.error_message));
    }

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

                <div className="md:w-3/5 flex flex-col justify-center md:px-36 px-5 md:space-y-5 space-y-10 md:justify-center">
                    <h1 className="text-4xl md:text-3xl">Create account</h1>

                    <div className="flex flex-col space-y-3 md:space-y-5">

                        <div className="md:w-3/5 grid grid-cols-2 gap-5">
                            <div className="border border-black">
                                <div className="flex flex-col px-4 py-2">
                                    <span className="text-sm md:text-gray-700 text-black">Firstname</span>
                                    <input className="h-7 outline-none text-lg font-semibold" onChange={handleChangeFirstname} />
                                </div>
                            </div>

                            <div className="border border-black">
                                <div className="flex flex-col px-4 py-2">
                                    <span className="text-sm md:text-gray-700 text-black">Lastname</span>
                                    <input className="h-7 outline-none text-lg font-semibold" onChange={handleChangeLastname} />
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Username</span>
                                <input className="h-7 outline-none text-lg font-semibold" onChange={handleChangeUsername} />
                            </div>
                        </div>
                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Email</span>
                                <input className="h-7 outline-none text-lg font-semibold" onChange={handleChangeEmail} />
                            </div>
                        </div>
                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Password</span>
                                <input type={'password'} className="h-7 outline-none text-lg font-semibold" onChange={handleChangePassword} />
                            </div>
                        </div>
                        {/* error exception */}
                        <div className='md:w-3/5 h-10'>
                            {error && <span className='w-full h-full flex items-center px-3 text-red-700 bg-red-200'>{error}</span>}
                        </div>
                        {/* end of error exception */}
                    </div>

                    <div>
                        <button className="md:h-12 h-12 w-52 rounded-full text-white bg-black" onClick={handleSignUp}>CREATE ACCOUNT</button>
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