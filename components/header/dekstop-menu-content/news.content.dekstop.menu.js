import Image from "next/image";
import Link from "next/link";

export default function NewsContentDekstopMenu() {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-10 md:py-10">

            <Link href={'https://biz.kompas.com/read/2022/06/22/190000328/hasil-uji-sampling--98-persen-pengguna-merasa-cocok-pakai-serum-leuti'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/news-kompas-dekstop.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Hasil Uji Sampling: 98 Persen Pengguna Merasa Cocok Pakai Serum LEUTI</p>
                        <p className=" md:text-sm md:text-gray-400">https://biz.kompas.com/read/2022/06/22/190000328/hasil-uji-sampling--98-persen-pengguna-merasa-cocok-pakai-serum-leuti</p>
                    </div>
                </a>
            </Link>

            <Link href={'https://hariansinggalang.co.id/brand-leuti-akan-luncurkan-produk-face-mist-terbaru'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/leuti-hariansinggalang.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Brand LEUTI akan Luncurkan Produk Face Mist Terbaru</p>
                        <p className=" md:text-sm md:text-gray-400">https://hariansinggalang.co.id/brand-leuti-akan-luncurkan-produk-face-mist-terbaru</p>
                    </div>
                </a>
            </Link>

            <Link href={'https://www.nusabali.com/berita/116074/dr-maharani-kandhisa-luncurkan-face-mist-leuti-yang-kaya-manfaat'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/leuti-nusabali.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Dr. Maharani Kandhisa Luncurkan Face Mist LEUTI yang Kaya Manfaat</p>
                        <p className=" md:text-sm md:text-gray-400">https://www.nusabali.com/berita/116074/dr-maharani-kandhisa-luncurkan-face-mist-leuti-yang-kaya-manfaat</p>
                    </div>
                </a>
            </Link>

            <Link href={'https://www.jatimtimes.com/baca/271317/20220813/184100/terobosan-baru-brand-leuti-mampu-menggeser-penggunaan-toner-dan-essence'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/leuti-jatimtimes.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Terobosan Baru, Brand LEUTI Mampu Menggeser Penggunaan Toner dan Essence</p>
                        <p className=" md:text-sm md:text-gray-400">https://www.jatimtimes.com/baca/271317/20220813/184100/terobosan-baru-brand-leuti-mampu-menggeser-penggunaan-toner-dan-essence</p>
                    </div>
                </a>
            </Link>

            <Link href={'https://metrobali.com/juaranya-skincare-di-indonesia-face-mist-leuti-miliki-manfaat-2-in-1'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/leuti-metrobali.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Juaranya Skincare di Indonesia, Face Mist LEUTI Miliki Manfaat 2 in 1</p>
                        <p className=" md:text-sm md:text-gray-400">https://metrobali.com/juaranya-skincare-di-indonesia-face-mist-leuti-miliki-manfaat-2-in-1</p>
                    </div>
                </a>
            </Link>

            <Link href={'https://www.wartajogja.id/2022/08/lolos-uji-sampling-face-mist-leuti-siap.html'}>
                <a target={'_blank'} className="flex md:items-center md:space-x-3 md:px-10 md:py-5 md:hover:cursor-pointer md:hover:bg-gray-100">
                    <div className=" md:min-w-[120px] md:min-h-[80px] md:relative bg-gray-200">
                        <Image
                            quality={10}
                            layout={'fill'}
                            objectFit={'cover'}
                            src={'/leuti-wartajogja.png'}
                        />
                    </div>
                    <div className=" grid grid-cols-1 gap-1">
                        <p>Lolos Uji Sampling, Face Mist LEUTI Siap Diluncurkan pada Oktober 2022</p>
                        <p className=" md:text-sm md:text-gray-400">https://www.wartajogja.id/2022/08/lolos-uji-sampling-face-mist-leuti-siap.html</p>
                    </div>
                </a>
            </Link>

        </div>
    );
}