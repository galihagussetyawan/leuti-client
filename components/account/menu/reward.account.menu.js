import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../../../lib/context/user.context";
import RewardClaimService from "../../../services/reward-claim.service";

export default function RewardAccountMenu() {

    const router = useRouter();
    const { rewardList, point } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        isOpen: false,
        status: 'error',
        message: 'error',
    })
    const [modal, setModal] = useState(false);
    const [reward, setReward] = useState();

    const countPercenProgress = (currentPoint, totalPoint) => {
        return Math.ceil((currentPoint / totalPoint) * 100);
    }

    const handleActionModalClaimReward = (rewardid, description) => {

        return () => {

            setModal(true);
            setReward({
                id: rewardid,
                description,
            })

        }
    }

    const handleToggleActionModalClaimReward = () => {
        setModal(!modal);
        setReward();
    }

    const handleCreateRewardClaim = () => {

        setLoading(true);

        RewardClaimService.createRewardClaim(reward?.id)
            .then(res => {

                router.replace(router.asPath)
                    .then(() => {

                        handleToggleActionModalClaimReward();
                    })
            })
            .catch(err => err?.response?.data)
            .finally(() => setLoading(false));
    }

    return (
        <>

            <div className="w-full md:w-2/3 md:space-y-20 space-y-10">
                <span className="hidden md:flex md:text-2xl">Reward</span>

                <div className="flex flex-col space-y-10">
                    {
                        rewardList?.map((data, index) => {
                            return (
                                <div key={index} className="flex items-center">
                                    <div className="h-full p-3 aspect-square bg-orange-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                                            <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                                        </svg>
                                    </div>
                                    <div className="w-full grid grid-cols-1 px-5">
                                        <p className="capitalize">{data?.description}</p>
                                        <div className="flex">
                                            <span className="min-w-[70px] max-w-[70px] text-orange-500 font-semibold">{point?.point}/{data?.point}</span>
                                            <div className="w-full flex items-center">
                                                <div className="w-full h-1 bg-gray-200">
                                                    <div className={`h-1 max-w-full bg-orange-500`} style={{ width: `${countPercenProgress(point?.point, data?.point)}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {
                                            point?.point >= data?.point ?
                                                <button className=" min-w-[100px] py-3 uppercase rounded-full text-white bg-black" onClick={handleActionModalClaimReward(data?.id, data?.description)}>claim</button>
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

            {
                modal &&
                <div className=" w-screen h-screen flex flex-col justify-center items-center z-10 fixed top-0 left-0 bg-opacity-40 bg-black">
                    <div className="md:w-1/4 md:min-h-[300px] w-10/12 min-h-[250px] flex flex-col justify-center items-center p-5 md:px-10 space-y-10 bg-gray-50">

                        <div className="flex flex-col space-y-3 text-center">
                            <p className="text-2xl font-semibold">Claim Reward</p>
                            <p className="text-center">Apakah kamu yakin akan claim <span className=" capitalize">{reward?.description}</span>?</p>
                        </div>
                        <div className="w-full flex space-x-5">
                            <button className="w-1/2 uppercase py-5 rounded-full border text-gray-500 border-gray-300 md:hover:border-gray-400 md:hover:text-gray-600" onClick={handleToggleActionModalClaimReward}>Cancel</button>
                            <button className="w-1/2 uppercase py-5 rounded-full text-gray-50 bg-black" onClick={handleCreateRewardClaim}>Ok</button>
                        </div>

                    </div>
                </div>
            }

        </>
    );
}