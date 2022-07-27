import { useRef, useEffect } from "react";

export default function Dropdown({ children, top, closeAction }) {

    const ref = useRef();

    useEffect(() => {

        const checkIfClickedOutside = e => {

            if (ref.current && !ref.current.contains(e.target)) {
                closeAction();
            }
        }

        document.addEventListener("mouseover", checkIfClickedOutside)

        return () => document.removeEventListener("mouseover", checkIfClickedOutside)

    }, [ref])


    return (
        <div className={`md:w-full md:h-full md:fixed md:left-0 md:top-[126px] md:bg-black md:bg-opacity-40`}>
            <div ref={ref} className="md:h-52 md:px-10 md:bg-white">
                {children}
            </div>
        </div>
    );
}