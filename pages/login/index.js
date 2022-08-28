import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthService from '../../services/auth.service';

//import components
import Footer from '../../components/footer.component';
import Header from '../../components/header.component';

export default function Login() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSignin = () => {
        setIsLoading(true);
        setError();

        AuthService.signin(username, password)
            .then(response => {

                if (response.status === 200) {
                    setIsLoading(false);
                }

                router.replace(router.asPath)
                    .then(() => {

                        router.replace(router.asPath);

                    });

            })
            .catch(error => {
                setIsLoading(false);
                setError(error.response.data.error_message);
            });
    }

    const handleToggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }

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

                <div className="md:w-3/5 w-full flex flex-col justify-center md:px-36 px-5 space-y-10 md:justify-center">
                    <div className='flex flex-col text-center md:text-left'>
                        <span className="text-4xl md:text-3xl">LOGIN</span>
                        <span>Please enter Username and your Password</span>
                    </div>

                    <div className="flex flex-col md:space-y-5 space-y-3">

                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Username or Email</span>
                                <input className="h-7 outline-none text-lg font-semibold" onChange={handleChangeUsername} />
                            </div>
                        </div>

                        <div className="md:w-3/5 border border-black">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm md:text-gray-700 text-black">Password</span>
                                <div className='flex'>
                                    <input type={isShowPassword ? 'text' : 'password'} className="w-full h-7 outline-none text-lg font-semibold" onChange={handleChangePassword} />
                                    <button onClick={handleToggleShowPassword}>
                                        {
                                            isShowPassword ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                </svg>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* error exception */}
                        <div className='md:w-3/5 h-10'>
                            {error && <span className='w-full h-full flex items-center px-3 text-red-700 bg-red-200'>{error}</span>}
                        </div>
                        {/* end of error exception */}
                    </div>

                    <div>
                        <button className="md:w-1/3 w-full py-5 rounded-full text-white bg-black" disabled={isLoading && true} onClick={handleSignin}>
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
                                    <span>LOGIN</span>
                            }
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2">
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