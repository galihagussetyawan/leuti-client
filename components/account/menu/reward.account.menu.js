import { useContext } from "react";
import UserContext from "../../../lib/context/user.context";

export default function RewardAccountMenu() {

    const { rewardList, point } = useContext(UserContext);

    const countPercenProgress = (currentPoint, totalPoint) => {
        return Math.ceil((currentPoint / totalPoint) * 100);
    }

    return (
        <div className="w-full md:w-2/3 md:space-y-20 space-y-10">
            <span className="hidden md:flex md:text-2xl">Reward</span>

            <div className="flex flex-col space-y-10">
                {
                    rewardList?.map((data, index) => {
                        return (
                            <div key={index} className="flex">
                                <div className="p-3 bg-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                        <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                                    </svg>
                                </div>
                                <div className="w-full grid grid-cols-1 px-5">
                                    <span>{data?.description}</span>
                                    <div className="flex">
                                        <span className="min-w-[70px] max-w-[70px] text-orange-500 font-semibold">{point?.point}/{data?.point}</span>
                                        <div className="w-full flex items-center">
                                            <div className="w-full h-1 bg-gray-200">
                                                <div className={`h-1 bg-orange-500`} style={{ width: `${countPercenProgress(point?.point, data?.point)}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {
                                        point.point >= data.point ?
                                            <button className=" min-w-[100px] py-3 uppercase rounded-full text-white bg-black">claim</button>
                                            :
                                            <button className=" min-w-[100px] py-3 uppercase rounded-full border border-gray-300 text-gray-500" disabled>claim</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}