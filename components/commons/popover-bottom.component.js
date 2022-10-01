import { motion, AnimatePresence } from "framer-motion";

export default function PopoverBottom({ children, open, toggle }) {
    return (
        <>
            <AnimatePresence>

                {
                    open &&
                    <div className="md:hidden w-full h-screen fixed top-0 left-0 z-20">
                        <motion.div className="w-full h-screen bg-opacity-40 bg-black" onClick={toggle()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                        </motion.div>

                        <motion.div className=" w-full py-10 rounded-t-xl absolute bottom-0 bg-white"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                ease: 'linear',
                                duration: 0.2,
                            }}
                        >
                            <div className="w-1/5 h-2 m-auto rounded-full bg-gray-300" onClick={toggle()}></div>

                            {children}
                        </motion.div>
                    </div>
                }

            </AnimatePresence>
        </>
    );
}