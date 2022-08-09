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

    const [error, setError] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }

    const handleChangePassword = event => {
        setPassword(event.target.value);
    }

    const handleSignin = () => {
        setError();

        AuthService.signin(username, password)
            .then(response => {

                if (response.status === 200) {
                    router.push({
                        pathname: '/',
                        refresh: true,
                    });
                }

            })
            .catch(error => setError(error.response.data.error_message));
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

                <div className="md:w-3/5 w-full flex flex-col justify-center md:px-36 px-5 md:gap-10 mt-5 gap-14 md:justify-center">
                    <h1 className="text-4xl md:text-3xl">Sign-In</h1>

                    <div className="flex flex-col md:gap-5 gap-5">

                        <div className="md:w-3/5 flex flex-col">
                            <span>Username atau Email</span>
                            <input className="md:h-12 h-12 outline-none px-3 border border-gray-500" onChange={handleChangeUsername} />
                        </div>
                        <div className="md:w-3/5 flex flex-col">
                            <span>Password</span>
                            <input type={'password'} className="md:h-12 h-12 outline-none px-3 border border-gray-500" onChange={handleChangePassword} />
                        </div>

                        {/* error exception */}
                        <div className='md:w-3/5 h-10'>
                            {error && <span className='w-full h-full flex items-center px-3 text-red-700 bg-red-200'>{error}</span>}
                        </div>
                        {/* end of error exception */}
                    </div>

                    <div>
                        <button className="md:h-12 h-12 w-52 rounded-full text-white bg-black" onClick={handleSignin}>LOGIN</button>
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