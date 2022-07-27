import Image from "next/image";
import Link from "next/link";

export default function ProductDiscover() {

    return (
        <div className="flex flex-col gap-7">

            <div className=" grid md:grid-cols-3 md:gap-5 grid-cols-1">
                <div className="md:w-full md:h-[700px] w-full h-[450px]  relative overflow-hidden">
                    <Image
                        src={'/images1.jpg'}
                        loading='lazy'
                        objectFit='cover'
                        layout='fill'
                    />
                </div>

                <div className="md:w-full md:h-[700px] w-full h-1/4 md:relative overflow-hidden hidden md:block">
                    <Image
                        src={'/images1.jpg'}
                        loading='lazy'
                        objectFit='cover'
                        layout='fill'
                    />
                </div>

                <div className="md:w-full md:h-[700px] w-full h-1/4 md:relative overflow-hidden hidden md:block">
                    <Image
                        src={'/images1.jpg'}
                        loading='lazy'
                        objectFit='cover'
                        layout='fill'
                    />
                </div>

            </div>

            <div className=" text-center">
                <Link href={{ pathname: '/shop' }}>
                    <button className=" md:w-64 md:h-12 w-40 h-12 m-auto rounded-full border border-black">DISCOVER</button>
                </Link>
            </div>
        </div>
    );
}