import Image from "next/image";
import Link from "next/link";

export default function ProductDiscover() {
    return (
        <div className="md:flex md:flex-col md:gap-5 md:my-20">

            <div className=" grid md:grid-cols-3 md:gap-5 grid-cols-1">
                <div className=" md:w-full overflow-hidden">
                    <Image
                        width={200}
                        height={300}
                        src={'/images1.jpg'}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>

                <div className="md:h-32 hidden md:block">
                    <Image
                        width={200}
                        height={300}
                        src={'/images1.jpg'}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>

                <div className="md:h-32 hidden md:block">
                    <Image
                        width={200}
                        height={300}
                        src={'/images1.jpg'}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>
            </div>

            <div>
                <Link href={{ pathname: '/shop' }}>
                    <button className=" md:w-64 md:h-12 rounded-full border border-gray-400">DISCOVER</button>
                </Link>
            </div>
        </div>
    );
}