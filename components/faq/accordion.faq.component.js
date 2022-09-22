import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function AccordionFaqComponent({ title, children, id }) {

    const router = useRouter();
    const ref = useRef();

    const { index } = router.query;

    const [open, setOpen] = useState(false);

    const toggleHandle = () => {
        setOpen(!open);
        router.replace({ query: { index: id } })

        if (open) {
            router.replace({ query: null });
        }

    };

    useEffect(() => {

        const checkIfClickedOutside = e => {

            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                router.replace({ query: null });
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => document.removeEventListener("mousedown", checkIfClickedOutside)

    }, [open]);

    useEffect(() => {

        if (index && ref?.current?.id === index) {
            setOpen(true);
        }

    }, [index])

    return (
        <div ref={ref} id={id} className="md:overflow-hidden p-5 border">
            <div className="flex justify-between items-center md:cursor-pointer" onClick={toggleHandle}>
                <h5 className={`uppercase font-semibold text-lg ${open && 'text-green-700'}`}>{title}</h5>

                <div>
                    {
                        open ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                    }
                </div>

            </div>
            {
                open &&
                <div className="flex flex-col md:mt-3 mt-3 md:gap-2 gap-3 text-gray-500">
                    {children}
                </div>
            }
        </div>
    );
}