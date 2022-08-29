import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";

import LocalCurrency from "../../../lib/helpers/local-currency.help";
import DashboardContext from "../../../lib/context/dashboard.context";
import OrderService from "../../../services/order.service";

export default function OverviewMenu() {

    const router = useRouter();
    const { pointList, userList, ordersAllList } = useContext(DashboardContext);

    //function service order
    const handleApproveOrder = (id) => {

        return () => {

            OrderService.approveOrder(id)
                .then(res => {

                    router.replace(router.asPath)
                        .then(() => router.replace(router.asPath));
                })
                .catch(err => console.log(err.response.data))
        }
    }

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'medium',
            timeStyle: 'long',
        })
    }

    const pointTextStyle = (index) => {

        if (index === 0) return 'md:bg-yellow-500 md:text-white';

        if (index === 1) return 'md:bg-gray-300 md:text-white';

        if (index === 2) return 'md:bg-orange-900 md:text-white'

        return 'md:text-gray-400'
    }

    const orderStatusTextColor = (status) => {

        if (status === 'created') {
            return 'text-green-500';
        }

        if (status === 'unpaid') {
            return 'text-orange-500';
        }
    }

    const actionOrder = (status, id) => {

        if (status === 'unpaid') {
            return (
                <div className=" grid grid-cols-1 gap-2">
                    <button className=" uppercase bg-green-500 p-3 text-white" onClick={handleApproveOrder(id)}>Approve</button>
                    <button className=" uppercase bg-red-500 p-3 text-white">Cancel</button>
                </div>
            )
        }
    }

    return (
        <div className="md:w-full md:min-h-screen md:flex md:space-x-5">

            {/* left component/section */}
            <div className="md:w-full md:space-y-40">

                {/* overview dashboard */}
                <div className="md:space-y-10">
                    <p className="md:w-full md:border-b md:border-gray-300">OVERVIEW DASHBOARD</p>
                    <div className="md:grid md:grid-cols-3 md:gap-5">
                        <div className="md:h-52 md:flex md:flex-col md:justify-center md:px-10 md:border md:bg-white">
                            <span className="md:text-gray-500">PRODUCT SOLD</span>
                            <span className="md:text-4xl">53</span>
                        </div>
                        <div className="md:h-52 md:flex md:flex-col md:justify-center md:px-10 md:border md:bg-white">
                            <span className="md:text-gray-500">TOTAL AGENTS</span>
                            <span className="md:text-4xl">{userList?.total}</span>
                        </div>
                        <div className="md:h-52 md:flex md:flex-col md:justify-center md:px-10 md:border md:bg-white">
                            <span className="md:text-gray-500">TOTAL TRANSACTION</span>
                            <span className="md:text-4xl">Rp32.000.000</span>
                        </div>
                    </div>
                </div>
                {/* end of overview dashboard */}

                {/* new orders section */}
                <div className="md:space-y-10">
                    <p className="md:border-b md:border-gray-300">NEW ORDERS</p>
                    <div className="md:overflow-auto">
                        <table className="w-full text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        ORDER DATE
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        ORDER ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        AGENT
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        ITEMS
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        STATUS
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        TOTAL
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ordersAllList?.map((data, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b text-gray-700">
                                                <td className="py-8 px-6">{convertDate(data?.createdAt)}</td>
                                                <td className="py-8 px-6">{data?.id}</td>
                                                <td className="py-8 px-6">{data?.user?.username}</td>
                                                <td className="py-8 px-6">{data?.carts.map(data => data?.quantity).reduce((prev, next) => prev + next)} Items</td>
                                                <td className={`py-8 px-6 uppercase font-semibold ${orderStatusTextColor(data?.status)}`}>{data?.status}</td>
                                                <td className="py-8 px-6">{LocalCurrency(data?.amount)}</td>
                                                <td className="py-8 px-6">
                                                    {/* <button>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button> */}
                                                    {actionOrder(data?.status, data?.id)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* end of new orders section */}

            </div>
            {/* end of left component/section */}

            {/* ----------------------------------------------------------------------------------------------------------------------- */}
            {/* right component/section */}
            <div className="md:w-2/5 md:h-96 md:space-y-40">

                {/* quick link section */}
                <div className="md:space-y-10">
                    <p className="md:border-b md:border-gray-300">QUICK LINKS</p>
                    <div className="md:w-full md:space-y-5">
                        <button className="md:w-full md:py-5 md:border md:hover:text-gray-500 md:bg-white">Create New Product</button>
                        <Link href={{ query: { tab: 'product-list' } }}>
                            <button className="md:w-full md:py-5 md:border md:hover:text-gray-500 md:bg-white">Go To Product List</button>
                        </Link>
                        <button className="md:w-full md:py-5 md:border md:hover:text-gray-500 md:bg-white">Go To Agent List</button>
                    </div>
                </div>
                {/* end of quick link section */}

                {/* leaderboards section */}
                <div className="md:space-y-10">
                    <p className="md:border-b md:border-gray-300">LEADERBOARD</p>
                    <div className="md:space-y-5 md:bg-white p-7">
                        {
                            pointList?.map((data, index) => {
                                return (
                                    <div key={index} className="md:flex md:justify-between md:items-center">
                                        <div className="md:flex md:items-center md:space-x-5">
                                            <div className={`md:w-20 md:h-20 md:flex md:justify-center md:items-center md:font-semibold md:text-4xl ${pointTextStyle(index)}`}>{index + 1}</div>
                                            <div className="md:flex md:flex-col">
                                                <span className="md:text-lg">{data?.username}</span>
                                                <span className="md:text-gray-500">JOIN: {convertDate(data?.join)}</span>
                                            </div>
                                        </div>
                                        <div className="md:flex md:space-x-5">
                                            <span className="md:text-yellow-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span className="md:text-xl md:font-semibold">{data?.point}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* end of leaderboard section */}

            </div>
            {/* end of right component/section */}

        </div>
    );
}