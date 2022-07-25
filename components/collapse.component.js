import { useState } from "react";

export default function Collapse({ title, children }) {

    const [open, setOpen] = useState(false);

    const toggleHandle = () => {
        setOpen(!open);
    };

    return (
        <div className=" md:overflow-hidden md:hover:text-gray-500">
            <div className=" md:flex md:justify-between md:items-center" onClick={toggleHandle}>
                <h5>{title}</h5>

                {
                    open ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                }

            </div>
            {open && <p className="md:flex md:flex-col md:mt-3 md:gap-2">{children}</p>}
        </div>
    );
}