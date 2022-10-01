import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Toast from '../../../components/commons/toast.component';

import ImageService from "../../../services/image.service";
import ProductService from "../../../services/product.service";
import DashboardContext from "../../../lib/context/dashboard.context";
import LocalCurrency from "../../../lib/helpers/local-currency.help";
import DiscountService from "../../../services/discount.service";
import { data } from "autoprefixer";

export default function CreateProductMenu() {

    const router = useRouter();
    const { tab, productid } = router?.query;

    const { product } = useContext(DashboardContext);

    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        'message': 'error'
    })

    const [productId, setProductId] = useState(product?.id);
    const [imagesArray, setImagesArray] = useState([]);
    const [images, setImages] = useState(null);
    const [name, setName] = useState(product?.name);
    const [category, setCategory] = useState(product?.category);
    const [description, setDescription] = useState(product?.description);
    const [advantage, setAdvantage] = useState(product?.advantage);
    const [application, setApplication] = useState(product?.application);
    const [ingredient, setIngredient] = useState(product?.ingredient);
    const [price, setPrice] = useState(product?.price);
    const [stock, setStock] = useState(product?.stock);
    const [status, setStatus] = useState(product?.status);

    //discount state
    const [isAddDiscount, setIsAddDiscount] = useState(false);
    const [isEditDiscount, setIsEditDiscount] = useState(false);
    const [discountId, setDiscountId] = useState();
    const [minPurchase, setMinPurchase] = useState();
    const [bonusItem, setBonusItem] = useState();
    const [addOns, setAddOns] = useState();

    const handleChangeMultipleImage = event => {

        if (Array.from(event.target.files).length > 3) {
            setNotification({
                isOpen: true,
                status: 'error',
                message: 'You can only upload a maximum of 3 images'
            })
            return;
        }

        let object = [];
        let arr = [];

        object.push(event.target.files);

        for (let i = 0; i < object[0].length; i++) {
            arr.push(URL.createObjectURL(object[0][i]));
        }

        setImagesArray(arr);
        setImages(event.target.files);
    }

    const handleChangeName = event => {
        setName(event.target.value);
    }

    const handleChangeCategory = event => {
        setCategory(event.target.value);
    }

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    }

    const handleChangeAdvantage = event => {
        setAdvantage(event.target.value);
    }

    const handleChangeApplication = event => {
        setApplication(event.target.value);
    }

    const handleChangeIngredient = event => {
        setIngredient(event.target.value);
    }

    const handleChangePrice = event => {
        setPrice(event.target.value);
    }

    const handleChangeStock = event => {
        setStock(event.target.value);
    }

    const handleChangeStatus = event => {
        setStatus(event.target.checked);
    }

    const handleChangeMinimumPurchase = event => {
        setMinPurchase(event.target.value);
    }

    const handleChangeBonusItem = event => {
        setBonusItem(event.target.value);
    }

    const handleChangeAddOns = event => {
        setAddOns(event.target.value);
    }

    const handleCreateProduct = event => {
        event.preventDefault();

        if (!images) {

            setNotification({
                isOpen: true,
                status: 'error',
                message: "Kamu harus memasukkan gambar produk",
            })

            return;
        }

        ProductService.createProduct(name, category, description, advantage, application, ingredient, price, stock)
            .then(res => {

                ImageService.uploadImage(images, res.data.data.id)
                    .catch(err => {

                        setNotification({
                            isOpen: true,
                            status: 'error',
                            message: err?.response?.data?.message,
                        })
                    })
            })
            .catch(err => {

                setNotification({
                    isOpen: true,
                    status: 'error',
                    message: err?.response?.data?.message,
                })

            })
            .finally(() => {

                setNotification({
                    isOpen: true,
                    status: 'success',
                    message: 'produk berhasil ditambahkan',
                })
            })
    }

    const handleUpdateProduct = () => {

        ProductService.updateProductById(productId, name, category, description, advantage, application, ingredient, price, stock, status)
            .then(res => {

                router.replace(router?.asPath)
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

    const handleToggleNotification = () => {

        setNotification(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    const handleToggleEditDiscount = (id, quantity, item, addOns) => {

        return () => {
            setDiscountId(id);
            setMinPurchase(quantity);
            setBonusItem(item);
            setAddOns(addOns);
            setIsEditDiscount(true);
        }
    }

    const handleDiscardUpdateDiscount = () => {
        setIsEditDiscount(!isEditDiscount);
        setDiscountId();
        setMinPurchase();
        setBonusItem();
        setAddOns();
    }

    const handleToggleAddDiscount = () => {
        setIsAddDiscount(!isAddDiscount);
        setMinPurchase();
        setBonusItem();
        setAddOns();
    }

    const handleSaveUpdateDiscount = () => {

        DiscountService.updateDiscountById(discountId, minPurchase, bonusItem, addOns)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        setNotification({
                            isOpen: true,
                            status: 'success',
                            message: res?.data?.message,
                        })

                        handleDiscardUpdateDiscount();
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

    const handleAddDiscount = () => {

        DiscountService.addDiscountToProduct(productId, minPurchase, bonusItem, addOns)
            .then(res => {
                handleToggleAddDiscount();
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

    const handleDeleteDiscount = (id) => {

        return () => {

            DiscountService.deleteDiscountById(id)
                .then(res => {

                    router.replace(router.asPath)
                        .then(() => {

                            setNotification({
                                isOpen: true,
                                status: 'success',
                                message: res?.data?.message
                            })

                        })

                })
                .catch(err => {
                    router.replace(router.asPath);

                    setNotification({
                        isOpen: true,
                        status: 'error',
                        message: err?.response.data?.error_message,
                    })

                });
        }
    }

    return (
        <>
            <div className="md:min-h-screen md:space-y-10 md:px-5">
                <p className="md:border-b md:border-gray-300">CREATE PRODUCT</p>

                {/* product picture section */}
                <div className="md:flex md:space-x-20 md:py-20 md:px-6 md:border md:border-gray-200 md:bg-white ">
                    <div className="md:w-1/5 md:space-y-10">
                        <span>Product Photo</span>
                        <p className="md:text-gray-500">Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).</p>
                    </div>
                    <div className="md:w-full md:grid md:grid-cols-5 md:gap-5">
                        <label className={`md:aspect-square md:relative md:flex md:flex-col md:items-center md:justify-center md:text-center md:border-2 md:border-dashed md:hover:cursor-pointer ${notification.isOpen ? 'md:border-red-500' : 'md:border-gray-300'} md:text-gray-400`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Foto Utama</span>
                            <input className="hidden" type={'file'} multiple onChange={handleChangeMultipleImage} />
                            {
                                imagesArray[0] &&
                                <Image
                                    objectFit={'contain'}
                                    objectPosition='center'
                                    layout={'fill'}
                                    src={imagesArray[0]}
                                />
                            }
                        </label>
                        <label className={`md:aspect-square md:relative md:flex md:flex-col md:items-center md:justify-center md:text-center md:border-2 md:border-dashed md:hover:cursor-pointer ${notification.isOpen ? 'md:border-red-500' : 'md:border-gray-300'} md:text-gray-400`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Foto 2</span>
                            <input className="hidden" type={'file'} multiple onChange={handleChangeMultipleImage} />
                            {
                                imagesArray[1] &&
                                <Image
                                    objectFit={'contain'}
                                    objectPosition='center'
                                    layout={'fill'}
                                    src={imagesArray[1]}
                                />
                            }
                        </label>
                        <label className={`md:aspect-square md:relative md:flex md:flex-col md:items-center md:justify-center md:text-center md:border-2 md:border-dashed md:hover:cursor-pointer ${notification.isOpen ? 'md:border-red-500' : 'md:border-gray-300'} md:text-gray-400`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Foto 3</span>
                            <input className="hidden" type={'file'} multiple onChange={handleChangeMultipleImage} />
                            {
                                imagesArray[2] &&
                                <Image
                                    objectFit={'contain'}
                                    objectPosition='center'
                                    layout={'fill'}
                                    src={imagesArray[2]}
                                />
                            }
                        </label>
                    </div>
                </div>
                {/* end of product picture section */}

                {/* information product section */}
                <div className="md:flex md:flex-col md:space-y-10 md:py-20 md:border md:border-gray-200 md:bg-white">
                    <div className="md:w-full md:flex md:px-6 md:space-x-20">
                        <div className="md:w-1/5">
                            <span>Product Name</span>
                        </div>
                        <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm text-gray-700">Product Name</span>
                                <input className="outline-none text-lg font-semibold" onChange={handleChangeName} value={name} />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6 md:space-x-20">
                        <div className="md:w-1/5">
                            <span>Category</span>
                        </div>
                        <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm text-gray-700">Category</span>
                                <input className="outline-none text-lg font-semibold" value={category} onChange={handleChangeCategory} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* end of product information section */}

                {/* detail information section */}
                <div className="md:flex md:flex-col md:space-y-10 md:py-20 md:border md:border-gray-200 md:bg-white">

                    <div className="md:w-full md:flex md:px-6">
                        <div className="md:w-1/5">
                            <span>Deskripsi</span>
                        </div>
                        <div className="md:w-2/5 md:h-40">
                            <textarea className="md:w-full md:h-full md:resize-none md:outline-none md:p-3 md:border md:border-gray-300 md:focus-within:border-gray-400 text-lg font-semibold" value={description} onChange={handleChangeDescription} ></textarea>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6">
                        <div className="md:w-1/5">
                            <span>Kenunggulan</span>
                        </div>
                        <div className="md:w-2/5 md:h-40">
                            <textarea className="md:w-full md:h-full md:resize-none md:outline-none md:p-3 md:border md:border-gray-300 md:focus-within:border-gray-400 text-lg font-semibold" value={advantage} onChange={handleChangeAdvantage}></textarea>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6">
                        <div className="md:w-1/5">
                            <span>Pengaplikasian</span>
                        </div>
                        <div className="md:w-2/5 md:h-40">
                            <textarea className="md:w-full md:h-full md:resize-none md:outline-none md:p-3 md:border md:border-gray-300 md:focus-within:border-gray-400 text-lg font-semibold" value={application} onChange={handleChangeApplication}></textarea>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6">
                        <div className="md:w-1/5">
                            <span>Komposisi</span>
                        </div>
                        <div className="md:w-2/5 md:h-40">
                            <textarea className="md:w-full md:h-full md:resize-none md:outline-none md:p-3 md:border md:border-gray-300 md:focus-within:border-gray-400 text-lg font-semibold" value={ingredient} onChange={handleChangeIngredient}></textarea>
                        </div>
                    </div>

                </div>
                {/* end of detail information section */}

                {/* price section */}
                <div className="md:flex md:flex-col md:space-y-10 md:py-20 md:border md:border-gray-200 md:bg-white">

                    <div className="md:w-full md:flex md:px-6 md:space-x-20">
                        <div className="md:w-1/5">
                            <span>Status Produk</span>
                        </div>
                        <div className="md:w-full">
                            <label className="inline-flex relative items-center mb-4 cursor-pointer">
                                <input type="checkbox" value="" id="checked-toggle" className="sr-only peer" disabled={!productid ? true : false} defaultChecked={status} onChange={handleChangeStatus} />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{status ? 'Active' : 'Non-Active'}</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6 md:space-x-20">
                        <div className="md:w-1/5">
                            <span>Harga</span>
                        </div>
                        <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm text-gray-700">Harga</span>
                                <input className="outline-none text-lg font-semibold" value={price} type={'number'} onChange={handleChangePrice} />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-full md:flex md:px-6 md:space-x-20">
                        <div className="md:w-1/5">
                            <span>Stok</span>
                        </div>
                        <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                            <div className="flex flex-col px-4 py-2">
                                <span className="text-sm text-gray-700">Stok</span>
                                <input className="outline-none text-lg font-semibold" value={stock} type={'number'} onChange={handleChangeStock} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* end of price section */}

                {/* discount setcion */}
                {
                    tab === 'edit-product' &&
                    <div className="md:flex md:flex-col md:space-y-40 md:py-20 md:border md:border-gray-200 md:bg-white">

                        <div className="md:w-full md:flex md:px-6">
                            <div className="md:w-1/5">
                                <span>Add Discount</span>
                            </div>

                            {
                                isAddDiscount ?
                                    <div className="md:w-2/5 space-y-5">

                                        <div className="md:w-full md:flex md:space-x-20">
                                            <div className="md:w-1/5">
                                                <span>Min Pembelian</span>
                                            </div>
                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                <div className="flex flex-col px-4 py-2">
                                                    <span className="text-sm text-gray-700">Quantity</span>
                                                    <input className="outline-none text-lg font-semibold" type={'number'} onChange={handleChangeMinimumPurchase} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="md:w-full md:flex md:space-x-20">
                                            <div className="md:w-1/5">
                                                <span>Harga Diskon</span>
                                            </div>
                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                <div className="flex flex-col px-4 py-2">
                                                    <span className="text-sm text-gray-700">Harga Diskon</span>
                                                    <input className="outline-none text-lg font-semibold" type={'number'} onChange={handleChangeDiscountPrice} />
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="md:w-full md:flex md:space-x-20">
                                            <div className="md:w-1/5">
                                                <span>Bonus Item</span>
                                            </div>
                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                <div className="flex flex-col px-4 py-2">
                                                    <span className="text-sm text-gray-700">Quantity</span>
                                                    <input className="outline-none text-lg font-semibold" type={'number'} onChange={handleChangeBonusItem} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:w-full md:flex md:space-x-20">
                                            <div className="md:w-1/5">
                                                <span>Bonus Item</span>
                                            </div>
                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                <div className="flex flex-col px-4 py-2">
                                                    <span className="text-sm text-gray-700">Add Ons</span>
                                                    <input className="outline-none text-lg font-semibold" type={'text'} onChange={handleChangeAddOns} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full flex space-x-5">
                                            <button className="w-1/2 py-5 uppercase rounded-full border border-gray-300 text-gray-500" onClick={handleToggleAddDiscount}>Discard</button>
                                            <button className="w-1/2 py-5 uppercase rounded-full text-white bg-black" onClick={handleAddDiscount}>Add Discount</button>
                                        </div>

                                    </div>
                                    :
                                    <button className=" w-60 py-5 uppercase rounded-full border border-gray-300 text-gray-500" onClick={handleToggleAddDiscount}>Add Discount</button>

                            }

                        </div>

                        <div className="md:w-full md:flex md:px-6">
                            <div className="md:w-1/5">
                                <span>Discount List</span>
                            </div>
                            <div className="md:w-2/5">
                                <div className=" space-y-5 divide-y">
                                    {
                                        product?.discounts?.map((data, index) => {
                                            return (
                                                <div key={index} id={data?.id}>
                                                    <span>Discount {index + 1}</span>

                                                    <div className="py-5 space-y-5">

                                                        <div className="md:w-full md:flex md:space-x-20">
                                                            <div className="md:w-1/5 text-gray-500">
                                                                <span>Min Pembelian</span>
                                                            </div>
                                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                                <div className="flex flex-col px-4 py-2">
                                                                    <span className="text-sm text-gray-700">Quantity</span>
                                                                    <input className="outline-none text-lg font-semibold" disabled={isEditDiscount && discountId === data.id ? false : true} defaultValue={data?.quantity} type={'number'} onChange={handleChangeMinimumPurchase} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* <div className="md:w-full md:flex md:space-x-20">
                                                            <div className="md:w-1/5 text-gray-500">
                                                                <span>Harga Diskon</span>
                                                            </div>
                                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                                <div className="flex flex-col px-4 py-2">
                                                                    <span className="text-sm text-gray-700">Harga Diskon</span>
                                                                    <input className="outline-none text-lg font-semibold" disabled={isEditDiscount && discountId === data.id ? false : true} defaultValue={data?.price} type={'number'} onChange={handleChangeDiscountPrice} />
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div className="md:w-full md:flex md:space-x-20">
                                                            <div className="md:w-1/5 text-gray-500">
                                                                <span>Bonus Item</span>
                                                            </div>
                                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                                <div className="flex flex-col px-4 py-2">
                                                                    <span className="text-sm text-gray-700">Quantity</span>
                                                                    <input className="outline-none text-lg font-semibold" disabled={isEditDiscount && discountId === data.id ? false : true} defaultValue={data?.item} type={'number'} onChange={handleChangeBonusItem} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="md:w-full md:flex md:space-x-20">
                                                            <div className="md:w-1/5 text-gray-500">
                                                                <span>AddOns</span>
                                                            </div>
                                                            <div className="md:w-full border md:border-gray-300 md:focus-within:border-gray-400">
                                                                <div className="flex flex-col px-4 py-2">
                                                                    <span className="text-sm text-gray-700">AddOns</span>
                                                                    <input className="outline-none text-lg font-semibold" disabled={isEditDiscount && discountId === data.id ? false : true} defaultValue={data?.addOns} type={'text'} onChange={handleChangeAddOns} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className=" w-full flex justify-end">
                                                        {
                                                            (isEditDiscount && discountId === data.id) ?
                                                                <div className=" w-1/2 flex space-x-5">
                                                                    <button className="w-1/2 py-5 uppercase border border-gray-300 text-gray-500 rounded-full" onClick={handleDiscardUpdateDiscount}>discard</button>
                                                                    <button className=" w-1/2 py-5 uppercase rounded-full text-white bg-black" onClick={handleSaveUpdateDiscount}>save discount</button>
                                                                </div>
                                                                :
                                                                <div className="w-1/2 flex space-x-5">
                                                                    <button className=" w-1/2 py-5 uppercase rounded-full border border-gray-300 text-gray-500 md:hover:text-red-500 " onClick={handleDeleteDiscount(data?.id)}>Delete</button>
                                                                    <button className=" w-1/2 py-5 uppercase rounded-full border border-gray-300 text-gray-500 md:hover:text-gray-700" onClick={handleToggleEditDiscount(data?.id, data?.quantity, data?.item, data?.addOns)}>update</button>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                }
                {/* end of discount section */}

                <div className="md:flex md:flex-col md:space-y-10 md:py-20 md:border md:border-gray-200 md:bg-white">
                    <div className="md:px-6 md:space-x-5">
                        <button className="md:w-60 md:py-5 md:rounded-full md:text-gray-700 md:border md:border-gray-300">DISCARD CHANGE</button>
                        {
                            tab === 'edit-product' ?
                                <button className="md:w-60 md:py-5 md:rounded-full md:text-white md:bg-black" onClick={handleUpdateProduct}>UPDATE PRODUCT</button>
                                :
                                <button className="md:w-60 md:py-5 md:rounded-full md:text-white md:bg-black" onClick={handleCreateProduct}>CREATE PRODUCT</button>
                        }
                    </div>
                </div>

            </div>

            {notification.isOpen && <Toast isOpen={notification?.isOpen} status={notification.status} message={notification.message} closeAction={handleToggleNotification} />}
        </>
    );
}