import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import('./login-model.component'));

//import component
import MobileMenu from '../components/header/mobile-menu.component';
import DekstopMenu from "./header/dekstop-menu.component";

export default function Header() {
    const [modalLogin, setModalLogin] = useState(false);
    const [isBurgerMenu, setIsBurgetMenu] = useState(false);
    const [height, setHeight] = useState(0);

    const ref = useRef();

    const handleToggleModalLogin = () => {
        setModalLogin(!modalLogin);
    };

    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, [height, ref])

    //mobile function
    const handleToggleBurgerMenu = () => {
        setIsBurgetMenu(!isBurgerMenu);
    };

    return (
        <div ref={ref} className=" md:w-full md:sticky md:top-0 sticky top-0 z-10 bg-white">

            {modalLogin && <LoginModal isOpen={modalLogin} closeAction={handleToggleModalLogin} />}

            {/* logo */}
            <div className="text-center md:py-5 py-5 px-5 flex justify-between items-center border-b border-gray-300">
                <Link href={{ pathname: '/' }}>
                    <div className="md:w-36 md:m-auto w-24 h-10 flex items-center md:cursor-pointer">
                        <img src="/wordmark-logo.png" />
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

            <div className="md:w-full border-b border-gray-300">

                <DekstopMenu
                    height={height}
                    toggleLogin={handleToggleModalLogin}
                />
                {
                    isBurgerMenu && <MobileMenu closeAction={handleToggleBurgerMenu} />
                }
            </div>

            {/* end menu navbar */}

        </div>
    );
}