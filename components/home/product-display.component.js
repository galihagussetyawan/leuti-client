import Image from "next/image";
import { motion } from "framer-motion";

const product = [
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },

    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg'
    },

];

export default function ProductDisplay() {
    return (
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:px-0 px-5 md:gap-6 md:my-20">
            {
                product.map((data, index) => {
                    return (
                        <div key={index} className="flex flex-col md:gap-5 gap-3 md:mb-10 mb-10 md:cursor-pointer">
                            <div className="md:w-full aspect-square relative bg-gray-100">
                                <Image
                                    src={data.image}
                                    className="md:hover:scale-110 md:ease-in-out md:duration-300"
                                    loading='lazy'
                                    layout='fill'
                                    objectFit='cover'
                                    quality={75}
                                />
                            </div>
                            <span>{data.title}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}