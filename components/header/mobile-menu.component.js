import Link from "next/link";

export default function MobileMenu({ closeAction }) {

    const handleToggleClose = () => {
        return closeAction();
    };

    return (
        <div className="w-screen h-screen md:hidden flex justify-end fixed top-0 bg-opacity-40 bg-black">
            <div className="h-full w-11/12 flex flex-col bg-white">

                {/* close action button */}
                <div className=" text-end">
                    <button className="p-4 bg-green-200" onClick={handleToggleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {/* end close action button */}

                {/* account */}
                <div className="flex ">
                    <div className="space-x-2">
                        <span>ARE YOU A AGENT</span>
                        <button className="font-bold md:hover:underline">REGISTER / LOGIN</button>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                {/* end account */}

                {/* menu */}
                <ul className="flex flex-col md:justify-between md:gap-5">
                    <li>
                        <Link href={{ pathname: '/shop' }}>SHOP</Link>
                    </li>
                    <li>
                        <span id="reward-menu">REWARD</span>
                    </li>
                    <li>NEWS</li>
                    <li>STORY</li>
                    <li>RANK</li>
                    <li>GALLERY</li>
                </ul>
                {/* end menu */}

            </div>
        </div>
    );
}