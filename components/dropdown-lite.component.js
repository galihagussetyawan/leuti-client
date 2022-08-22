export default function DropdownLite({ children }) {
    return (
        <>
            {/* <div className="md:w-screen md:h-screen md:absolute md:top-[121px] md:left-0 md:bg-opacity-40 md:bg-black"></div> */}
            <div className="md:w-96 md:p-5 md:absolute md:top-[52px] md:right-0 md:bg-white">
                {children}
            </div>
        </>
    );
}