import Link from "next/link";
import Modal from "./modal.component";

export default function LoginModal({ closeAction }) {
    return (
        <Modal>
            <div className="md:relative md:w-[450px] md:h-[600px] md:flex md:flex-col md:items-center md:p-10 md:gap-12">

                {/* close button */}
                <div className="md:w-full md:h-10 md:flex md:justify-end">
                    <button onClick={closeAction}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {/* end close button */}

                <span className="md:text-2xl">LOGIN</span>

                <div className=" md:flex md:flex-col gap-6">
                    <div>
                        <span>Username atau Email</span>
                        <input className=" md:w-full md:h-11 md:border md:px-3 border-gray-300 md:outline-none" />
                    </div>
                    <div>
                        <span>Password</span>
                        <input type={'password'} className=" md:w-full md:h-11 md:border md:px-3 border-gray-300 md:outline-none" />
                    </div>
                </div>

                <button className="md:bg-black md:text-white md:px-20 md:py-4 md:rounded-full">LOGIN</button>

                <div className=" md:flex md:flex-col gap-3">
                    <span className=" md:text-xl md:font-semibold">Dont have an account yet ?</span>
                    <Link href={{ pathname: '/register' }}>
                        <button className="md:hover:underline">Create an account</button>
                    </Link>
                </div>

            </div>
        </Modal>
    );
};