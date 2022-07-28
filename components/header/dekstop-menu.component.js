import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Dropdown from '../dropdown.component';

const Dropdown = dynamic(() => import('../dropdown.component'));

export default function DekstopMenu({ toggleLogin, height }) {

    const [stateMenu, setStateMenu] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseOver = (event) => {
        event.preventDefault();

        setStateMenu({ [event.currentTarget.id]: true })
        setIsOpen(true);
    };

    const handleMouseLeave = (event) => {
        setStateMenu({ [event.currentTarget.id]: false })
        setIsOpen(false);
    };

    const handleToggleModalLogin = () => {
        return toggleLogin();
    };

    const handleToggleDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="md:px-10 hidden md:py-6 md:flex md:justify-between md:border-b md:border-gray-300">

            {/* menu */}
            <ul className="md:flex md:justify-between md:gap-5">
                <li className="md:hover:font-semibold">
                    <Link href={{ pathname: '/shop' }}>SHOP</Link>
                </li>
                <li id="reward-menu" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <span className="md:cursor-pointer md:py-7 md:hover:font-semibold">REWARD</span>
                    {
                        isOpen && stateMenu['reward-menu'] &&
                        <Dropdown
                            closeAction={handleToggleDropdown}
                            top={height}
                        >
                            Reward Coming Soon
                        </Dropdown>

                    }
                </li>
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
    );
}