import Image from "next/image";

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
        <div className="grid md:grid-cols-5 md:gap-6 md:my-20">
            {
                product.map((data, index) => {
                    return (
                        <div key={index} className="flex flex-col md:gap-5 md:mb-10">
                            <div className="md:w-full md:aspect-square">
                                <Image
                                    width={200}
                                    height={200}
                                    src={data.image}
                                    layout='responsive'
                                    quality={65}
                                />
                            </div>
                            <span className="">{data.title}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}