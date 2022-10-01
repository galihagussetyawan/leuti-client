import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react"
import UserContext from "../../../lib/context/user.context"
import LocalCurrency from "../../../lib/helpers/local-currency.help"
import PopoverBottom from "../../commons/popover-bottom.component";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function OrderListMenu() {

    const router = useRouter();

    const { orderList } = useContext(UserContext);

    const [showPopoverDetailOrder, setShowPopoverDetailOrder] = useState({
        isOpen: false,
        data: null,
    })

    const statusTextColor = (status) => {

        if (status === 'created') {
            return 'text-blue-500';
        }

        if (status === 'unpaid' || status === 'in-packaging' || status === 'in-shipping') {
            return 'text-orange-500';
        }

        if (status === 'approve' || status === 'completed') {
            return 'text-green-500';
        }

        if (status === 'canceled') {
            return 'text-red-500';
        }

    }

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate?.toLocaleString('id', {
            dateStyle: 'medium',
        })
    }

    const handleNavigate = (url) => {

        return () => router.push(url);
    }

    const handleToggleShowPopover = (data) => {
        return () => {

            if (showPopoverDetailOrder?.isOpen) {
                setShowPopoverDetailOrder({
                    isOpen: false,
                    data: null,
                })
            } else {
                setShowPopoverDetailOrder({
                    isOpen: true,
                    data: data,
                })
            }
        }
    }

    return (
        <>

            <div className="md:w-full md:space-y-20 space-y-7">
                <span className="hidden md:block md:text-2xl">Order List</span>

                {/* dekstop version order list */}
                <div className="hidden w-full md:block">
                    <table className="w-full text-left">
                        <thead className=" uppercase bg-gray-100 text-gray-400">
                            <tr>
                                <th className="py-3 px-3">order id</th>
                                <th className="py-3 px-3">created</th>
                                <th className="py-3 px-3">items</th>
                                <th className="py-3 px-3">status</th>
                                <th className="py-3 px-3">detail</th>
                                <th className="py-3 px-3">total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList?.map((data, index) => {
                                    return (
                                        <tr key={index}
                                            className="border-b md:hover:cursor-pointer md:hover:text-gray-600"
                                            onClick={handleNavigate({
                                                pathname: '/order/[orderid]',
                                                query: {
                                                    orderid: data?.id,
                                                }
                                            })}>
                                            <td className="py-10 px-3">{data?.id}</td>
                                            <td className="py-10 px-3">{convertDate(data?.createdAt)}</td>
                                            <td className="py-10 px-3">{data?.carts?.map(data => data?.quantity).reduce((prev, next) => prev + next)} items</td>
                                            <td className={`py-10 px-3 uppercase font-extrabold ${statusTextColor(data?.status)}`}>{data?.status}</td>
                                            <td className="py-10 px-3">
                                                <ul>
                                                    {
                                                        data?.carts?.map((cart, index) => {
                                                            return (
                                                                <li key={index} className="flex items-center space-x-3">
                                                                    <div className=" min-w-[50px] min-h-[50px] relative bg-gray-100">
                                                                        <Image
                                                                            loader={imageLoader}
                                                                            src={cart?.product?.images[0]?.name}
                                                                            layout={'fill'}
                                                                            objectFit={'cover'}
                                                                        />
                                                                    </div>
                                                                    <div className=" flex flex-col">
                                                                        <p>{cart?.product?.name}</p>
                                                                        <span className="text-gray-500">{cart?.quantity} items</span>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </td>
                                            <td className="py-10 px-3">{LocalCurrency(data?.amount)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* dekstop version order list */}

                {/* mobile version order list */}
                <div className="md:hidden max-w-full flex flex-col divide-y">
                    <div className="w-full grid grid-cols-[25%_30%_30%_15%] py-5 text-gray-500">
                        <span>ID</span>
                        <span>CREATED</span>
                        <span>TOTAL</span>
                        <span className=" text-center">DETAIl</span>
                    </div>

                    {
                        orderList?.map((data, index) => {
                            return (
                                <div key={index} className="w-full grid grid-cols-[25%_30%_30%_15%] py-5 font-semibold">
                                    <span>{data?.id}</span>
                                    <span>{convertDate(data?.createdAt)}</span>
                                    <span>{LocalCurrency(data?.amount)}</span>
                                    <button className="m-auto text-gray-500" onClick={handleToggleShowPopover(data)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div >
            {/* end of mobile version order list */}

            <PopoverBottom
                open={showPopoverDetailOrder?.isOpen}
                toggle={handleToggleShowPopover}
            >
                <div className="w-full h-full flex flex-col divide-y items-center px-10 mt-10">

                    <div className="w-full flex justify-between py-5 font-semibold">
                        <span>Id</span>
                        <span>{showPopoverDetailOrder?.data?.id}</span>
                    </div>

                    <div className="w-full flex justify-between py-5 font-semibold">
                        <span>Status</span>
                        <span className=" uppercase">{showPopoverDetailOrder?.data?.status}</span>
                    </div>

                    <div className="w-full flex justify-between py-5 font-semibold">
                        {
                            showPopoverDetailOrder?.data?.carts?.map((data, index) => {
                                return (
                                    <div key={index} className="w-full flex justify-between">
                                        <span className="flex items-center">Item{index + 1}</span>

                                        <div className="flex flex-col">

                                            <div className="flex">
                                                <div className="min-w-[50px] min-h-[60px] max-w-[50px] max-h-[60px] relative bg-gray-300">
                                                    <Image
                                                        loading={'lazy'}
                                                        loader={imageLoader}
                                                        src={data?.product?.images[0]?.name}
                                                        layout={'fill'}
                                                        objectFit={'cover'}
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center pl-3">
                                                    <span>{data?.product?.name}</span>
                                                    <span>{LocalCurrency(data?.product?.price)}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between font-normal text-gray-500">
                                                <span>Quantity</span>
                                                <span>{data?.quantity} items</span>
                                            </div>

                                            <div className="flex justify-between font-normal text-gray-500">
                                                <span>Subtotal</span>
                                                <span>{LocalCurrency(data?.amount)}</span>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="w-full flex justify-between py-5 font-semibold">
                        <span>Total</span>
                        <span>{LocalCurrency(showPopoverDetailOrder?.data?.amount)}</span>
                    </div>

                    <button className="w-full py-5 uppercase rounded-full text-white bg-black mt-10"
                        onClick={handleNavigate({
                            pathname: '/order/[orderid]',
                            query: {
                                orderid: showPopoverDetailOrder?.data?.id,
                            }
                        })}
                    >View Order</button>

                </div>
            </PopoverBottom>

        </>
    )
}