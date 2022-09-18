import { useContext } from "react"
import OrderContext from "../../lib/context/order.context"
import LocalCurrency from "../../lib/helpers/local-currency.help";

export default function InvoiceOrder() {

    const { order } = useContext(OrderContext);

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'medium',
        })
    }

    const messageStatusOrder = () => {

        if (order?.status === 'unpaid') {
            return 'Thank you. Your order has been received.';
        }

        if (order?.status === 'approve') {
            return (
                <div className=" flex flex-col">
                    <span>Terimakasi telah melakukan transaksi.</span>
                    <span>Selamat point kamu sekarang bertambah.</span>
                </div>
            )
        }
    }

    return (
        <>
            <div className="md:w-4/5 flex flex-col px-5 md:space-y-10 py-10 m-auto">

                <div className=" w-full py-8 px-5 bg-black text-white">
                    {/* <p>Thank you. Your order has been received.</p> */}
                    {messageStatusOrder()}
                </div>

                <div className="grid md:grid-cols-4 border">
                    <div className=" flex flex-col md:py-10 py-5 px-5 space-y-2">
                        <span className="uppercase font-light">order id</span>
                        <span className="md:text-xl">{order?.id}</span>
                    </div>

                    <div className=" flex flex-col md:py-10 py-5 px-5 space-y-2">
                        <span className="uppercase font-light">date</span>
                        <span className="md:text-xl">{convertDate(order?.createdAt)}</span>
                    </div>

                    <div className=" flex flex-col md:py-10 py-5 px-5 space-y-2">
                        <span className="uppercase font-light">total</span>
                        <span className="md:text-xl">{LocalCurrency(order?.amount)}</span>
                    </div>

                    <div className=" flex flex-col md:py-10 py-5 px-5 space-y-2">
                        <span className="uppercase font-light">payment method</span>
                        <span className="md:text-xl">Direct transfer bank</span>
                    </div>
                </div>

                {/* order detail section */}
                <div className="mt-10 md:mt-20 space-y-5">
                    <span className="text-lg md:text-2xl font-semibold">Order Details</span>

                    <div className="border">

                        <div className="grid grid-cols-2 md:text-lg font-semibold px-5 py-5 border-b">
                            <span>Product</span>
                            <span className=" text-center">Total</span>
                        </div>

                        <div className="divide-y">

                            {
                                order?.carts?.map((cart, index) => {
                                    return (
                                        <div key={index} className="grid grid-cols-2 divide-x">
                                            <div className="flex flex-col p-5">
                                                <div>{cart?.product?.name}</div>
                                                <span>{cart?.quantity} item</span>
                                                <span>{LocalCurrency(cart?.product?.price)}</span>
                                            </div>
                                            <div className="flex justify-center items-center">{LocalCurrency(cart?.amount)}</div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className=" grid grid-cols-2 divide-x border-t md:text-lg font-semibold">
                            <span className=" py-5 text-center">Subtotal:</span>
                            <span className=" py-5 text-center">{LocalCurrency(order?.carts?.map(data => data?.amount).reduce((prev, next) => prev + next))}</span>
                        </div>

                        <div className=" grid grid-cols-2 divide-x border-t md:text-lg font-semibold">
                            <span className=" py-5 text-center">Payment method:</span>
                            <span className=" py-5 text-center">Direct bank transfer</span>
                        </div>

                        <div className=" grid grid-cols-2 divide-x border-t md:text-lg font-semibold">
                            <span className=" py-5 text-center">Total:</span>
                            <span className=" py-5 text-center text-green-700">{LocalCurrency(order?.amount)}</span>
                        </div>

                    </div>

                </div>
                {/* end of orer details */}

            </div>
        </>
    )
}