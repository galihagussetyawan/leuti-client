import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react"
import UserContext from "../../../lib/context/user.context"
import LocalCurrency from "../../../lib/helpers/local-currency.help"

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function OrderListMenu() {

    const router = useRouter();

    const { orderList } = useContext(UserContext);

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

    return (
        <div className="md:w-full md:space-y-20 space-y-7">
            <span className="md:text-2xl">Order List</span>

            <div className="w-full relative overflow-x-auto">
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
                                                    data?.carts.map((cart, index) => {
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
        </div>
    )
}