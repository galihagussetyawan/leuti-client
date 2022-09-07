import { useContext, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import ProductService from "../../../services/product.service";

import LocalCurrency from "../../../lib/helpers/local-currency.help";

const Toast = dynamic(() => import('../../../components/commons/toast.component'));

import DashboardContext from "../../../lib/context/dashboard.context";
import Popover from "../../commons/popover.component";

const imageLoader = ({ src }) => {
    return `${process.env.API_HOST}/api/image?img=${src}`;
}

export default function ProductListMenu() {

    const { productList } = useContext(DashboardContext);
    const router = useRouter();

    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    });

    const handleRemoveProduct = (id) => {

        ProductService.deleteProductById(id)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        router.replace(router.asPath);

                        setNotification({
                            isOpen: true,
                            status: 'success',
                            message: res?.data?.data?.message,
                        })

                    });
            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.error_message,
                })

            })
    }

    const handleEditProduct = (productid) => {
        return () => {

            router.push({
                query: {
                    tab: 'edit-product',
                    productid
                },
            })
        }
    }

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))

    }

    const actionProduct = (id) => {

        return (
            <ul className="md:grid md:grid-cols-1 md:gap-2 md:divide-y">
                <li className="py-1 md:hover:text-gray-400" onClick={handleEditProduct(id)}>Edit</li>
                <li className="py-1 md:hover:text-gray-400">Remove</li>
            </ul>
        );
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
            <div className="md:min-h-screen md:space-y-10 md:px-5">
                <p className="md:border-b md:border-gray-300">PRODUCT LIST</p>
                <div className="md:bg-white md:border md:border-gray-200">
                    <table className="md:w-full table-auto md:text-left">
                        <thead className=" text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="md:w-2/5 py-3 px-6">product info</th>
                                <th scope="col" className="py-3 px-6">createdat</th>
                                <th scope="col" className="py-3 px-6">updatedat</th>
                                <th scope="col" className="py-3 px-6">price</th>
                                <th scope="col" className="py-3 px-6">stock</th>
                                <th scope="col" className="py-3 px-6">status</th>
                                <th scope="col" className="py-3 px-6">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="col" className="py-3 px-6 md:flex md:space-x-3">
                                                <div className="md:min-w-[80px] md:min-h-[100px] md:relative bg-gray-200">
                                                    <Image
                                                        loading='lazy'
                                                        loader={imageLoader}
                                                        layout={'fill'}
                                                        objectFit={'cover'}
                                                        src={data?.images[0]?.name}
                                                    />
                                                </div>
                                                <div className="md:flex md:flex-col md:justify-center md:space-y-1">
                                                    <span className="md:font-semibold">{data?.name}</span>
                                                    <p className=" md:text-gray-500">{data?.description}</p>
                                                </div>
                                            </td>
                                            <td scope="col" className="py-3 px-6">{convertDate(data?.createdAt)}</td>
                                            <td scope="col" className="py-3 px-6">{convertDate(data?.updatedAt)}</td>
                                            <td scope="col" className="py-3 px-6">{LocalCurrency(data?.price)}</td>
                                            <td scope="col" className="py-3 px-6">{data?.stock}</td>
                                            <td scope="col" className="py-3 px-6">{data?.status ? 'ACTIVE' : 'HIDDEN'}</td>
                                            <td scope="col" className="py-3 px-6 md:relative">
                                                <Popover>
                                                    {actionProduct(data?.id)}
                                                </Popover>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {notification?.isOpen && <Toast isOpen={notification?.isOpen} status={notification?.status} message={notification?.message} closeAction={handleToggleNotification} />}
        </>
    );
}