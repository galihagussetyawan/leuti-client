import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductHorizontalDiscover() {

    const router = useRouter();

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    return (
        <div className='flex flex-col md:gap-5 gap-7 md:my-20'>
            <div className='md:w-full md:h-[970px] w-full h-[300px] relative md:flex md:justify-center bg-gray-100'>
                <Image
                    src={'/leuti-discover.jpg'}
                    quality={75}
                    layout='fill'
                    loading='lazy'
                    objectPosition={'bottom'}
                    objectFit='cover'
                />
            </div>
            <div className="text-center md:text-left">
                <a onClick={handleNavigate('/shop')}>
                    <button className=" md:w-64 w-1/2 py-5 m-auto rounded-full border border-black">DISCOVER</button>
                </a>
            </div>
        </div>
    );
}