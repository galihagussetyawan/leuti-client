import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../../../lib/context/user.context";

import UserDetailService from "../../../services/user-detail.service";

const Toast = dynamic(() => import('../../../components/commons/toast.component'));

export default function AccountInformationMenu() {

    const router = useRouter();
    const { userDetail } = useContext(UserContext);

    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    })

    const [isEdit, setIsEdit] = useState(false);
    const [country, setCountry] = useState(userDetail?.country);
    const [province, setProvince] = useState(userDetail?.province);
    const [city, setCity] = useState(userDetail?.city);
    const [district, setDistrict] = useState(userDetail?.district);
    const [village, setVillage] = useState(userDetail?.village);
    const [address, setAddress] = useState(userDetail?.address);
    const [postalCode, setPostalCode] = useState(userDetail?.postalCode);
    const [phone, setPhone] = useState(userDetail?.phone);

    const handleChangeCountry = event => {
        setCountry(event.currentTarget.value);
    }

    const handleChangeProvince = event => {
        setProvince(event.currentTarget.value)
    }

    const handleChangeCity = event => {
        setCity(event.currentTarget.value);
    }

    const handleChangeDistrict = event => {
        setDistrict(event.currentTarget.value);
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

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    const handleToggleEditAddress = () => {
        setIsEdit(!isEdit);
    }

    const handleSaveUserDetail = () => {

        UserDetailService.addUserDetail(address, country, province, city, district, village, postalCode, phone)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        setNotification({
                            isOpen: true,
                            status: 'success',
                            message: res?.data?.message,
                        })
                    })
            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.error_message,
                })

            })
    }

    const handleUpdatSaveUserDetail = () => {

        UserDetailService.updateUserDetail(userDetail?.id, address, country, province, city, district, village, postalCode, phone)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        setNotification({
                            isOpen: true,
                            status: 'success',
                            message: res?.data?.message,
                        })

                        handleToggleEditAddress();
                    })
            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.error_message,
                })

            })

    }

    return (
        <>
            <div className="md:w-full md:space-y-20 space-y-10">
                <span className="hidden md:flex md:text-2xl">Account Information</span>

                {
                    !userDetail &&
                    <div className=" w-full p-5 border border-yellow-300 bg-yellow-100">
                        <span>Complete your account information</span>
                    </div>
                }

                <div className="flex md:flex-row md:space-x-5 gap-5 flex-col-reverse">

                    {/* tab contact information */}
                    <div className="md:w-1/2 space-y-5">

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Address</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeAddress} value={address} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Postal Code</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangePostalCode} value={postalCode} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Phone Number</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangePhone} value={phone} />
                            </div>
                        </div>

                    </div>
                    {/* end of tab contact information */}

                    <div className="md:w-1/2 space-y-5">
                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Country</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeCountry} value={country} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Province</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeProvince} value={province} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">City</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeCity} value={city} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">District</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeDistrict} value={district} />
                            </div>
                        </div>

                        <div className="border border-gray-300 focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-1">
                                <span className=" text-gray-700">Village</span>
                                <input disabled={!isEdit ?? true} className="outline-none text-lg font-semibold" onChange={handleChangeVillage} value={village} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex space-x-5">
                    {
                        !userDetail ?
                            isEdit ?
                                <div className="md:w-1/2 w-full grid grid-cols-2 gap-5">
                                    <button className="w-full py-5 uppercase rounded-full border border-gray-300 text-gray-500" onClick={handleToggleEditAddress}>Discard Changes</button>
                                    <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleSaveUserDetail}>Save</button>
                                </div>
                                :
                                <button className="md:w-64 w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleToggleEditAddress}>Edit Address</button>
                            :
                            isEdit ?
                                <div className="md:w-1/2 w-full grid grid-cols-2 gap-5">
                                    <button className="w-full py-5 uppercase rounded-full border border-gray-300 text-gray-500" onClick={handleToggleEditAddress}>Discard Changes</button>
                                    <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleUpdatSaveUserDetail}>Save Changes</button>
                                </div>
                                :
                                <button className="md:w-64 w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleToggleEditAddress}>Edit Address</button>
                    }
                </div>

            </div>

            {notification?.isOpen && <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />}
        </>
    );
}