import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';

import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));
const Toast = dynamic(() => import('../../components/commons/toast.component'));

import CookiesService from '../../services/cookies.service';
import CartService from '../../services/cart.service';
import OrderService from '../../services/order.service';
import PointService from '../../services/point.service';

import LocalCurrency from '../../lib/helpers/local-currency.help';

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function Cart({ carts, totalPrice }) {

    const router = useRouter();

    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    })

    const handleRemoveCart = (id) => {

        return () => {

            CartService.deleteCartById(id)
                .then(res => {

                    setNotification({
                        isOpen: true,
                        status: 'success',
                        message: res?.data?.message,
                    })

                    router.replace(router.asPath);
                })
        }
    }

    const handleCheckout = () => {

        OrderService.createOrder()
            .then(res => {

                router.push({
                    pathname: '/order/[orderid]',
                    query: {
                        orderid: res?.data?.data?.id,
                    }
                })

            })
            .catch(err => console.log(err.response));
    }

    const handleIncreaseQuantity = (id, quantity) => {

        return () => {

            CartService.updateCartById(id, ++quantity)
                .then(res => {

                    setNotification({
                        isOpen: true,
                        status: 'success',
                        message: res?.data?.message,
                    })

                    router.replace(router.asPath)
                        .then(() => router.replace(router.asPath));
                })
                .catch(err => {

                    setNotification({
                        isOpen: true,
                        status: 'error',
                        message: err?.response?.error_message,
                    })

                })
        }
    }

    const handleDecreaseQuantity = (id, quantity) => {

        return () => {

            CartService.updateCartById(id, --quantity)
                .then(res => {

                    setNotification({
                        isOpen: true,
                        status: 'success',
                        message: res?.data?.message,
                    })

                    router.replace(router.asPath)
                        .then(() => router.replace(router.asPath));
                })
                .catch(err => {

                    setNotification({
                        isOpen: true,
                        status: 'error',
                        message: err?.response?.data?.error_message,
                    })

                })
        }
    }

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    //navigate
    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    return (
        <>
            <Head>
                <title>Cart | Leuti</title>
            </Head>
            <Header />
            <main className='md:w-4/5 flex flex-col m-auto md:mt-20'>

                <div className='flex md:flex-row flex-col px-5 md:p-0 md:space-x-10'>
                    {/* left section/cart list */}
                    <div className='md:w-9/12 w-full'>

                        <div className='w-full hidden md:flex font-semibold text-gray-400 justify-between uppercase'>
                            <span className='w-3/5 px-6 py-3'>product</span>
                            <span className='w-1/5 px-6 py-3'>price</span>
                            <span className='w-1/5 px-6 py-3'>quantity</span>
                            <span className='w-1/5 px-6 py-3'>subtotal</span>
                        </div>

                        {
                            carts?.map((data, index) => {
                                return (
                                    <div key={index} className='py-5 border-b border-gray-300'>
                                        <div className=' w-full flex justify-between'>
                                            <div className='md:w-3/5 w-full flex items-center md:px-6 py-3 space-x-3'>
                                                <div className=' min-w-[80px] min-h-[100px] relative bg-gray-200'>
                                                    <Image
                                                        loader={imageLoader}
                                                        src={data?.product?.images[0]?.name}
                                                        objectFit={'cover'}
                                                        objectPosition={'center'}
                                                        layout={'fill'}
                                                    />
                                                </div>
                                                <div className=' flex flex-col'>
                                                    <span className=' md:text-xl'>{data?.product?.name}</span>
                                                    {/* mobile version */}
                                                    <span className='md:hidden'>{LocalCurrency(data?.product?.price)}</span>
                                                    {/* end of mobile version */}
                                                </div>
                                            </div>
                                            <span className='w-1/5 hidden md:flex items-center px-6 py-3'>{LocalCurrency(data?.product?.price)}</span>
                                            <span className='w-1/5 hidden md:flex items-center px-6 py-3'>
                                                <div className='flex border rounded-full overflow-hidden border-gray-500'>
                                                    <button className='p-5' onClick={handleDecreaseQuantity(data?.id, data?.quantity)}>-</button>
                                                    <input className='w-full outline-none text-center' value={data?.quantity} onChange={() => data?.quantity} />
                                                    <button className='p-5' onClick={handleIncreaseQuantity(data?.id, data?.quantity)}>+</button>
                                                </div>
                                            </span>
                                            <span className='w-1/5 hidden md:flex items-center px-6 py-3'>{LocalCurrency(data?.amount)}</span>
                                        </div>

                                        {/* remove item cart */}
                                        <div className='flex items-center text-gray-400 md:hover:text-gray-700 justify-end'>

                                            <button className='md:flex hidden' onClick={handleRemoveCart(data?.id)}>
                                                <span>Remove Item</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>

                                            {/* mobile version */}
                                            <div className='md:hidden flex space-x-7'>
                                                <button onClick={handleRemoveCart(data?.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                                <div className='flex w-36 border rounded-full overflow-hidden text-black border-gray-400'>
                                                    <button className='p-5' onClick={handleDecreaseQuantity(data?.id, data?.quantity)}>-</button>
                                                    <input className='w-full outline-none text-center' value={data?.quantity} onChange={() => data?.quantity} />
                                                    <button className='p-5' onClick={handleIncreaseQuantity(data?.id, data?.quantity)}>+</button>
                                                </div>
                                            </div>
                                            {/* end of mobile version */}
                                        </div>
                                        {/* end of remove item cart */}
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* end of left section/cart list */}

                    {/* section right/price total */}
                    <div className='md:w-1/4 w-full border border-gray-300 p-5 divide-y mt-10 md:m-0'>
                        <div className='py-5 border-gray-300'>
                            <span className='md:text-lg font-semibold uppercase'>Carts Total</span>
                        </div>
                        <div className=' py-5 border-gray-300'>
                            <div className='flex justify-between'>
                                <span className=' font-semibold'>Subtotal ({carts?.length} item)</span>
                                <span>{LocalCurrency(totalPrice)}</span>
                            </div>
                        </div>

                        {/* discount section */}
                        {
                            (carts?.length > 0 && carts?.filter(data => data?.discount)?.length > 0) &&
                            <div className='grid grid-cols-1 gap-1 py-5 border-gray-300'>
                                <span className='font-semibold'>Discount</span>
                                <div className=' space-y-5'>
                                    {
                                        carts?.map((cart, index) => {
                                            return (
                                                cart?.discount &&
                                                <div key={index} className='grid grid-cols-1'>
                                                    <div className='grid grid-cols-2'>
                                                        <span>{cart?.product?.name}</span>
                                                    </div>
                                                    <div className='ml-5'>
                                                        <div className='text-gray-500 space-x-3'>
                                                            <span>Item Bonus:</span>
                                                            <span>+{cart?.discount?.item} item</span>
                                                        </div>
                                                        <div className='w-full flex text-gray-500 space-x-3'>
                                                            <span>Add Ons:</span>
                                                            <span>{cart?.discount?.addOns ? cart?.discount?.addOns : '-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                        {/* end of discount section */}

                        <div className='flex justify-between py-5'>
                            <span className='font-semibold'>Total</span>
                            <span className='font-semibold text-2xl'>{LocalCurrency(totalPrice)}</span>
                        </div>
                        <div className='py-10'>
                            {
                                carts?.length === 0 ?
                                    <button className='w-full py-5 rounded-full text-white bg-black' onClick={handleNavigate('/shop')}>SHOPING</button>
                                    :
                                    <button className='w-full py-5 rounded-full text-white bg-black' onClick={handleCheckout}>CHECKOUT</button>
                            }
                        </div>
                    </div>
                    {/* end of section right/price total */}
                </div>

            </main >
            {notification?.isOpen && <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />}

            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res } = context;
    let isLogin = false;
    let user = {};
    let carts = [];
    let totalPrice = 0;
    let point = 0;

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data?.point;
                isLogin = true;
            }
        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }
    }

    // handle tota price on cart
    if (carts?.length > 0) {
        totalPrice = carts?.map(data => data?.amount).reduce((prev, next) => prev + next);
    }

    return {
        props: {
            isLogin,
            user,
            carts,
            totalPrice,
            point,
        }
    }

}