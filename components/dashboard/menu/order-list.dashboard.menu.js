import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"

import DashboardContext from "../../../lib/context/dashboard.context"
import LocalCurrency from "../../../lib/helpers/local-currency.help";
import OrderService from "../../../services/order.service";

import Popover from "../../commons/popover.component";
import ModalDashboard from "../../dashboard/modal.dashboard";

export default function OrderListMenu() {

    const router = useRouter();
    const { tab } = router.query;

    const { ordersAllList } = useContext(DashboardContext);

    const [modal, setModal] = useState({
        isOpen: false,
        action: null,
        id: null,
    });
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState();

    //search--------------------------------------------------------------------
    useEffect(() => {

        if (search === "") {
            setIsSearch(false);
            return;
        }

    }, [search, isSearch])

    const handleChangeSearch = event => {
        setSearch(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        setIsSearch(true);

        OrderService.searchOrders(search, tab)
            .then(res => setSearchData(res?.data?.data))
            .catch(err => console.log(err?.response))
    }

    const handleKeyDown = event => {

        if (event.key === 'Enter') {

            setIsSearch(true);

            OrderService.searchOrders(search, tab)
                .then(res => setSearchData(res?.data?.data))
                .catch(err => console.log(err?.response))
        }

    };
    // end or search-------------------------------------------------------------------

    //handle action order
    const handleApproveOrder = () => {

        OrderService.approveOrder(modal?.id)
            .then(res => {
                console.log(res.data.data);
            })
            .catch(err => console.log(err.response))
            .finally(() => {

                setModal(prevState => ({
                    ...prevState,
                    isOpen: false,
                }))

            })
    }

    const handleCancelOrder = () => {

        OrderService.cancelOrderById(modal?.id)
            .then(res => {
                console.log(res.data.data);
            })
            .catch(err => console.log(err?.response))
            .finally(() => {

                setModal(prevState => ({
                    ...prevState,
                    isOpen: false,
                }))

            })
    }

    const handleUpdateStatusInPackaging = () => {

        OrderService.updateStatusOrderInPackagingById(modal?.id)
            .then(res => {
                console.log(res.data.data);
            })
            .catch(err => console.log(err.response))
            .finally(() => {

                setModal(prevState => ({
                    ...prevState,
                    isOpen: false,
                }))

            })
    }

    const handleUpdateStatusInShipping = () => {

        OrderService.updateStatusOrderInShippingById(modal?.id)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err.response))
            .finally(() => {

                setModal(prevState => ({
                    ...prevState,
                    isOpen: false,
                }))

            })
    }

    const handleCompleteOrder = () => {

        OrderService.completeOrderById(modal?.id)
            .then(res => {
                console.log(res.data.data);
            })
            .catch(err => console.log(err?.response))
            .finally(() => {

                setModal(prevState => ({
                    ...prevState,
                    isOpen: false,
                }))

            })
    }

    // ------------------------------------------------------------------------------

    const handleActionButtonStatus = (action, id) => {

        return () => setModal({
            isOpen: true,
            action,
            id,
        })
    }

    const handleCloseModal = () => {

        setModal(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    const actionOrder = (status, id) => {

        if (status === 'created') {
            return (
                <div className="grid grid-cols-1">
                    <button className=" uppercase bg-orange-500 py-5 text-white">waiting</button>
                </div>
            )
        }

        if (status === 'unpaid') {
            return (
                <div className=" grid grid-cols-1 gap-2">
                    <button className=" uppercase bg-green-500 py-5 text-white" onClick={handleActionButtonStatus('approve', id)}>Approve</button>
                    <button className=" uppercase bg-red-500 py-5 text-white" onClick={handleActionButtonStatus('cancel', id)}>Cancel</button>
                </div>
            )
        }

        if (status === 'approve') {
            return (
                <div className=" grid grid-cols-1 gap-2">
                    <button className=" uppercase bg-green-500 py-5 text-white" onClick={handleActionButtonStatus('in-packaging', id)}>in-packaging</button>
                    {/* <button className=" uppercase bg-red-500 py-5 text-white">Cancel</button> */}
                </div>
            )
        }

        if (status === 'in-packaging') {
            return (
                <div className=" grid grid-cols-1 gap-2">
                    <button className=" uppercase bg-green-500 py-5 text-white" onClick={handleActionButtonStatus('in-shipping', id)}>in-shipping</button>
                </div>
            )
        }

        if (status === 'in-shipping') {
            return (
                <div className=" grid grid-cols-1 gap-2">
                    <button className=" uppercase bg-green-500 py-5 text-white" onClick={handleActionButtonStatus('completed', id)}>completed</button>
                </div>
            )
        }
    }

    const statusTextColor = (status) => {

        if (status === 'created') {
            return 'text-blue-500';
        }

        if (status === 'unpaid' || status === 'in-shipping' || status === 'in-packaging') {
            return 'text-orange-500';
        }

        if (status === 'approve' || status === 'completed') {
            return 'text-green-500';
        }

        if (status === 'canceled') {
            return 'text-red-500';
        }
    }


    const modalActionByStatus = () => {

        if (modal?.action === 'approve') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Apakah kamu menyetujui pesanan dengan id#{modal?.id} ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleApproveOrder}>Ok</button>
                    </div>
                </div>
            )
        }

        if (modal?.action === 'in-packaging') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Update status In-Packaging order id #{modal?.id} ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleUpdateStatusInPackaging}>Ok</button>
                    </div>
                </div>
            )
        }

        if (modal?.action === 'in-shipping') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Update status In-Shipping order id #{modal?.id} ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleUpdateStatusInShipping}>Ok</button>
                    </div>
                </div>
            )
        }

        if (modal?.action === 'completed') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Completed order id #{modal?.id} ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase rounded-full text-white bg-black" onClick={handleCompleteOrder}>Ok</button>
                    </div>
                </div>
            )
        }

        if (modal?.action === 'cancel') {
            return (
                <div className=" space-y-10 text-center">
                    <p className=" md:text-2xl md:font-semibold">Action Required!</p>
                    <p>Apakah kamu membatalkan pesanan order id #{modal?.id} ?</p>
                    <div className="flex justify-between space-x-10">
                        <button className="w-full py-5 uppercase rounded-full bg-black text-white" onClick={handleCloseModal}>Cancel</button>
                        <button className="w-full py-5 uppercase border border-gray-300 md:hover:text-gray-700 md:hover:border-gray-400 text-gray-500 rounded-full" onClick={handleCancelOrder}>Ok</button>
                    </div>
                </div>
            )
        }
    }

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'medium',
            timeStyle: 'long',
        })
    }

    return (
        <>

            <div className="md:w-full md:min-h-screen md:space-y-10 md:h-96 md:px-5">
                <p className="md:border-b md:border-gray-300">ORDERS LIST</p>

                <div className="md:space-y-5 md:bg-white">

                    {/* search field */}
                    <div className="md:w-1/3 md:p-5">
                        <div className="md:flex md:border md:border-gray-400 px-4 py-2">
                            <div className="md:w-full md:flex md:flex-col">
                                <span className="text-sm text-gray-700">ID ORDER</span>
                                <input placeholder="search order by id" className="outline-none text-lg font-semibold" onChange={handleChangeSearch} onKeyDown={handleKeyDown} />
                            </div>
                            <button className="md:text-gray-400 md:hover:text-gray-600" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* end of search field */}

                    <table className="md:w-full md:text-left">
                        <thead className="uppercase text-xs text-gray-500">
                            <tr>
                                <th className=" px-5 py-3">create</th>
                                <th className=" px-5 py-3">order id</th>
                                <th className=" px-5 py-3">agent</th>
                                <th className=" px-5 py-3">items</th>
                                <th className=" px-5 py-3">products</th>
                                <th className=" px-5 py-3">status</th>
                                <th className=" px-5 py-3">shipping</th>
                                <th className=" px-5 py-3">total</th>
                                <th className=" px-5 py-3">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (isSearch ? searchData : ordersAllList)?.map((data, index) => {
                                    return (
                                        <tr key={index} className=" border-b">
                                            <td className=" max-w-[100px] px-5 py-3">{convertDate(data?.createdAt)}</td>
                                            <td className=" max-w-[100px] px-5 py-3">{data?.id}</td>
                                            <td className=" px-5 py-3">{data?.user?.username}</td>
                                            <td className=" px-5 py-3">{data.carts.map(data => data.quantity).reduce((prev, next) => prev + next)} item</td>
                                            <td className=" max-w-[200px] px-5 py-3">
                                                {
                                                    data?.carts?.map((cart, index) => {
                                                        return (
                                                            <div key={index} className="grid grid-cols-2">
                                                                <div className="grid grid-cols-1">
                                                                    <span className=" capitalize">{cart?.product?.name}</span>
                                                                    <span>{LocalCurrency(cart?.product?.price)}</span>
                                                                    <span>{cart?.quantity} items</span>
                                                                </div>
                                                                <p className=" w-full m-auto text-end">{LocalCurrency(cart?.amount)}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className={`px-5 py-3 uppercase font-bold ${statusTextColor(data?.status)}`}>{data?.status}</td>
                                            <td className="px-5 py-3 md:relative">
                                                {
                                                    data?.shipping &&
                                                    <Popover title={'View Shipping Address'} position={'bottom'}>
                                                        <div className="grid grid-cols-1 gap-2 py-2 px-5">
                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">shipping name</span>
                                                                <span className=" capitalize">{data?.shipping?.name}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">address</span>
                                                                <span>{data?.shipping?.address}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className=" font-light capitalize">country</span>
                                                                <span>{data?.shipping?.country}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className=" font-light capitalize">province</span>
                                                                <span className=" capitalize">{data?.shipping?.province}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">city</span>
                                                                <span className=" capitalize">{data?.shipping?.city}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">district</span>
                                                                <span className=" capitalize">{data?.shipping?.district}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">village</span>
                                                                <span className=" capitalize">{data?.shipping?.village}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">postal code</span>
                                                                <span className=" capitalize">{data?.shipping?.postalCode}</span>
                                                            </div>

                                                            <div className="grid grid-cols-2">
                                                                <span className="font-light capitalize">phone</span>
                                                                <span className=" capitalize">{data?.shipping?.phone}</span>
                                                            </div>

                                                        </div>
                                                    </Popover>
                                                }
                                            </td>
                                            <td className="px-5 py-3">{LocalCurrency(data?.amount)}</td>
                                            {
                                                data?.status !== 'completed' &&
                                                <td className="px-5 py-3 md:relative">
                                                    <div className=" flex justify-center">
                                                        <Popover>
                                                            {actionOrder(data?.status, data?.id)}
                                                        </Popover>
                                                    </div>
                                                </td>
                                            }
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
                    <div className=" md:max-w-[350px]">
                        {modalActionByStatus()}
                    </div>
                </ModalDashboard>
            }
        </>
    )
}