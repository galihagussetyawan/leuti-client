import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import AuthContext from "../../lib/context/auth.context";
import LocalCurrency from "../../lib/helpers/local-currency.help";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function ProductDiscover({ id, name, category, images, price }) {

    const router = useRouter();
    const { isLogin } = useContext(AuthContext);

    if (typeof window !== 'undefined') {
        router.prefetch('/product');
    }

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    return (
        <div className="flex flex-col gap-7">

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">

                {
                    images?.map((data, index) => {
                        return (
                            <div key={index} className={`md:w-full md:h-[700px] w-full h-[450px] ${index !== 0 && 'hidden md:block'} relative overflow-hidden bg-gray-100`}>
                                <Image
                                    className="scale-105"
                                    loading={'lazy'}
                                    loader={imageLoader}
                                    alt={name}
                                    title={name}
                                    src={data?.name}
                                    objectPosition={'center'}
                                    objectFit='cover'
                                    layout='fill'
                                />
                            </div>
                        )
                    })
                }

            </div>

            <div className="flex flex-col px-5 md:px-0">
                <span className="font-light uppercase">{category}</span>
                <span className=" md:text-lg">{name}</span>
                {isLogin && <span className="mt-5 text-lg">{LocalCurrency(price)}</span>}
            </div>

            <div className="text-center md:text-left">
                <button
                    type='link'
                    onClick={handleNavigate({
                        pathname: `/product/${name?.toLowerCase()?.split(' ')?.join('-')}`,
                        query: { id }
                    })}
                    className="md:w-64 w-1/2 py-5 rounded-full border border-black"
                >
                    <span>SEE PRODUCT</span>
                </button>
            </div>
        </div>
    );
}