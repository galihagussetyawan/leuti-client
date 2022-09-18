import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import DashboardContext from "../../../lib/context/dashboard.context"
import UserService from "../../../services/user.service"
import SponsorService from "../../../services/sponsor.service"

import Popover from "../../commons/popover.component"
import ModalDashboard from "../modal.dashboard"
import Toast from "../../commons/toast.component"

export default function UserListMenu() {

    const router = useRouter();
    const { userList } = useContext(DashboardContext);

    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    })
    const [modal, setModal] = useState({
        isOpen: false,
        action: null,
        data: null,
    })
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState();
    const [userDownlineId, setUserDownlineId] = useState();

    useEffect(() => {

        if (search === "") {
            setIsSearch(false);
            return;
        }

    }, [search, isSearch])

    const handleChangeSearch = event => {
        setSearch(event.target.value);
    }

    const handleChangeUserDownlineId = event => {
        setUserDownlineId(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        setIsSearch(true);

        UserService.searchUserByIdOrUsername(search)
            .then(res => setSearchData(res?.data?.data))
            .catch(err => console.log(err.response))
    }

    const handleKeyDown = event => {

        if (event.key === 'Enter') {

            setIsSearch(true);

            UserService.searchUserByIdOrUsername(search)
                .then(res => setSearchData(res?.data?.data))
                .catch(err => console.log(err.response))
        }
    };

    // --------------------------------------------------------------------
    const handleCreateSponsor = () => {

        SponsorService.createSponsor(modal?.data?.id, userDownlineId)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {
                        setModal({
                            isOpen: false,
                            action: null,
                            data: null,
                        })
                        setUserDownlineId();


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

    const handleAddSponsorDownlineById = () => {

        SponsorService.addSponsorDownlineById(modal?.data?.sponsor?.id, userDownlineId)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {
                        setModal({
                            isOpen: false,
                            action: null,
                            data: null,
                        })
                        setUserDownlineId();

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
                    message: err.response.data.error_message,
                })

            })
    }

    const handleRemoveSponsorDownlineById = () => {

        SponsorService.removeSponsorDownlineById(modal?.data?.sponsor?.id, userDownlineId)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {
                        setModal({
                            isOpen: false,
                            action: null,
                            data: null,
                        })
                        setUserDownlineId();

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
                    message: err.response.data.error_message,
                })
            })
    }

    // ------------------------------------------------------------------

    const handleAddDownlineAgent = data => {

        return () => {

            setModal({
                isOpen: true,
                action: 'add-downline',
                data,
            })
        }
    }

    const handleActionRemoveSponsor = (data, userdownlineid) => {

        return () => {

            setUserDownlineId(userdownlineid);
            setModal({
                isOpen: true,
                action: 'remove-sponsor',
                data
            })
        }
    }

    const handleCloseModal = () => {
        setModal({
            isOpen: false,
            action: null,
            data: null,
        })
    }

    const modalActionButtonByStatus = () => {

        if (modal.action === 'add-downline') {

            if (!modal.data.sponsor) {
                return (
                    <div className=" space-y-10 text-center">
                        <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                        <div className="md:w-full border border-gray-400 focus-within:border-gray-500">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-left text-sm text-gray-700">USER ID</span>
                                <input className="outline-none text-lg font-semibold" onChange={handleChangeUserDownlineId} />
                            </div>
                        </div>
                        <div className="flex justify-between space-x-10">
                            <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                            <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleCreateSponsor}>Ok</button>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className=" space-y-10 text-center">
                        <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                        <div className="md:w-full border border-gray-400 focus-within:border-gray-500">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-left text-sm text-gray-700">USER ID</span>
                                <input className="outline-none text-lg font-semibold" onChange={handleChangeUserDownlineId} />
                            </div>
                        </div>
                        <div className="flex justify-between space-x-10">
                            <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                            <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleAddSponsorDownlineById}>Ok</button>
                        </div>
                    </div>
                )
            }
        }

        if (modal.action === 'remove-sponsor') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Apakah kamu akan menghapus sponsor agent ini ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleRemoveSponsorDownlineById}>Ok</button>
                    </div>
                </div>
            )
        }
    }

    const fieldSponsor = (data) => {

        return (
            <Popover title={'Sponsors'} position={'bottom'}>
                <div className="flex flex-col space-y-3">

                    <div className="flex flex-col">
                        <span className="font-semibold">Upline</span>
                        <span className="text-gray-500">{data?.sponsor?.upline?.username ? data?.sponsor?.upline?.username : '-'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Downline</span>
                        <div className="md:flex md:flex-col divide-y">
                            {
                                data?.sponsor?.downline?.map((sponsor, index) => {
                                    return (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="py-3 text-gray-500">{sponsor?.username}</span>
                                            <button className="text-gray-400 md:hover:text-red-500" onClick={handleActionRemoveSponsor(data, sponsor?.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        (data?.sponsor?.downline?.length < 2 || !data.sponsor) &&
                        <button className="w-full py-3 rounded-full border border-gray-300 text-gray-600 md:hover:border-gray-400 md:hover:text-gray-600" onClick={handleAddDownlineAgent(data)}>+ Downline</button>
                    }

                </div>
            </Popover>
        );
    }

    // ----------------NOTIFICATION--------------------------
    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }


    return (
        <>
            <div className="md:min-w-full max-w-full md:min-h-screen md:space-y-10 md:h-96 md:px-5">
                <p className="md:border-b md:border-gray-300">AGENT LIST</p>
                <div className="md:space-y-5 md:bg-white md:border md:border-gray-200">

                    {/* search field */}
                    <div className="md:w-1/3 md:p-5">
                        <div className="md:flex md:border md:border-gray-400 px-4 py-2">
                            <div className="md:w-full md:flex md:flex-col">
                                <span className="text-sm text-gray-700">ID OR USERNAME</span>
                                <input placeholder="search user by id or username" className="outline-none text-lg font-semibold" onChange={handleChangeSearch} onKeyDown={handleKeyDown} />
                            </div>
                            <button className="md:text-gray-400 md:hover:text-gray-600" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* end of search field */}

                    <table className="md:w-[100%] md:text-left">
                        <thead className="md:uppercase md:text-xs md:text-gray-400 md:border-t-2">
                            <tr>
                                <th className="md:py-3 md:px-6">id</th>
                                <th className="md:py-3 md:px-6">sponsor</th>
                                <th className="md:py-3 md:px-6">firtsname</th>
                                <th className="md:py-3 md:px-6">lastname</th>
                                <th className="md:py-3 md:px-6">username</th>
                                <th className="md:py-3 md:px-6">email</th>
                                <th className="md:py-3 md:px-6">phone</th>
                                <th className="md:py-3 md:px-6">country</th>
                                <th className="md:py-3 md:px-6">province</th>
                                <th className="md:py-3 md:px-6">city</th>
                                <th className="md:py-3 md:px-6">district</th>
                                <th className="md:py-3 md:px-6">village</th>
                                <th className="md:py-3 md:px-6">postal code</th>
                                <th className="md:py-3 md:px-6">address</th>
                            </tr>
                        </thead>
                        <tbody className="md:text-gray-800">
                            {
                                (isSearch ? searchData : userList)?.items?.map((data, index) => {
                                    return (
                                        <tr key={index} className="md:border-b">
                                            <td className="md:py-3 md:px-6">{data?.id}</td>
                                            <td className="md:py-3 md:px-6 relative">{fieldSponsor(data)}</td>
                                            <td className="md:py-3 md:px-6">{data?.firstname}</td>
                                            <td className="md:py-3 md:px-6">{data?.lastname}</td>
                                            <td className="md:py-3 md:px-6">{data?.username}</td>
                                            <td className="md:py-3 md:px-6">{data?.email}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.phone}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.country}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.province}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.city}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.districts}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.village}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.postalCode}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.address}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>

            {
                modal?.isOpen &&
                <ModalDashboard>
                    <div className=" md:max-w-[350px] md:min-w-[350px]">
                        {modalActionButtonByStatus()}
                    </div>
                </ModalDashboard>
            }

            {
                notification?.isOpen &&
                <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />
            }
        </>
    )
}