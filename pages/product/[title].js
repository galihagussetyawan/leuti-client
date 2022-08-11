import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

import CookiesService from "../../services/cookies.service";

//import components
import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));
const Collapse = dynamic(() => import('../../components/collapse.component'));

const imageProduct = [
    '/images4.jpg',
    '/images1.jpg',
    '/images2.jpg',
];

export default function Product({ title, isLogin }) {

    const [imagePreview, setImagePreview] = useState(imageProduct[0]);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(264);

    const handleMouseOverImage = event => {
        event.preventDefault();

        setImagePreview(imageProduct[event.currentTarget.id])
    };

    const handleMouseLeaveImage = event => {

        event.preventDefault();

        setImagePreview(imageProduct[0]);
    }

    //product function
    const handleOnChangeQuantity = event => {

        setQuantity(event.target.value);
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

    return (
        <>
            <Head></Head>
            <Header />
            <main className="md:w-4/5 m-auto flex md:flex-row flex-col gap-5 md:py-10">

                <div className="md:w-full flex md:flex-row flex-col-reverse gap-5">

                    {/* thumb image */}
                    <div className="md:w-28 flex md:p-0 px-5 md:flex-col md:gap-5 gap-3">
                        {
                            imageProduct.map((data, index) => {
                                return (
                                    <div key={index} id={index} className="md:w-full md:h-28 w-10 h-10 relative" onMouseOver={handleMouseOverImage} onMouseLeave={handleMouseLeaveImage}>
                                        <Image
                                            src={data}
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
                            {isLogin && <span className="md:text-xl text-xl md:font-semibold">Rp30000</span>}
                        </div>
                        <p>deksripsi singkat produk</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHAT IS</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHY WE LOVE IT</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    {/* add to cart */}
                    <div className="hidden md:flex md:flex-col md:gap-2 md:border-t md:py-20 md:border-gray-300">
                        <span className="md:font-semibold">Stock 300</span>
                        <div className="md:w-full md:flex md:space-x-5">
                            <div className="md:w-1/4 md:flex md:border md:rounded-full md:overflow-hidden md:border-black">
                                <button className="md:w-2/6" onClick={handleDecreaseQuantity}>-</button>
                                <input className="md:w-20 md:h-full md:text-center md:outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                                <button className="md:w-2/6" onClick={handleInceraseQuantity}>+</button>
                            </div>
                            <button className="md:w-2/5 md:py-5 md:rounded-full md:text-white md:bg-black">ADD TO CART</button>
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
            <div className="w-full md:hidden sticky left-0 bottom-0 z-10 flex flex-col px-5 py-2 gap-1 bg-white">
                <span className="font-semibold">Stock {stock}</span>
                <div className="flex gap-3">
                    <div className="w-2/5 h-[54px] overflow-hidden flex justify-between border rounded-full border-black">
                        <button className="w-2/6 h-full" onClick={handleDecreaseQuantity}>-</button>
                        <input className="w-2/5 text-center outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                        <button className="w-2/6 h-full" onClick={handleInceraseQuantity}>+</button>
                    </div>
                    <button className="w-3/5 bg-black rounded-full text-white">ADD TO CART</button>
                </div>
            </div>
            {/* end of floating section */}
        </>
    );
}


export async function getServerSideProps(context) {

    const { req, res } = context;
    let isLogin = false;
    let user = {};

    try {

        const cookies = await CookiesService.getCookies('user', req, res);

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed.accessToken) {
                user = cookiesParsed;
                isLogin = true;
            }
        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }
    }

    return {
        props: {
            isLogin,
            user,
        }
    }
}