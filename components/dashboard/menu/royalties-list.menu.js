import { useContext, useState, useEffect } from "react";
import DashboardContext from "../../../lib/context/dashboard.context";
import LocalCurrency from "../../../lib/helpers/local-currency.help";

export default function RoyaltiesListMenu() {

    const { royaltiesList } = useContext(DashboardContext);

    const [isSearch, setIsSearch] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState();
    const [searchData, setSearchData] = useState();

    // search-------------------------------------------------------------------
    useEffect(() => {

        if (searchKeyword === "") {
            setIsSearch(false);
            return;
        }

    }, [searchKeyword, isSearch])

    const handleChangeSearch = event => {
        setSearchKeyword(event.target.value);
    }

    const handleSearch = event => {
        event.preventDefault();
        setIsSearch(true);

        // OrderService.searchOrders(search, tab)
        //     .then(res => setSearchData(res?.data?.data))
        //     .catch(err => console.log(err?.response))
    }

    const handleKeyDown = event => {

        if (event.key === 'Enter') {

            setIsSearch(true);

            // OrderService.searchOrders(search, tab)
            //     .then(res => setSearchData(res?.data?.data))
            //     .catch(err => console.log(err?.response))
        }

    };
    // end or search-------------------------------------------------------------------

    const convertDate = (date) => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: 'medium',
            timeStyle: 'long',
        })
    }

    return (
        <>
            <div className="md:min-w-full max-w-full md:min-h-screen md:space-y-10 md:h-96 md:px-5">
                <p className="md:border-b md:border-gray-300">ROYALTIES LIST</p>

                <div className=" md:bg-white">

                    {/* search field */}
                    <div className="md:w-1/3 md:p-5">
                        <div className="md:flex md:border md:border-gray-400 px-4 py-2">
                            <div className="md:w-full md:flex md:flex-col">
                                <span className="text-sm text-gray-700">USER ID OR USERNAME</span>
                                <input placeholder="search royalties by userid or username" className="outline-none text-lg font-semibold" onChange={handleChangeSearch} onKeyDown={handleKeyDown} />
                            </div>
                            <button className="md:text-gray-400 md:hover:text-gray-600" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* end of search field */}

                    <table className="w-full text-left">
                        <thead className="md:uppercase md:text-xs md:border-t-2 md:text-gray-400">
                            <tr>
                                <th className="md:py-3 md:px-6">Created</th>
                                <th className="md:py-3 md:px-6">Username</th>
                                <th className="md:py-3 md:px-6">Email</th>
                                <th className="md:py-3 md:px-6">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y font-semibold">
                            {
                                royaltiesList?.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="md:py-3 md:px-6">{convertDate(data?.createdAt)}</td>
                                            <td className="md:py-3 md:px-6">{data?.user?.username}</td>
                                            <td className="md:py-3 md:px-6">{data?.user?.email}</td>
                                            <td className="md:py-3 md:px-6">{LocalCurrency(data?.amount)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}