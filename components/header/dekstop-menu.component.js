import { useContext, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";

import AuthService from "../../services/auth.service";

const Dropdown = dynamic(() => import('../dropdown.component'));
import DropdownLite from '../dropdown-lite.component';

import AuthContext from "../../lib/context/auth.context";
import CartContext from "../../lib/context/cart.context";

import LocalCurrency from "../../lib/helpers/local-currency.help";

const NewsContentDekstopMenu = dynamic(() => import('./dekstop-menu-content/news.content.dekstop.menu'));

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function DekstopMenu({ toggleLogin, height }) {

    const router = useRouter();

    const { isLogin, user, isAdmin } = useContext(AuthContext);
    const { carts } = useContext(CartContext);

    const [stateMenu, setStateMenu] = useState({});

    const handleMouseOver = event => {

        event.preventDefault();

        setStateMenu({ [event.currentTarget.id]: true })
    }

    const handleMouseLeave = event => {
        event.preventDefault();

        setStateMenu({ [event.currentTarget.id]: false })
    }

    const handleCloseOutsideDropdown = () => {
        setStateMenu({});
    }

    const handleToggleModalLogin = () => {
        return toggleLogin();
    };

    const handleLogout = async () => {

        AuthService.logout()
            .then(() => {

                handleCloseOutsideDropdown();
                router.replace(router.asPath)
                    .then(() => router.replace(router.asPath));
            })
    }

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    // <================================================================================>
    //menu component content
    const newsContentMenu = () => {
        return <NewsContentDekstopMenu />
    }

    const productsContentMenu = () => {

        return (
            <div></div>
        );
    }

    return (
        <div className="md:h-16 md:px-10 hidden md:flex md:justify-between md:items-center md:border-b md:border-gray-300">

            {(stateMenu['user-menu'] || stateMenu['cart-menu']) && <div className="md:w-full md:h-screen md:absolute md:top-[121px] md:left-0 md:bg-opacity-40 md:bg-black"></div>}

            {/* menu */}
            <ul className="md:flex md:justify-between md:space-x-5">
                <li className="md:hover:font-semibold">
                    <Link href={{ pathname: '/shop' }} shallow={false} className="md:hover:cursor-pointer">PRODUCTS</Link>
                </li>

                {/* reward menu */}
                <li id="reward-menu" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <span className={`${stateMenu['reward-menu'] && 'md:font-bold'} md:cursor-pointer md:py-7 md:hover:font-semibold`}>REWARD</span>
                    <Dropdown
                        stateMenu={stateMenu['reward-menu']}
                        actionClose={handleCloseOutsideDropdown}
                        top={height}
                    >
                        Reward Coming Soon
                    </Dropdown>
                </li>
                {/* end of reward menu */}

                <li id="news-menu" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <span className={`${stateMenu['news-menu'] && 'md:font-bold'} md:cursor-pointer md:py-7 md:hover:font-semibold`}>NEWS</span>
                    <Dropdown
                        stateMenu={stateMenu['news-menu']}
                        actionClose={handleCloseOutsideDropdown}
                        top={height}
                    >
                        {newsContentMenu()}
                    </Dropdown>
                </li>
                <li id="story-menu" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                    <span className={`${stateMenu['story-menu'] && 'md:font-bold'} md:cursor-pointer md:py-7 md:hover:font-semibold`}>STORY</span>
                    <Dropdown
                        stateMenu={stateMenu['story-menu']}
                        actionClose={handleCloseOutsideDropdown}
                        top={height}
                    >
                        <Link href={{ pathname: '/story' }} shallow={false} className="md:hover:cursor-pointer">Stories Leuti Perfect Sublimate Serum</Link>
                    </Dropdown>
                </li>
                <li>PROMO</li>
                <li>RANK</li>
                <li>SALES</li>
            </ul>
            {/* end menu */}

            {/* account */}
            <div className="md:h-full md:flex md:flex-row-reverse md:gap-10 ">
                {
                    isLogin ?
                        <div id="user-menu" className="md:relative" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} >
                            <div className="md:h-full md:flex md:items-center md:gap-1 md:cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <Link href={{ pathname: '/user' }} shallow={false}>{user?.username}</Link>
                            </div>
                            {
                                stateMenu['user-menu'] &&
                                <DropdownLite>
                                    <button onClick={handleLogout}>Logout</button>
                                </DropdownLite>
                            }
                        </div>
                        :
                        <div className="md:flex md:items-center">
                            <div className="md:space-x-2">
                                <span>ARE YOU AN AGENT</span>
                                <button className="font-bold md:hover:underline" onClick={handleToggleModalLogin}>REGISTER / LOGIN</button>
                            </div>
                        </div>
                }

                {/* cart menu */}
                <div id="cart-menu" className="md:relative" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} >
                    <div className="md:h-full md:flex md:items-center md:gap-1 md:cursor-pointer">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {carts?.length > 0 && <span className="md:w-3 md:h-3 md:absolute md:bottom-9 md:left-4 md:outline md:outline-1 md:outline-white md:rounded-full bg-red-500"></span>}
                        </button>
                    </div>
                    {
                        stateMenu['cart-menu'] &&
                        <DropdownLite>
                            {
                                carts?.length > 0 ?
                                    <div className="md:w-[400px]">
                                        <div className="md:flex md:justify-between md:border-b">
                                            <span className="md:font-semibold md:text-lg">Cart ({carts?.length})</span>
                                            <button onClick={handleNavigate('/cart')}>View All</button>
                                        </div>
                                        <ul className="md:mt-5 md:space-y-5">
                                            {
                                                carts?.map((data, index) => {
                                                    return (
                                                        <Link key={index} href={{ pathname: '/cart' }}>
                                                            <li className="md:flex md:space-x-3 md:hover:cursor-pointer">
                                                                <div className="md:w-14 md:h-14 md:relative md:bg-gray-200">
                                                                    <Image
                                                                        loading='lazy'
                                                                        loader={imageLoader}
                                                                        src={data?.product?.images[0]?.name}
                                                                        objectPosition='center'
                                                                        objectFit='cover'
                                                                        layout={'fill'}
                                                                    />
                                                                </div>
                                                                <div className="md:w-9/12 md:flex md:flex-col">
                                                                    <span className="md:font-semibold md:hover:text-gray-500">{data?.product?.name}</span>
                                                                    <span className="md:text-sm md:text-gray-500">{data?.quantity} Item</span>
                                                                </div>
                                                                <div className="md:w-3/12 md:flex md:justify-end md:items-center">{LocalCurrency(data?.amount)}</div>
                                                            </li>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    :
                                    <div>kosong</div>
                            }
                        </DropdownLite>
                    }
                </div>
                {/* end of cart menu */}

                {
                    isAdmin &&
                    <div className="md:h-full md:flex md:items-center">
                        <Link href={{ pathname: '/dashboard' }} shallow={false}>
                            <a className=" md:space-x-1">
                                <span>GO TO</span>
                                <span className="md:font-semibold md:hover:underline">DASHBOARD</span>
                            </a>
                        </Link>
                    </div>
                }
            </div>
            {/* end account */}

        </div >
    );
}