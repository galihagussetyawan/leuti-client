import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import AuthContext from "../../lib/context/auth.context";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function ProductDiscover({ name, category, images }) {

    const { isLogin } = useContext(AuthContext);

    return (
        <div className="flex flex-col gap-7">

            <div className=" grid md:grid-cols-3 md:gap-5 grid-cols-1">

                {
                    images?.map((data, index) => {
                        return (
                            <div key={index} className="md:w-full md:h-[700px] w-full h-[450px]  relative overflow-hidden bg-gray-100">
                                <Image
                                    className=" scale-105"
                                    loader={imageLoader}
                                    src={data.name}
                                    quality={50}
                                    objectPosition='center'
                                    objectFit='cover'
                                    layout='fill'
                                />
                            </div>
                        )
                    })
                }

            </div>

            <div className="flex flex-col px-5 md:px-0">
                <span className=" font-light">SKINCARE</span>
                <span className=" md:text-lg">{name}</span>
                {isLogin && <span className="mt-5 text-lg">Rp203.000</span>}
            </div>

            <div className="text-center md:text-left">
                <Link href={{ pathname: '/product/leuti-perfect-sublimate-serum' }}>
                    <button className=" md:w-64 w-40 py-5 rounded-full border border-black">SEE PRODUCT</button>
                </Link>
            </div>
        </div>
    );
}