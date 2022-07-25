import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "./login-model.component";

export default function Header() {
    const [modalLogin, setModalLogin] = useState(false);

    const handleToggleModalLogin = () => {
        setModalLogin(!modalLogin);
    };

    return (
        <div className=" md:w-full">

            {modalLogin && <LoginModal closeAction={handleToggleModalLogin} />}

            {/* logo */}
            <div className="text-center md:py-1 border-b border-gray-300">
                <Image
                    width={130}
                    height={50}
                    src={'/wordmark-logo.png'}
                />
            </div>
            {/* end logo section */}


            {/* menu navbar */}
            <div className="md:w-full border-b border-gray-300">

                <div className=" md:px-10 md:py-6 md:flex md:justify-between">

                    {/* menu */}
                    <ul className=" flex md:justify-between md:gap-5">
                        <li>
                            <Link href={{ pathname: '/shop' }}>SHOP</Link>
                        </li>
                        <li>REWARD</li>
                        <li>NEWS</li>
                        <li>STORY</li>
                        <li>RANK</li>
                        <li>GALLERY</li>
                    </ul>
                    {/* end menu */}

                    {/* account */}
                    <div className="md:flex md:flex-row-reverse md:gap-5 ">
                        <div className=" space-x-2">
                            <span>ARE YOU A AGENT</span>
                            <button className="font-bold md:hover:underline" onClick={handleToggleModalLogin}>REGISTER / LOGIN</button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    {/* end account */}

                </div>
            </div>

            {/* end menu navbar */}

        </div>
    );
}