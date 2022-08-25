import { useEffect } from "react";

export default function Toast({ status, message, closeAction, isOpen }) {

    useEffect(() => {

        if (isOpen) {

            setTimeout(() => {
                closeAction();
            }, 6000);
        }
    }, [isOpen])

    const icon = () => {

        if (status === 'success') {
            return (
                <div className=" w-14 h-14 p-2 bg-green-200 text-green-700 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            );
        }

        if (status === 'error') {
            return (
                <div className=" w-14 h-14 p-2 bg-red-200 text-red-700 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
            );
        }
    };

    const handleClose = () => {
        closeAction();
    }

    return (
        <div className="md:w-[400px] w-11/12 flex items-center m-auto p-5 fixed left-1/2 bottom-32 md:bottom-20 -translate-x-1/2 border border-gray-200 shadow-2xl bg-white">
            {icon()}
            <div className="w-full px-3 text-gray-700">{message}</div>
            <button className="w-10 h-10 p-1 text-gray-500 md:hover:text-gray-800 md:hover:bg-gray-200" onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}