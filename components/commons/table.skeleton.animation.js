export default function TableSkeletonAnimation(row, column) {
    return (
        [...Array(row)].map((data, index) => {
            return (
                <tr key={index} className="py-5">
                    {
                        [...Array(column)].map((d, i) => {
                            return (
                                <td key={i} className="md:px-6 py-2">
                                    <div className="md:py-5 animate-pulse bg-gray-200"></div>
                                </td>
                            )
                        })
                    }
                </tr>
            )
        })
    );
}