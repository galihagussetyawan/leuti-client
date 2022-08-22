import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import AuthContext from '../../lib/context/auth.context';

import LocalCurrency from "../../lib/helpers/local-currency.help";

const product = [
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
    {
        title: 'Leuti Perfect Sublimate Serum',
        image: '/images3.jpeg',
        price: 205000,
    },
];

export default function ProductDisplay() {

    const { isLogin } = useContext(AuthContext);

    return (
        <div className="grid md:grid-cols-5 grid-cols-2 gap-3 md:px-0 px-5 md:gap-6 md:my-20">
            {
                product.map((data, index) => {
                    return (
                        <Link
                            key={index}
                            href={{
                                pathname: `/product/${data.title.split(' ').join('-').toLowerCase()}`
                            }}>
                            <div className="flex flex-col md:gap-3 gap-3 md:mb-14 mb-10 md:cursor-pointer">
                                <div className="md:w-full aspect-square relative bg-gray-100">
                                    <Image
                                        src={data.image}
                                        className="md:hover:scale-110 md:ease-in-out md:duration-300"
                                        layout='fill'
                                        objectFit='cover'
                                        quality={75}
                                    />
                                </div>
                                <span>{data.title}</span>
                                {isLogin && <span>{`${LocalCurrency(data.price)}`}</span>}
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}