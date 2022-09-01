export default function ModalDashboard({ children }) {

    return (
        <div className="md:w-full md:h-full md:flex md:justify-center md:items-center md:fixed top-0 left-0 md:z-10 md:bg-black md:bg-opacity-40">
            <div className=" md:p-10 bg-white">
                {children}
            </div>
        </div>
    )
}