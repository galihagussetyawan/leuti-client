import Link from "next/link";

export default function OverviewMenu() {

    const orderList = [
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
        {
            date: '17 Jun 2022',
            id: 18637,
            agent: 'agentdemo',
            item: 7,
            status: 'UNPAID',
            total: 500000,
        },
    ];

    return (
        <div className="md:w-full md:flex md:space-x-5">

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
                            <span className="md:text-4xl">300</span>
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList.map((data, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b text-gray-700">
                                                <td className="py-4 px-6">{data.date}</td>
                                                <td className="py-4 px-6">{data.id}</td>
                                                <td className="py-4 px-6">{data.agent}</td>
                                                <td className="py-4 px-6">{data.item} Items</td>
                                                <td className="py-4 px-6">{data.status}</td>
                                                <td className="py-4 px-6">Rp {data.total}</td>
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
            <div className="md:w-2/5 md:h-96">

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

            </div>
            {/* end of right component/section */}

        </div>
    );
}