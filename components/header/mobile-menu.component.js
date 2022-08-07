import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({ closeAction, isOpen }) {

  const isLogin = false;
  const user = {
    username: 'asdasdasd',
  }

  const handleToggleClose = () => {
    return closeAction();
  };

  return (
    <>
      <AnimatePresence>

        {
          isOpen &&
          <div className="w-screen h-screen md:hidden flex justify-end fixed top-0">
            <motion.div className="w-full h-full absolute bg-black bg-opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
            </motion.div>

            <motion.div className="h-full w-11/12 flex flex-col py-2 bg-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                ease: 'linear',
                duration: 0.15,
              }}
            >

              {/* close action button */}
              <div className=" text-end">
                <button className="p-5 text-gray-500" onClick={handleToggleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {/* end close action button */}

              {/* account */}
              <div className="flex border-y py-5 border-gray-200">

                <div className="w-full flex justify-between items-center px-5">

                  {/* point */}
                  {
                    isLogin &&
                    <div className="flex gap-1 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span>3000</span>
                    </div>
                  }
                  {/* end of point */}
                  {/* user cart */}
                  <div className="flex justify-end gap-5">
                    {
                      isLogin &&
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                    }
                    <button className="flex items-center">

                      {
                        isLogin ?
                          <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{user?.username}</span>
                          </div>
                          :
                          <Link href={{ pathname: '/login' }}>
                            <span className=" font-semibold">LOGIN</span>
                          </Link>
                      }
                    </button>
                  </div>
                  {/* end of user cart */}
                </div>
              </div>
              {/* end account */}

              <div className=" mt-5 overflow-y-scroll">

                {/* menu */}
                <ul className="flex flex-col px-5 justify-between gap-5">
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

            </motion.div>
          </div>
        }

      </AnimatePresence>
    </>
  );
}