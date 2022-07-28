import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown({ children, top, closeAction, stateMenu }) {

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
        <>
            <AnimatePresence>
                {
                    stateMenu &&

                    <div className={`md:w-full md:h-full md:fixed md:left-0 md:top-[129px]`}>

                        <motion.div ref={ref} className="md:h-52 md:px-10 md:bg-white"
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{
                                ease: 'linear',
                                duration: 0.4
                            }}
                        >
                            <motion.div className="md:min-h-[200px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {children}
                            </motion.div>
                        </motion.div>

                        <motion.div className="md:w-full md:h-full md:absolute md:bg-black md:bg-opacity-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        ></motion.div>
                    </div>
                }
            </AnimatePresence>
        </>
    );
}