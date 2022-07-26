export default function Dropdown({ children }) {
    return (
        <div className={`md:w-full md:h-full md:fixed md:left-0 md:top-[123px] md:bg-black md:bg-opacity-40`}>
            <div className="md:h-52 md:px-10 md:bg-white">
                {children}
            </div>
        </div>
    );
}