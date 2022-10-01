import {
    useRef, useState, useEffect
} from "react";

export default function Popover({ title, children, position }) {

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

    const positionPopover = (position) => {

        if (position === 'bottom') return 'left-0 left-1/2 -translate-x-1/2';

        return 'top-1/2 -left-44 -translate-y-1/2 -translate-x-1/2'
    }

    const iconsByPosition = (position) => {

        if (position === 'bottom') {
            return (
                <>
                    {
                        open ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                            </svg>

                    }
                </>
            );
        }

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
        )
    }


    return (
        <div ref={ref} className=" md:overflow-clip">
            <button className="flex justify-between items-center md:space-x-5 md:cursor-pointer" onClick={toggleHandle}>
                {title && <h5>{title}</h5>}
                {iconsByPosition(position)}
            </button>
            {open && <div className={`min-w-[300px] max-w-[500px] flex md:z-10 flex-col md:absolute ${positionPopover(position)} md:p-5 md:cursor-pointer md:border md:shadow-2xl md:bg-white`}>{children}</div>}
        </div>
    );
}