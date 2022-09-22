import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Collapse from "./collapse.component";

const faqData = [
    'Apakah LEUTI itu?',
    'Produk apa saja yang sudah dikeluarkan LEUTI saat ini?',
    'LEUTI Perfect Sublimate Serum paling cocok untuk jenis kulit yang bagaimana?',
    'Apa efekti tas LEUTI Perfect Sublimate Serum?',
    'Bagaimana cara order produk-produk LEUTI?',
    'Bagaimana jika tidak cocok menggunakan produk LEUTI?'
]

export default function Footer() {

    const router = useRouter();

    const handleNavigate = (url) => {
        return () => router.push(url);
    }

    return (
        <footer className=" md:w-full md:py-24 mt-20 md:border-y py-5 border-y border-gray-300">
            <div className="md:px-10 md:grid md:grid-cols-4 grid-cols-1 gap-5">

                {/* column one */}
                <div className="border-b border-gray-300 md:border-0 py-5">
                    <div className="flex md:flex-row md:gap-28 justify-center md:justify-start gap-10 px-5">
                        <div className="w-28 h-20 relative bg-gray-100">
                            <Image
                                src={'/full-logo.jpeg'}
                                quality={30}
                                layout='fill'
                                loading='lazy'
                                objectFit='cover'
                            />
                        </div>

                        <div>
                            <div className="w-28 h-20 relative bg-gray-100">
                                <Image
                                    src={'/BPOM-Logo.jpg'}
                                    quality={30}
                                    layout='fill'
                                    objectFit='cover'
                                    loading='lazy'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* end column one */}

                {/* column two */}
                <div className="border-b border-gray-300 md:border-0 py-5">

                    <div className="flex flex-col md:gap-10 gap-5 px-5">
                        <h6 className=" font-semibold">CLIENT SERVICES</h6>
                        <div className="flex flex-col md:gap-5 gap-4">

                            <Collapse title="Contact">
                                <div className="flex flex-col">

                                    <Link href={'https://api.whatsapp.com/send?phone=6281352888807'}>
                                        <a target={'_blank'} className="flex items-center space-x-3">
                                            <i>
                                                <Image
                                                    src={'/whatsapp.svg'}
                                                    width={25}
                                                    height={25}
                                                />
                                            </i>
                                            <span className=" md:hover:underline">081352888807</span>
                                        </a>
                                    </Link>

                                </div>
                            </Collapse>

                            <Collapse title={'FAQ'}>
                                {
                                    faqData?.map((data, index) => {
                                        return (
                                            <span key={index} className=" md:hover:underline"
                                                onClick={handleNavigate({
                                                    pathname: '/faq',
                                                    query: {
                                                        index: index,
                                                    }
                                                })}>
                                                {data}
                                            </span>
                                        )
                                    })
                                }
                            </Collapse>
                        </div>
                    </div>
                </div>
                {/* end column two */}

                {/* column three */}
                <div className="border-b border-gray-300 md:border-0 py-5">

                    <div className="flex flex-col md:gap-10 gap-5 px-5">
                        <h6 className=" font-semibold">THE STORY OF LEUTI</h6>

                        <div className="flex flex-col md:gap-5 gap-4">

                            <Collapse title="Legal Terms">
                                <span>Coming Soon</span>
                                <span>Coming Soon</span>
                                <span>Coming Soon</span>
                            </Collapse>
                            <Collapse title="Follow Us">
                                <div className="flex space-x-5">
                                    <Link href={'https://www.instagram.com/leuti_official/'}>
                                        <a target={'_blank'}>
                                            <Image
                                                src={'/instagram.svg'}
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                    </Link>

                                    <Link href={'https://www.instagram.com/leuti_official/'}>
                                        <a target={'_blank'}>
                                            <Image
                                                src={'/facebook.svg'}
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                    </Link>

                                    <Link href={'https://www.instagram.com/leuti_official/'}>
                                        <a target={'_blank'}>
                                            <Image
                                                src={'/tik_tok.svg'}
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                    </Link>

                                    <Link href={'https://www.instagram.com/leuti_official/'}>
                                        <a target={'_blank'}>
                                            <Image
                                                src={'/twitter.svg'}
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                    </Link>

                                    <Link href={'https://www.instagram.com/leuti_official/'}>
                                        <a target={'_blank'}>
                                            <Image
                                                src={'/youtube.svg'}
                                                width={50}
                                                height={50}
                                            />
                                        </a>
                                    </Link>

                                </div>
                            </Collapse>
                            <span>Careers</span>
                            <Collapse title="News">
                                <span>Kompas</span>
                            </Collapse>
                        </div>
                    </div>
                </div>
                {/* end column three */}

                {/* column four */}
                <div className=" md:border-0 py-5">

                    <div className="flex flex-col md:gap-10 gap-4 px-5">
                        <h6 className=" font-semibold">COUNTRY / REGION</h6>

                        <div className=" w-full flex justify-between border-b border-black">
                            <span>International Version</span>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                        </div>
                    </div>

                </div>
                {/* end column four */}

            </div>
        </footer>
    );
}