import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";

import OrderContext from "../../lib/context/order.context";
import OrderService from "../../services/order.service";

const Toast = dynamic(() => import('../commons/toast.component'));
import LocalCurrency from "../../lib/helpers/local-currency.help";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function ShippingAddressPaymentOrder() {

    const router = useRouter();
    const { order } = useContext(OrderContext);

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error'
    })

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [country, setCountry] = useState();
    const [province, setProvince] = useState();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [village, setVillage] = useState();
    const [postalCode, setPostalCode] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const handleChangeName = event => {
        setName(event?.target?.value);
    }

    const handleChangeAddress = event => {
        setAddress(event?.target?.value);
    }

    const handleChangeCountry = event => {
        setCountry(event?.target?.value);
    }

    const handleChangeProvince = event => {
        setProvince(event?.target?.value);
    }

    const handleChangeCity = event => {
        setCity(event?.target?.value);
    }

    const handleChangeDistrict = event => {
        setDistrict(event.target.value);
    }

    const handleChangeVillage = event => {
        setVillage(event?.target?.value);
    }

    const handleChangePostalCode = event => {
        setPostalCode(event?.target?.value);
    }

    const handleChangeEmail = event => {
        setEmail(event?.target?.value);
    }

    const handleChangePhone = event => {
        setPhone(event?.target?.value);
    }

    const handlePlaceOrder = () => {
        setIsLoading(true);

        if (!name || !address || !country || !province || !city || !district || !village || !postalCode || !email || !phone) {
            sendEmailOrderCreated
            setNotification({
                isOpen: true,
                status: 'error',
                message: 'alamat tidak boleh kosong',
            })

            setIsLoading(false);
            return;
        }

        OrderService.addShippingAddressOrder(order?.id, name, address, country, province, city, district, village, postalCode, email, phone)
            .then(res => {

                router.replace(router.asPath);
            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.error_message,
                })
            })
            .finally(() => setIsLoading(false));
    }

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))

    }

    return (
        <>

            <div className="md:w-4/5 flex flex-col px-5 md:flex-row md:space-x-40 py-10 m-auto">

                {/* left section/shipping address */}
                <div className="md:w-1/2 w-full space-y-10">
                    <span className="text-xl font-semibold md:text-4xl md:font-semibold">Shipping Detail</span>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Name</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeName} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Address</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeAddress} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Country</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeCountry} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Province</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeProvince} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">City</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeCity} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">District</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeDistrict} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Village</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeVillage} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Postcode</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangePostalCode} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Email</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangeEmail} />
                        </div>
                    </div>

                    <div>
                        <div className="w-full flex flex-col px-4 py-2 border border-gray-300">
                            <span className="text-sm text-gray-700">Phone</span>
                            <input className="outline-none text-lg font-semibold" onChange={handleChangePhone} />
                        </div>
                    </div>

                </div>
                {/* end of left section */}

                {/* right section */}
                <div className="md:w-1/2 space-y-10 mt-20 md:m-0">
                    <span className="text-xl font-semibold md:text-4xl md:font-semibold">Your Order</span>

                    <div className="space-y-5">
                        <span className="text-lg uppercase">product</span>
                        {
                            order?.carts?.map((cart, index) => {
                                return (
                                    <div key={index} className="flex items-center">
                                        <div className=" min-w-[50px] min-h-[60px] md:min-w-[100px] md:min-h-[130px] relative bg-gray-300">
                                            <Image
                                                loader={imageLoader}
                                                src={cart?.product?.images[0]?.name}
                                                layout={'fill'}
                                                objectFit={'cover'}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col justify-center px-5">
                                            <span className="md:text-lg font-semibold">{cart?.product?.name}</span>
                                            <span>{LocalCurrency(cart?.product?.price)}</span>
                                            <span>{cart?.quantity} items</span>
                                        </div>
                                        <div className="w-full flex flex-col text-end md:space-y-3">
                                            <span className="font-semibold">{LocalCurrency(cart?.amount)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div>
                        <div className="flex justify-between py-10 font-semibold border-y">
                            <span>SUBTOTAL</span>
                            <span>{LocalCurrency(order.carts.map(data => data.amount).reduce((prev, next) => prev + next))}</span>
                        </div>
                        <div className="flex justify-between text-2xl py-10 font-semibold border-y">
                            <span>TOTAL</span>
                            <span>{LocalCurrency(order?.amount)}</span>
                        </div>
                    </div>

                    <div className="md:py-10 md:space-y-5">
                        <span className="text-lg uppercase">Payment</span>

                        <div className="flex space-x-5">
                            <div className="h-8 flex items-center">
                                <input type={'radio'} className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="h-8 flex items-center">Direct bank transfer</p>
                                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                        </div>

                        {/* <div className="flex space-x-5">
                            <div className="h-8 flex items-center">
                                <input type={'radio'} className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="h-8 flex items-center">Direct bank transfer</p>
                                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                        </div> */}

                    </div>

                    <div className=" space-y-10">
                        <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy
                        </p>
                        <button className="w-full py-5 text-white rounded-full bg-black" disabled={isLoading} onClick={handlePlaceOrder}>
                            {
                                isLoading ?
                                    <span>
                                        <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Loading...
                                    </span>
                                    :
                                    <span>PLACE ORDER</span>
                            }
                        </button>
                    </div>

                </div>
                {/* end right section */}
            </div>

            {notification?.isOpen && <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />}
        </>
    );
}