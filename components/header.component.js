import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

//import component
import DekstopMenu from "./header/dekstop-menu.component";
const MobileMenu = dynamic(() => import('../components/header/mobile-menu.component'));
const LoginModal = dynamic(() => import('./login-model.component'));

export default function Header() {
    const [modalLogin, setModalLogin] = useState(false);
    const [isBurgerMenu, setIsBurgetMenu] = useState(false);
    const [height, setHeight] = useState(129);

    const ref = useRef();

    const handleToggleModalLogin = () => {
        setModalLogin(!modalLogin);
    };

    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, [height])

    //mobile function
    const handleToggleBurgerMenu = () => {
        setIsBurgetMenu(!isBurgerMenu);
    };

    return (
        <div ref={ref} className="md:w-full md:sticky md:top-0 sticky top-0 z-10 bg-white">

            <LoginModal isOpen={modalLogin} closeAction={handleToggleModalLogin} />

            {/* logo */}
            <div className="text-center md:py-5 py-5 mx-5 md:m-0 flex justify-between items-center border-b border-gray-300">
                <Link href={{ pathname: '/' }}>
                    <div className="md:w-36 md:m-auto w-24 h-11 flex items-center relative md:cursor-pointer">
                        <Image
                            priority
                            quality={100}
                            src={'/wordmark-logo.png'}
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                </Link>

                {/* burger icon menu */}
                <button className="flex md:hidden" onClick={handleToggleBurgerMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
                {/* end burger icon menu */}

            </div>
            {/* end logo section */}


            {/* menu navbar */}
            <DekstopMenu
                height={height}
                toggleLogin={handleToggleModalLogin}
            />

            <MobileMenu
                isOpen={isBurgerMenu}
                closeAction={handleToggleBurgerMenu}
            />
            {/* end menu navbar */}

            <div className="w-full h-4 md:hidden flex bg-white"></div>
        </div>
    );
}