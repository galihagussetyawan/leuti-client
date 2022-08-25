import Image from "next/image";
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
                                    loader={imageLoader}
                                    src={data.name}
                                    quality={70}
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
                <a onClick={
                    handleNavigate({
                        pathname: `/product/${name?.toLowerCase().replaceAll(' ', '-')}`,
                        query: { id }
                    })
                }>
                    <button className=" md:w-64 w-40 py-5 rounded-full border border-black">SEE PRODUCT</button>
                </a>
            </div>
        </div>
    );
}