import { useState } from "react";

export default function AccountMenu({ data }) {

    const [firstname, setFirstname] = useState(data?.firstname);
    const [lastname, setLastname] = useState(data?.lastname);
    const [username, setUsername] = useState(data?.username);

    const handleChangeFirstname = event => {
        setFirstname(event.currentTarget.value);
    }

    const handleChangeLastname = event => {
        setLastname(event.currentTarget.value);
    }

    const handleChangeUsername = event => {
        setUsername(event.currentTarget.value);
    }

    return (
        <div className="md:w-full md:space-y-20">

            <span className="md:text-2xl">Account Information</span>

            <div className="md:space-y-5">
                <div className="md:w-10/12 md:flex md:space-x-10">
                    <div className="md:w-1/2 border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Firstname</span>
                            <input className="h-7 outline-none text-lg font-semibold" value={firstname} onChange={handleChangeFirstname} />
                        </div>
                    </div>
                    <div className="md:w-1/2 border border-black">
                        <div className="md:flex md:flex-col p-4">
                            <span className=" text-gray-700">Lastname</span>
                            <input className="h-7 outline-none text-lg font-semibold" value={lastname} onChange={handleChangeLastname} />
                        </div>
                    </div>
                </div>

                <div className="md:w-10/12 border border-black">
                    <div className="md:flex md:flex-col p-4">
                        <span className=" text-gray-700">username</span>
                        <input className="h-7 outline-none text-lg font-semibold" value={username} onChange={handleChangeUsername} />
                    </div>
                </div>

                <div className="md:w-10/12 border border-black">
                    <div className="md:flex md:flex-col p-4">
                        <span className=" text-gray-700">Email</span>
                        <input className="h-7 outline-none text-lg font-semibold" />
                    </div>
                </div>

            </div>

            <div className="md:space-x-5">
                <button className="md:w-64 md:py-7 rounded-full text-white bg-black">Edit Account</button>
                <button className="md:w-64 md:py-7 rounded-full border border-gray-500 text-gray-500">Discard Changes</button>
            </div>

        </div>
    );
}