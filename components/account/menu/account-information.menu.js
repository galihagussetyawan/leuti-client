import { useState } from "react";

export default function AccountInformationMenu({ data }) {

    const [country, setCountry] = useState(data?.country);
    const [province, setProvince] = useState(data?.province);
    const [city, setCity] = useState(data?.city);
    const [districts, setDistricts] = useState(data?.districts);
    const [village, setVillage] = useState(data?.village);
    const [address, setAddress] = useState(data?.address);
    const [postalCode, setPostalCode] = useState(data?.postalCode);
    const [phone, setPhone] = useState(data?.phone);

    const handleChangeCountry = event => {
        setCountry(event.currentTarget.value);
    }

    const handleChangeProvince = event => {
        setProvince(event.currentTarget.value)
    }

    const handleChangeCity = event => {
        setCity(event.currentTarget.value);
    }

    const handleChangeDistricts = event => {
        setDistricts(event.currentTarget.value);
    }

    const handleChangeVillage = event => {
        setVillage(event.currentTarget.value);
    }

    const handleChangeAddress = event => {
        setAddress(event.currentTarget.value);
    }

    const handleChangePostalCode = event => {
        setPostalCode(event.currentTarget.value);
    }

    const handleChangePhone = event => {
        setPhone(event.currentTarget.value);
    }

    return (
        <div className="md:w-full md:space-y-20 space-y-7">

            <span className="md:text-2xl">Account Information</span>

            <div className="flex md:flex-row md:space-x-5 gap-5 flex-col-reverse">

                {/* tab contact information */}
                <div className="md:w-1/2 space-y-5">

                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Email</span>
                            <input className="outline-none text-lg font-semibold" />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Phone Number</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangePhone} value={phone} />
                        </div>
                    </div>

                </div>
                {/* end of tab contact information */}

                <div className="md:w-1/2 space-y-5">
                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Country</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeCountry} value={country} />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Province</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeProvince} value={province} />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">City</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeCity} value={city} />
                        </div>
                    </div>

                    <div className="border border-black">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Address</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeAddress} value={address} />
                        </div>
                    </div>

                    <div className="border border-black md">
                        <div className="flex flex-col px-4 py-1">
                            <span className=" text-gray-700">Postal Code</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangePostalCode} value={postalCode} />
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