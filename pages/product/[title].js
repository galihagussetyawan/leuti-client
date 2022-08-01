import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

//import components
import Header from '../../components/header.component';
const Footer = dynamic(() => import('../../components/footer.component'));
const Collapse = dynamic(() => import('../../components/collapse.component'));

const imageProduct = [
    '/images4.jpg',
    '/images1.jpg',
    '/images2.jpg',
];

export default function Product({ title }) {

    const [imagePreview, setImagePreview] = useState(imageProduct[0]);
    const [quantity, setQuantity] = useState(1);

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

        setQuantity(++quantity)
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
            <main className="md:w-4/5 m-auto flex md:flex-row flex-col gap-5 ">

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
                        <div className="md:w-full md:h-[700px] w-full h-96 relative bg-blue-400">
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
                        <h1 className="md:text-3xl text-2xl font-semibold">Leuti Perfect Sublimate Serum</h1>
                        <p>deksripsi singkat produk</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHAT IS</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold">WHY WE OVE IT</span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue ultrices velit, varius sodales quam faucibus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    {/* add to cart */}
                    <div className="hidden md:flex md:gap-10 gap-5 md:border-t p-5 md:py-20 md:border-gray-300">
                        <div className="flex border border-black">
                            <button className="w-12" onClick={handleDecreaseQuantity}>-</button>
                            <input className="w-16 h-12  text-center outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                            <button className="w-12" onClick={handleInceraseQuantity}>+</button>
                        </div>
                        <button className="md:w-52 w-full bg-black rounded-full text-white">ADD TO CART</button>
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

                {/* floating section */}
                <div className="w-full md:hidden fixed left-0 bottom-0 z-10 flex gap-5 p-5 bg-white">
                    <div className="flex border border-black">
                        <button className="w-12" onClick={handleDecreaseQuantity}>-</button>
                        <input className="w-16 h-12  text-center outline-none" value={quantity} onChange={handleOnChangeQuantity} />
                        <button className="w-12" onClick={handleInceraseQuantity}>+</button>
                    </div>
                    <button className="md:w-52 w-full bg-black rounded-full text-white">ADD TO CART</button>
                </div>
                {/* end of floating section */}

            </main>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const { title } = params;

    return {
        props: {
            title
        }
    }
}