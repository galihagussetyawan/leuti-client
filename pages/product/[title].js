import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import CookiesService from "../../services/cookies.service";
import ProductService from "../../services/product.service";
import CartService from "../../services/cart.service";
import PointService from "../../services/point.service";
import RoyaltyService from "../../services/royalty.service";

//import components
import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));
const Collapse = dynamic(() => import('../../components/collapse.component'));
const Toast = dynamic(() => import('../../components/commons/toast.component'));

import LocalCurrency from "../../lib/helpers/local-currency.help";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function Product({ isLogin, productData, inCart }) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    })

    const [imagePreview, setImagePreview] = useState(productData?.images[0]?.name);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(productData?.stock);

    const headerTitle = () => {
        return productData?.name + ' | Leuti Asia';
    }

    const handleMouseOverImage = event => {
        event.preventDefault();

        setImagePreview(productData?.images[event.currentTarget.id]?.name)
    };

    const handleMouseLeaveImage = event => {

        event.preventDefault();

        setImagePreview(productData?.images[0]?.name);
    }

    //product function
    const handleOnChangeQuantity = event => {

        setQuantity(event?.target?.value);
    }

    const handleInceraseQuantity = () => {

        if (quantity < stock) {
            setQuantity(++quantity)
        }
    }

    const handleDecreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(--quantity)
        }
    }

    const handleAddToCart = () => {

        setIsLoading(true);

        if (!isLogin) {

            router.push({
                pathname: '/login'
            })
            return;
        }

        if (inCart) {

            router.push({
                pathname: '/cart',
            })

            return;
        }

        CartService.createCart(productData?.id, quantity)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        router.replace(router.asPath);

                        setNotification({
                            isOpen: true,
                            status: 'success',
                            message: res?.data?.message,
                        })

                    })

            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.error_message,
                })

            })
            .finally(() => setIsLoading(false));
    }

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    return (
        <>
            <Head>
                <title>{headerTitle()}</title>
                <meta name="description" content={productData?.description} />
                <meta name="keyword" content="produk, skincare lokal, skincare terbaik, skincare indonesia, leuti 2022, serum, kecantikan, skincare bagus" />
            </Head>

            <Header />
            <main className="md:w-4/5 m-auto flex md:flex-row flex-col gap-5 md:py-10">

                <div className="md:w-full flex md:flex-row flex-col-reverse gap-5">

                    {/* thumb image */}
                    <div className="md:w-28 flex md:p-0 px-5 md:flex-col md:gap-5 gap-3">
                        {
                            productData?.images?.map((data, index) => {
                                return (
                                    <div key={index} id={index} className="md:w-full md:h-28 w-16 h-16 relative" onMouseOver={handleMouseOverImage} onMouseLeave={handleMouseLeaveImage}>
                                        <Image
                                            alt={productData?.description}
                                            loader={imageLoader}
                                            src={data?.name}
                                            loading='lazy'
                                            layout='fill'
                                            objectPosition='center'
                                            objectFit='cover'
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                    {/* end of thumb image */}

                    {/* preview image product */}
                    <div className="w-full h-full">
                        <div className="md:w-full md:h-[700px] w-full h-96 relative bg-gray-100">
                            <Image
                                alt={productData?.description}
                                priority
                                quality={50}
                                loader={imageLoader}
                                src={imagePreview}
                                layout='fill'
                                objectPosition='center'
                                objectFit='cover'
                            />
                        </div>
                    </div>
                    {/* end of preview image product */}
                </div>

                {/* description section */}
                <div className="md:w-full flex flex-col md:gap-14 md:m-0 mx-5 gap-10">
                    <div className="flex flex-col gap-5">
                        <div className="md:flex md:justify-between md:items-center">
                            <h1 className="md:text-3xl text-2xl font-semibold">Leuti Perfect Sublimate Serum</h1>
                            {isLogin && <span className="md:text-xl text-xl md:font-semibold">{LocalCurrency(productData?.price)}</span>}
                        </div>
                        {/* <p>deksripsi singkat produk</p> */}
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHAT IS</span>
                        <p>{productData?.description}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHY WE LOVE IT</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    {/* add to cart */}
                    <div className="hidden md:flex md:flex-col md:gap-2 md:border-t md:py-20 md:border-gray-300">
                        <span className="md:font-semibold">Stock {stock}</span>
                        <div className="md:w-full md:flex md:space-x-5">
                            <div className="md:w-1/4 md:flex md:border md:rounded-full md:overflow-hidden md:border-black">
                                <button className="md:w-2/6" onClick={handleDecreaseQuantity}>-</button>
                                <input className="md:w-20 md:h-full md:text-center md:outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                                <button className="md:w-2/6" onClick={handleInceraseQuantity}>+</button>
                            </div>
                            <button className="md:w-2/5 md:py-5 md:rounded-full md:text-white md:bg-black" onClick={handleAddToCart}>
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
                                        <span>{inCart ? "VIEW IN CART" : "ADD TO CART"}</span>
                                }
                            </button>
                        </div>
                    </div>
                    {/* end of add to cart */}

                    <div>
                        <Collapse
                            title={'HOW TO APPLY'}
                        >
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                        </Collapse>
                    </div>

                    <div>
                        <Collapse
                            title={'INGREDIENTS'}
                        >
                            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                        </Collapse>
                    </div>

                </div>
                {/* end of description section */}

            </main>
            <Footer />

            {/* floating section */}
            <div className="w-full md:hidden sticky left-0 bottom-0 z-0 flex flex-col px-5 py-2 gap-1 bg-white">
                <span className="font-semibold">Stock {stock}</span>
                <div className="flex gap-3">
                    <div className="w-2/5 h-[54px] overflow-hidden flex justify-between border rounded-full border-black">
                        <button className="w-2/6 h-full" onClick={handleDecreaseQuantity}>-</button>
                        <input className="w-2/5 text-center outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                        <button className="w-2/6 h-full" onClick={handleInceraseQuantity}>+</button>
                    </div>
                    <button className="w-3/5 bg-black rounded-full text-white" disabled={isLoading} onClick={handleAddToCart}>
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
                                <span>{inCart ? "VIEW IN CART" : "ADD TO CART"}</span>
                        }
                    </button>
                </div>
            </div>
            {/* end of floating section */}

            {notification?.isOpen && <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />}
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res, query } = context;

    let isLogin = false;
    let user = {};
    let productData = null;
    let carts = [];
    let point = null;
    let royalties = null;

    try {

        productData = await (await ProductService.getProductById(query.id))?.data?.data;
        const cookies = await CookiesService.getCookies('user', req, res);

        if (productData?.name?.toLowerCase() !== query?.title?.toLowerCase()?.split('-')?.join(' ')) {

            return {
                notFound: true,
            }
        }

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                isLogin = true;
            }
        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }
    }

    if (!productData) {
        productData = null;

        return {
            notFound: true
        }
    }

    const inCart = carts.some(data => data?.product?.id === productData?.id);

    return {
        props: {
            isLogin,
            user,
            productData,
            carts,
            inCart,
            point,
            royalties,
        }
    }
}