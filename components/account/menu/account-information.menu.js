export default function AccountInformationMenu({ data }) {
    return (
        <div className="md:w-full md:space-y-20 space-y-7">

            <span className="md:text-2xl">Account Information</span>

            <div className="flex md:flex-row md:space-x-5 gap-5 flex-col-reverse">

                {/* tab contact information */}
                <div className="md:w-1/2 space-y-5">

                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Email</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Phone Number</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                </div>
                {/* end of tab contact information */}

                <div className="md:w-1/2 space-y-5">
                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Country</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Province</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">City</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Address</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black md">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Zip Code</span>
                            <input className="h-7 outline-none text-lg font-semibold" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-x-5 flex">
                <button className="md:w-64 w-full md:py-7 py-3 rounded-full text-white bg-black">Edit Account</button>
                <button className="md:w-64 w-full md:py-7 py-3 rounded-full border border-gray-500 text-gray-500">Discard Changes</button>
            </div>

        </div>
    );
}