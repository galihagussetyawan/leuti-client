import { useEffect, useRef, useState } from "react";

export default function Collapse({ title, children }) {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    const toggleHandle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const checkIfClickedOutside = e => {

            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => document.removeEventListener("mousedown", checkIfClickedOutside)

    }, [open])


    return (
        <div ref={ref} className={`md:overflow-hidden md:hover:text-gray-500 ${open && 'text-gray-500'}`}>
            <div className="flex justify-between items-center md:cursor-pointer" onClick={toggleHandle}>
                <h5>{title}</h5>

                {
                    open ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                }

            </div>
            {open && <div className="flex flex-col md:mt-3 mt-3 md:gap-2 gap-3 md:cursor-pointer">{children}</div>}
        </div>
    );
}