import { useRouter } from "next/router";

export default function ShopContentMobileMenu() {

    const router = useRouter();

    const handleNavigate = (url) => {
        return () => router.push(url);
    }

    return (
        <div className="px-5">

            <div onClick={handleNavigate('/shop')} className="space-y-2">
                <span className=" font-semibold">Whats New</span>

                <div className="flex flex-col space-y-2">
                    <div className="grid grid-cols-2 gap-5">
                        <div className=" h-24 bg-gray-200"></div>
                        <div className=" h-24 bg-gray-200"></div>
                    </div>
                    <span>Leuti Perfect Sublimate Serum</span>
                </div>
            </div>

        </div>
    );
}