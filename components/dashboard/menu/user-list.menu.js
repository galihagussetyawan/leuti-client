import { useContext, useEffect, useState } from "react"
import DashboardContext from "../../../lib/context/dashboard.context"
import UserService from "../../../services/user.service"

export default function UserListMenu() {

    const { userList } = useContext(DashboardContext);

    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState();

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

        UserService.searchUserByIdOrUsername(search)
            .then(res => setSearchData(res?.data?.data))
            .catch(err => console.log(err.response))
    }

    const handleKeyDown = event => {

        if (event.key === 'Enter') {

            setIsSearch(true);

            UserService.searchUserByIdOrUsername(search)
                .then(res => setSearchData(res?.data?.data))
                .catch(err => console.log(err.response))
        }

    };

    return (
        <>
            <div className="md:w-full md:min-h-screen md:space-y-10 md:h-96 md:px-5">
                <p className="md:border-b md:border-gray-300">AGENT LIST</p>
                <div className="md:space-y-5 md:bg-white md:border md:border-gray-200">

                    {/* search field */}
                    <div className="md:w-1/3 md:p-5">
                        <div className="md:flex md:border md:border-gray-400 px-4 py-2">
                            <div className="md:w-full md:flex md:flex-col">
                                <span className="text-sm text-gray-700">ID OR USERNAME</span>
                                <input placeholder="search user by id or username" className="outline-none text-lg font-semibold" onChange={handleChangeSearch} onKeyDown={handleKeyDown} />
                            </div>
                            <button className="md:text-gray-400 md:hover:text-gray-600" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* end of search field */}

                    <table className="md:w-full md:table-auto md:text-left">
                        <thead className="md:uppercase md:text-xs md:text-gray-500 md:border-t-2">
                            <tr>
                                <th className="md:py-3 md:px-6">id</th>
                                <th className="md:py-3 md:px-6">sponsor</th>
                                <th className="md:py-3 md:px-6">firtsname</th>
                                <th className="md:py-3 md:px-6">lastname</th>
                                <th className="md:py-3 md:px-6">username</th>
                                <th className="md:py-3 md:px-6">email</th>
                                <th className="md:py-3 md:px-6">phone</th>
                                <th className="md:py-3 md:px-6">country</th>
                                <th className="md:py-3 md:px-6">province</th>
                                <th className="md:py-3 md:px-6">city</th>
                                <th className="md:py-3 md:px-6">district</th>
                                <th className="md:py-3 md:px-6">village</th>
                                <th className="md:py-3 md:px-6">postal code</th>
                                <th className="md:py-3 md:px-6">address</th>
                            </tr>
                        </thead>
                        <tbody className="md:text-gray-800">
                            {
                                (isSearch ? searchData : userList)?.items?.map((data, index) => {
                                    return (
                                        <tr key={index} className="md:border-b">
                                            <td className="md:py-3 md:px-6">{data?.id}</td>
                                            <td className="md:py-3 md:px-6">Sponsor Cooming Soon</td>
                                            <td className="md:py-3 md:px-6">{data?.firstname}</td>
                                            <td className="md:py-3 md:px-6">{data?.lastname}</td>
                                            <td className="md:py-3 md:px-6">{data?.username}</td>
                                            <td className="md:py-3 md:px-6">{data?.email}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.phone}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.country}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.province}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.city}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.districts}</td>
                                            <td className="md:py-3 md:px-6 capitalize">{data?.detail?.village}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.postalCode}</td>
                                            <td className="md:py-3 md:px-6">{data?.detail?.address}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}