import { useRouter } from "next/router";
import { useContext, useState } from "react"
import UserContext from "../../../lib/context/user.context";
import LocalCurrency from "../../../lib/helpers/local-currency.help";

import WithdrawService from "../../../services/withdraw.service";

export default function RoyaltiesAccountMenu() {

    const router = useRouter();
    const { royalties, withdraw } = useContext(UserContext);

    const [modal, setModal] = useState(false);
    const [tab, setTab] = useState('royalties-tab');

    const handleSwitchTab = (tab) => {
        return () => {
            setTab(tab);
        }
    }

    const handleToggleWithdraw = () => {
        setModal(!modal);
    }

    const handleCreateWithdraw = () => {

        WithdrawService.createWithdrawByUser()
            .then(res => {
                router.replace(router.asPath);
            })
            .catch(err => err)
            .finally(() => handleToggleWithdraw());
    }

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate?.toLocaleString('id', {
            dateStyle: 'long',
        })
    }

    const mobileConditionalComponentTab = () => {

        if (tab === 'royalties-tab') {
            return (
                <>
                    {
                        royalties?.total > 0 ?
                            <div className="w-full p-3 divide-y">
                                {
                                    royalties?.items?.map((data, index) => {
                                        return (
                                            <div key={index} className="flex justify-between py-5">
                                                <div className="flex space-x-4">
                                                    <span className=" text-gray-500">{index + 1}</span>
                                                    <span className="font-semibold">{convertDate(data?.createdAt)}</span>
                                                </div>
                                                <span className="font-semibold">{LocalCurrency(data?.amount)}</span>
                                            </div>
                                        )
                                    })
                                }

                                <div className="flex justify-between font-semibold py-5">
                                    <span>Total</span>
                                    <span className="text-2xl text-green-600">{LocalCurrency(royalties?.total)}</span>
                                </div>

                                <div className="md:w-2/4 mt-10">
                                    <button className="w-full uppercase py-5 rounded-full text-white bg-black" onClick={handleToggleWithdraw}>Withdraw</button>
                                </div>
                            </div>
                            :
                            <p className="w-full p-3 border border-yellow-300 bg-yellow-100">You currently dont have any royalties. To get royalties, invite your friends to join as a leuti agent. And get royalties from purchasing the agent</p>

                    }
                </>
            );
        }

        if (tab === 'withdraw-tab') {
            return (
                <div className="w-full flex flex-col">
                    {
                        withdraw?.length > 0 ?
                            withdraw?.map((data, index) => {
                                return (
                                    <div key={index} className="flex justify-between font-semibold py-5">
                                        <div>{convertDate(data?.createdAt)}</div>
                                        <div>{data?.status}</div>
                                        <div>{LocalCurrency(data?.amount)}</div>
                                    </div>
                                )
                            })
                            :
                            <p className="w-full p-3 border border-yellow-300 bg-yellow-100">You currently dont have any royalties. To get royalties, invite your friends to join as a leuti agent. And get royalties from purchasing the agent</p>
                    }
                    {withdraw?.length > 0 && <p className=" text-gray-500">NOTE: Request withdraw berhasil, anda akan segera dihubungi admin kami unutk proses penarikannya</p>}
                </div>
            );
        }
    }

    return (
        <>
            <div className="md:w-full md:space-y-20 space-y-10">
                <span className="hidden md:flex md:text-2xl">Royalties</span>

                {/* dekstop version */}
                <div className="hidden w-full md:flex space-x-10">
                    {/* section royalties list */}
                    <div className="md:w-1/2 w-full">
                        {
                            royalties?.total > 0 ?
                                <div className="w-full border p-3 divide-y">
                                    {
                                        royalties?.items?.map((data, index) => {
                                            return (
                                                <div key={index} className="flex justify-between py-5">
                                                    <div className="flex space-x-4">
                                                        <span className=" text-gray-500">{index + 1}</span>
                                                        <span className="font-semibold">{convertDate(data?.createdAt)}</span>
                                                    </div>
                                                    <span className="font-semibold">{LocalCurrency(data?.amount)}</span>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="flex justify-between font-semibold py-5">
                                        <span>Total</span>
                                        <span className="text-2xl text-green-600">{LocalCurrency(royalties?.total)}</span>
                                    </div>

                                    <div className="md:w-2/4 mt-10">
                                        <button className="w-full uppercase py-5 rounded-full text-white bg-black" onClick={handleToggleWithdraw}>Withdraw</button>
                                    </div>
                                </div>
                                :
                                <p className="w-full p-3 border border-yellow-300 bg-yellow-100">You currently dont have any royalties. To get royalties, invite your friends to join as a leuti agent. And get royalties from purchasing the agent</p>

                        }

                    </div>
                    {/*end of section royalties list */}

                    {/* withdraw request section */}
                    <div className="hidden w-1/2 md:flex flex-col border p-5">
                        <span className="uppercase font-semibold py-3 border-b">Withdraw Request</span>

                        <div className="mt-10">
                            {
                                withdraw?.length > 0 ?
                                    withdraw?.map((data, index) => {
                                        return (
                                            <div key={index} className="flex justify-between font-semibold py-5">
                                                <div>{convertDate(data?.createdAt)}</div>
                                                <div>{data?.status}</div>
                                                <div>{LocalCurrency(data?.amount)}</div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className="w-full p-3 border border-yellow-300 bg-yellow-100">You currently dont have any royalties. To get royalties, invite your friends to join as a leuti agent. And get royalties from purchasing the agent</p>
                            }
                        </div>
                        {withdraw?.length > 0 && <p className=" text-gray-500">NOTE: Request withdraw berhasil, anda akan segera dihubungi admin kami unutk proses penarikannya</p>}

                    </div>
                    {/*end of withdraw request section */}
                </div>
                {/* end of dekstop version */}

                {/* mobile version */}
                <div className="md:hidden flex flex-col">

                    {/* button switch tab */}
                    <div className="w-full h-14 flex p-1 rounded-full font-semibold bg-gray-100">
                        <button className={`w-1/2 h-full rounded-full ${tab === 'royalties-tab' && 'shadow-md bg-white'} ease-in-out duration-500`} onClick={handleSwitchTab('royalties-tab')}>Royalties</button>
                        <button className={`w-1/2 h-full rounded-full relative ${tab === 'withdraw-tab' && 'shadow-md bg-white'} ease-in-out duration-500`} onClick={handleSwitchTab('withdraw-tab')}>
                            <span>Withdraw</span>
                            {withdraw.length > 0 && <span className=" w-3 h-3 top-2 rounded-full absolute bg-red-500"></span>}
                        </button>
                    </div>
                    {/* end of button switch tab */}

                    <div className="mt-8">
                        {mobileConditionalComponentTab()}
                    </div>

                </div>
                {/* end of mobile version */}

            </div>

            {
                modal &&
                <div className=" w-screen h-screen flex flex-col justify-center items-center z-10 fixed top-0 left-0 bg-opacity-40 bg-black">
                    <div className="md:w-1/4 md:min-h-[300px] w-10/12 min-h-[250px] flex flex-col justify-center items-center p-5 md:px-10 space-y-10 bg-gray-50">

                        <div className="flex flex-col space-y-3 text-center">
                            <p className="text-2xl font-semibold">Withdraw Request</p>
                            <p className="text-center">Apakah kamu yakin akan menarik royalti dengan total {LocalCurrency(royalties?.total)} ?</p>
                        </div>
                        <div className="w-full flex space-x-5">
                            <button className="w-1/2 uppercase py-5 rounded-full border text-gray-500 border-gray-300 md:hover:border-gray-400 md:hover:text-gray-600" onClick={handleToggleWithdraw}>Cancel</button>
                            <button className="w-1/2 uppercase py-5 rounded-full text-gray-50 bg-black" onClick={handleCreateWithdraw}>Ok</button>
                        </div>

                    </div>
                </div>
            }

        </>
    )
}