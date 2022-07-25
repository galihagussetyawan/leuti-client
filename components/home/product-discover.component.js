import Image from "next/image";

export default function ProductDiscover() {
    return (
        <div className="md:flex md:flex-col md:gap-5 md:py-20">

            <div className=" grid md:grid-cols-3 gap-5">
                <div className=" md:w-full bg-black overflow-hidden">
                    <Image
                        width={200}
                        height={300}
                        src={'/images1.jpg'}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>

                <div className="md:h-32 bg-black">
                    <Image
                        width={200}
                        height={300}
                        src={'/images1.jpg'}
                        loading='lazy'
                        layout='responsive'
                    />
                </div>

                <div className="md:h-32 bg-black">
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
                <button className=" md:w-64 md:h-12 rounded-full border border-gray-400">DISCOVER</button>
            </div>
        </div>
    );
}