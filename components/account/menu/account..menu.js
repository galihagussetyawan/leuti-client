import { useState } from "react";

export default function AccountMenu({ data }) {

    const [isEdit, setIsEdit] = useState(false);
    const [firstname, setFirstname] = useState(data?.firstname);
    const [lastname, setLastname] = useState(data?.lastname);
    const [username, setUsername] = useState(data?.username);
    const [email, setEmail] = useState(data?.email);

    const handleChangeFirstname = event => {
        setFirstname(event.currentTarget.value);
    }

    const handleChangeLastname = event => {
        setLastname(event.currentTarget.value);
    }

    const handleChangeUsername = event => {
        setUsername(event.currentTarget.value);
    }

    const handleChangeEmail = event => {
        setEmail(event.currentTarget.value);
    }

    const handleEditButton = () => {
        setIsEdit(!isEdit);
    }

    const handleSaveButton = () => {
        setIsEdit(false);
    }

    return (
        <div className="md:w-full md:space-y-20 space-y-7">

            <span className="md:text-2xl">Account Information</span>

            <div className="space-y-5">
                <div className="md:w-10/12 md:flex md:space-x-10 space-y-5 md:space-y-0">
                    <div className="md:w-1/2 border border-black">
                        <div className="flex flex-col px-4 py-2">
                            <span className="text-sm text-gray-700">Firstname</span>
                            <input className="outline-none text-lg font-semibold" disabled={!isEdit} value={firstname} onChange={handleChangeFirstname} />
                        </div>
                    </div>
                    <div className="md:w-1/2 border border-black">
                        <div className="flex flex-col px-4 py-2">
                            <span className="text-sm text-gray-700">Lastname</span>
                            <input className="outline-none text-lg font-semibold" disabled={!isEdit} value={lastname} onChange={handleChangeLastname} />
                        </div>
                    </div>
                </div>

                <div className="md:w-10/12 border border-black">
                    <div className="flex flex-col px-4 py-2">
                        <span className="text-sm text-gray-700">Username</span>
                        <input className="outline-none text-lg font-semibold" disabled={!isEdit} value={username} onChange={handleChangeUsername} />
                    </div>
                </div>

                <div className="md:w-10/12 border border-black">
                    <div className="flex flex-col px-4 py-2">
                        <span className="text-sm text-gray-700">Email</span>
                        <input className="outline-none text-lg font-semibold" disabled={!isEdit} onChange={handleChangeEmail} value={email} />
                    </div>
                </div>

            </div>

            <div className="space-x-5 flex">
                {
                    isEdit ?
                        <button className="md:w-64 w-full py-5 rounded-full text-white bg-black" onClick={handleSaveButton}>Save Changes</button>
                        :
                        <button className="md:w-64 w-full py-5 rounded-full text-white bg-black" onClick={handleEditButton}>Edit Account</button>
                }
                <button className="md:w-64 w-full py-5 rounded-full border border-gray-500 text-gray-500">Discard Changes</button>
            </div>

        </div>
    );
}