import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const Modal = dynamic(() => import('./modal.component'))

import AuthService from '../services/auth.service';

export default function LoginModal({ closeAction, isOpen }) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        setError();
        setIsLoading(true);

        setTimeout(() => {

            AuthService.signin(username, password)
                .then(res => {

                    setIsLoading(false);
                    router.reload();
                })
                .catch(error => {

                    setIsLoading(false);
                    setError(error?.response?.data?.error_message)
                })

        }, 1000);
    }

    const handleClose = () => {
        setError();
        setUsername("");
        setPassword("");
        closeAction();
    }

    return (
        <>
            <AnimatePresence>
                {
                    isOpen &&

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Modal>
                            <div className="md:relative md:w-[450px] md:h-[600px] md:flex md:flex-col md:items-center md:p-10 md:gap-12">

                                {/* close button */}
                                <div className="md:w-full md:h-10 md:flex md:justify-end">
                                    <button onClick={handleClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {/* end close button */}

                                <span className="md:text-2xl">LOGIN</span>

                                <div className=" md:flex md:flex-col gap-6">
                                    <div>
                                        <span>Username atau Email</span>
                                        <input className=" md:w-full md:h-11 md:border md:px-3 border-gray-300 md:outline-none" onChange={handleChangeUsername} />
                                    </div>
                                    <div>
                                        <span>Password</span>
                                        <input type={'password'} className=" md:w-full md:h-11 md:border md:px-3 border-gray-300 md:outline-none" onChange={handleChangePassword} />
                                    </div>
                                    <div className="md:w-full md:h-10">
                                        {error && <span className="md:w-full md:h-full md:flex md:items-center md:px-3 md:text-red-700 md:bg-red-200">{error}</span>}
                                    </div>
                                </div>

                                <button className="md:w-52 md:bg-black md:text-white md:py-4 md:rounded-full" onClick={handleLogin}>
                                    {
                                        isLoading ?
                                            <span>LOADING ...</span>
                                            :
                                            <span>LOGIN</span>
                                    }
                                </button>

                                <div className=" md:flex md:flex-col gap-3">
                                    <span className=" md:text-xl md:font-semibold">Dont have an account yet ?</span>
                                    <Link href={{ pathname: '/register' }}>
                                        <button className="md:hover:underline">Create an account</button>
                                    </Link>
                                </div>

                            </div>
                        </Modal>
                    </motion.div>
                }

            </AnimatePresence>
        </>
    );
};