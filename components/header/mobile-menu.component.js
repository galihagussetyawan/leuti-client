import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import AuthContext from "../../lib/context/auth.context";
import CartContext from "../../lib/context/cart.context";
import { useRouter } from "next/router";
import UserContext from "../../lib/context/user.context";
import dynamic from "next/dynamic";

const NewsContentMobileMenu = dynamic(() => import('./mobile-menu-content/news.content.mobile.menu'));
const ShopContentMobileMenu = dynamic(() => import('./mobile-menu-content/shop.content.mobile.menu'));

export default function MobileMenu({ closeAction, isOpen }) {

    const router = useRouter();

    const { isLogin, user } = useContext(AuthContext);
    const { carts } = useContext(CartContext);
    const { point } = useContext(UserContext);

    const [tab, setTab] = useState();

    const handleClickTab = (tab) => {

        return () => {
            setTab(tab);
        }
    }

    const handleToggleClose = () => {
        setTab();
        closeAction();
    };

    const handleBackMenu = () => {
        setTab();
    }

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    const tabContent = () => {

        if (tab === 'shop-menu') {
            return <ShopContentMobileMenu />
        }

        if (tab === 'news-menu') {
            return <NewsContentMobileMenu />
        }

        if (tab === 'story-menu') {
            return (
                <div className="px-5" onClick={handleNavigate('/story')}>story leuti</div>
            );
        }
    }

    return (
        <>
            <AnimatePresence>

                {
                    isOpen &&
                    <div className="w-screen h-screen md:hidden flex justify-end fixed top-0">
                        <motion.div className="w-full h-full absolute bg-black bg-opacity-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                        </motion.div>

                        <motion.div className="h-full w-11/12 flex flex-col py-2 bg-white"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                ease: 'linear',
                                duration: 0.15,
                            }}
                        >

                            {/* close action button and back menu */}
                            <div className={`${tab ? 'flex justify-between' : 'text-end'}`}>
                                {tab &&
                                    <button className="p-5 text-gray-500" onClick={handleBackMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                }
                                <button className="p-5 text-gray-500" onClick={handleToggleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {/* end close action button and back menu */}

                            {/* account */}
                            <div className="flex border-y py-5 border-gray-200">

                                <div className="w-full flex justify-between items-center px-5">

                                    {/* point */}
                                    {
                                        isLogin &&
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>{point}</span>
                                        </div>
                                    }
                                    {/* end of point */}
                                    {/* user cart */}
                                    <div className="flex justify-end gap-5">
                                        {
                                            isLogin &&
                                            <button className="relative" onClick={handleNavigate('/cart')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                {carts?.length > 0 && <span className="w-3 h-3 absolute -top-1 outline outline-1 outline-white rounded-full bg-red-500"></span>}
                                            </button>
                                        }
                                        <button className="flex items-center">

                                            {
                                                isLogin ?
                                                    <div className="flex">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <a onClick={handleNavigate('/user')}>{user?.username}</a>
                                                    </div>
                                                    :
                                                    <a onClick={handleNavigate('/login')}>
                                                        <span className=" font-semibold">LOGIN</span>
                                                    </a>
                                            }
                                        </button>
                                    </div>
                                    {/* end of user cart */}
                                </div>
                            </div>
                            {/* end account */}

                            {/* menu */}
                            <div className=" mt-5 overflow-y-scroll">
                                {
                                    !tab ?
                                        <motion.ul className="flex flex-col px-5 justify-between"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <li className="flex justify-between py-3" onClick={handleClickTab('shop-menu')}>
                                                <span>PRODUCTS</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3">
                                                <span id="reward-menu">REWARD</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3" onClick={handleClickTab('news-menu')}>
                                                <span>NEWS</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3" onClick={handleClickTab('story-menu')}>
                                                <span>STORY</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3">
                                                <span>PROMO</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3">
                                                <span>RANK</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="flex justify-between py-3">
                                                <span>SALES</span>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </span>
                                            </li>
                                        </motion.ul>
                                        :
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {tabContent()}
                                        </motion.div>
                                }
                            </div>
                            {/* end menu */}

                        </motion.div>
                    </div>
                }

            </AnimatePresence>
        </>
    );
}