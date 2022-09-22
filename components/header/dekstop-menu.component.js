import { useContext, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";

import AuthService from "../../services/auth.service";

const Dropdown = dynamic(() => import('../dropdown.component'));
const DropdownLite = dynamic(() => import('../dropdown-lite.component'));

import AuthContext from "../../lib/context/auth.context";
import CartContext from "../../lib/context/cart.context";
import UserContext from "../../lib/context/user.context";

import LocalCurrency from "../../lib/helpers/local-currency.help";

const NewsContentDekstopMenu = dynamic(() => import('./dekstop-menu-content/news.content.dekstop.menu'));

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function DekstopMenu({ toggleLogin, height }) {

    const router = useRouter();

    const { isLogin, user, isAdmin } = useContext(AuthContext);
    const { carts } = useContext(CartContext);
    const { point, royalties } = useContext(UserContext);

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
                                <a onClick={handleNavigate({ pathname: '/user' })}>{user?.username}</a>
                            </div>
                            {
                                stateMenu['user-menu'] &&
                                <DropdownLite>
                                    <div>

                                        <div className="md:flex md:justify-between md:items-center md:px-5 md:py-2 md:border md:border-gray-50 md:shadow-md md:hover:cursor-pointer" onClick={handleNavigate({ pathname: '/user' })}>
                                            <div className="md:flex md:flex-col">
                                                <span className="text-xl font-semibold">{user?.username}</span>
                                                <span className=" text-gray-400">{user?.roles[0]}</span>
                                            </div>
                                            <span className=" text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </span>
                                        </div>

                                        <div className=" md:mt-10 md:divide-y md:border-y">

                                            <div className="md:flex md:justify-between md:py-3">
                                                <div className="md:flex md:items-center md:space-x-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </span>
                                                    <span>Point</span>
                                                </div>
                                                <span className=" md:font-semibold">{point?.point}</span>
                                            </div>

                                            <div className="md:flex md:justify-between md:items-center md:py-3">
                                                <div className="md:flex md:items-center md:space-x-2">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-green-500" viewBox="0 0 16 16">
                                                            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                                                        </svg>
                                                    </span>
                                                    <span>Royalty</span>
                                                </div>
                                                <div className=" md:font-semibold">{LocalCurrency(royalties?.total)}</div>
                                            </div>

                                            <div className="md:flex md:items-center md:space-x-2 md:py-3 md:hover:cursor-pointer md:hover:text-gray-500" onClick={handleLogout}>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
                                                        <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                                        <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                                                    </svg>
                                                </span>
                                                <span>Logout</span>
                                            </div>

                                        </div>

                                    </div>
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
                                    <div className="md:flex md:flex-col md:justify-center md:items-center md:space-y-5">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="md:w-24 md:h-24" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                            </svg>
                                        </span>
                                        <p>Your Cart Is Currently Empty!</p>
                                        <button className="md:w-full md:uppercase md:py-5 md:rounded-full md:text-white md:bg-black" onClick={handleNavigate('/shop')}>shopping</button>
                                    </div>
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