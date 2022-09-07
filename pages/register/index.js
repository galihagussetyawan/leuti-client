import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import UserService from '../../services/user.service';
import CookiesService from "../../services/cookies.service";

const Footer = dynamic(() => import('../../components/footer.component'));
import Header from "../../components/header.component";

export default function Register() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        setError();

        if (
            firstname === "" ||
            lastname === "" ||
            username === "" ||
            password === "" ||
            email === ""
        ) {
            setIsLoading(false);
            setError('data tidak boleh kosong');
        } else {

            UserService.createUser(firstname, lastname, username, email, password)
                .then(res => {

                    if (res.status === 201) {
                        setIsLoading(false);
                        CookiesService.setCookies('user', res.data.data);
                        router.reload();
                    }

                })
                .catch(error => {

                    setIsLoading(false);
                    setError(error.response.data.error_message);
                });
        }
    }

    return (
        <>
            <Header />

            <main className="flex flex-col md:flex-row md:px-10 md:py-14">

                <div className="md:w-2/5 md:h-[600px] hidden md:flex md:relative bg-gray-100">
                    <Image
                        src={'/images2.jpg'}
                        alt="Leuti Perfect Sublimate Serum"
                        layout='fill'
                        loading='lazy'
                        objectFit='cover'
                    />
                </div>

                <div className="md:w-3/5 flex flex-col justify-center md:px-36 px-5 md:space-y-5 space-y-10 md:justify-center">
                    <h1 className="text-4xl md:text-3xl text-center md:text-left">Create account</h1>

                    <div className="flex flex-col space-y-3 md:space-y-5">

                        <div className="md:w-3/5 grid grid-cols-2 gap-5">
                            <div className="border border-black">
                                <div className="flex flex-col px-4 py-2">
                                    <span className="text-sm md:text-gray-700 text-black">Firstname</span>
                                    <input className="outline-none text-lg font-semibold" onChange={handleChangeFirstname} />
                                </div>
                            </div>

                            <div className="border border-black">
                                <div className="flex flex-col px-4 py-2">
                                    <span className="text-sm md:text-gray-700 text-black">Lastname</span>
                                    <input className="outline-none text-lg font-semibold" onChange={handleChangeLastname} />
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Username</span>
                                <input className="outline-none text-lg font-semibold" onChange={handleChangeUsername} />
                            </div>
                        </div>
                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Email</span>
                                <input className="outline-none text-lg font-semibold" onChange={handleChangeEmail} />
                            </div>
                        </div>
                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Password</span>
                                <input type={'password'} className="outline-none text-lg font-semibold" onChange={handleChangePassword} />
                            </div>
                        </div>
                        {/* error exception */}
                        <div className='md:w-3/5 h-10'>
                            {error && <span className='w-full h-full flex items-center px-3 text-red-700 bg-red-200'>{error}</span>}
                        </div>
                        {/* end of error exception */}
                    </div>

                    <div>
                        <button className="md:w-1/3 w-full py-5 rounded-full text-white bg-black" onClick={handleSignUp}>
                            {
                                isLoading ?
                                    <span>
                                        <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Loading...
                                    </span>
                                    :
                                    <span>CREATE ACCOUNT</span>
                            }
                        </button>
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