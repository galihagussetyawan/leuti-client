export default function DropdownLite({ children }) {
    return (
        <>
            <iframe className="md:w-screen md:h-screen md:fixed md:top-[121px] md:left-0 md:bg-opacity-40 md:bg-black"></iframe>
            <div className="md:w-96 md:p-5 md:absolute md:top-[52px] md:right-0 md:bg-white">
                {children}
            </div>
        </>
    );
}