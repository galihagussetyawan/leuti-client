import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

import CookiesService from "../../services/cookies.service";
import CartService from "../../services/cart.service";
import RoyaltyService from "../../services/royalty.service";
import PointService from "../../services/point.service";
import RewardClaimService from "../../services/reward-claim.service";

import Footer from "../../components/footer.component";
const PopoverBottom = dynamic(() => import('../../components/commons/popover-bottom.component'));

export default function Rank({ pointList, rewardClaimList }) {

    const [showPopoverRanking, setShowPopoverRanking] = useState({
        isOpen: false,
        position: null,
        firstname: null,
        lastname: null,
        join: null,
        country: null,
        city: null,
        period: null,
        point: null,
    })
    const [tab, setTab] = useState('leaderboard-tab');

    const handleSwitchTab = (tab) => {
        return () => {
            setTab(tab);
        }
    }

    const handleToggleShowPopoverRanking = (position, firstname, lastname, join, country, city, period, point) => {

        return () => {

            if (!showPopoverRanking?.isOpen) {
                setShowPopoverRanking({
                    isOpen: true,
                    position,
                    firstname,
                    lastname,
                    join,
                    country,
                    city,
                    period,
                    point,
                })
            } else {
                setShowPopoverRanking({
                    isOpen: false,
                    position: null,
                    firstname: null,
                    lastname: null,
                    join: null,
                    country: null,
                    city: null,
                    period: null,
                    point: null,
                })
            }
        }
    }

    const tabComponentConditional = () => {

        if (tab === 'leaderboard-tab') {
            return (
                <div className="w-full flex flex-col mt-8 divide-y">
                    {
                        pointList?.map((data, index) => {
                            return (
                                <div key={index} className="grid grid-cols-[10%_50%_30%_10%] space-x-2 items-center py-5 font-semibold text-gray-600">
                                    <div>{index + 1}</div>
                                    <div className="flex flex-col">
                                        <span className="capitalize">{data?.firstname} {data?.lastname}</span>
                                        <span className=" text-base font-normal">Join: {convertDate(data?.join, 'medium')}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 p-2 rounded-full bg-gray-100">
                                            <div className="w-8 h-8 flex justify-center items-center text-white rounded-full bg-yellow-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="font-bold">{data?.point}</span>
                                        </div>
                                    </div>
                                    <div onClick={handleToggleShowPopoverRanking(index + 1, data?.firstname, data?.lastname, data?.join, data?.country, data?.city, data?.day, data.point)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        if (tab === 'claim-reward-tab') {
            return (
                <div className="mt-8 divide-y">

                    {
                        rewardClaimList?.length === 0 ?
                            <p className="p-3 border border-yellow-300 bg-yellow-100">Currently no one has claimed the reward. Be the first agent to claim the reward.</p>
                            :
                            <>
                                {
                                    rewardClaimList?.map((data, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center py-5 font-semibold">
                                                <div className="flex flex-col">
                                                    <span className="capitalize">{data?.firstname} {data?.lastname}</span>
                                                    <span className="capitalize font-normal text-gray-500">{data?.reward}</span>
                                                </div>
                                                <div>{convertDate(data?.createdAt, 'medium')}</div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }

                </div>
            )
        }
    }

    const convertDate = (date, typeDate = 'long') => {
        const newDate = new Date(parseInt(date));

        return newDate.toLocaleString('id', {
            dateStyle: typeDate,
        })
    }

    return (
        <>

            <Head>
                <title>Agent Rankings | Leuti Asia</title>
            </Head>

            <main className="md:w-4/5 flex flex-col m-auto md:py-10">
                <h1 className=" capitalize text-xl md:text-5xl px-5 md:p-0 font-semibold md:font-normal md:text-center">leuti agent leaderboard</h1>

                <div className="w-full h-48 md:h-96 md:mt-20 mt-10 flex justify-center items-center bg-gray-100">
                    <span className="text-7xl text-gray-200">Banner</span>
                </div>

                {/* dekstop version */}
                <div className="hidden md:grid md:grid-cols-[70%_30%] mt-20 space-x-20">

                    <div>
                        <table className="w-full text-left">
                            <thead className="font-semibold border-b">
                                <tr>
                                    <th className="w-24 p-5 text-center">Position</th>
                                    <th className="p-5">Name</th>
                                    <th className="p-5">Join</th>
                                    <th className="p-5">Country</th>
                                    <th className="p-5">City</th>
                                    <th className="p-5">Period</th>
                                    <th className="p-5">Point</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-gray-600">
                                {
                                    pointList?.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="py-6 px-5 font-semibold text-center">{index + 1}</td>
                                                <td className="py-6 px-5 font-semibold capitalize">{data?.firstname} {data?.lastname}</td>
                                                <td className="py-6 px-5">{convertDate(data?.join)}</td>
                                                <td className="py-6 px-5 capitalize">{data?.country}</td>
                                                <td className="py-6 px-5 capitalize">{data?.city}</td>
                                                <td className="py-6 px-5">{data?.day} days</td>
                                                <td className="py-6 px-5 font-semibold">
                                                    <div className="flex items-center space-x-2 p-2 rounded-full bg-gray-100">
                                                        <div className="w-8 h-8 flex justify-center items-center text-white rounded-full bg-yellow-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-bold">{data?.point}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="border p-5">
                        <h2 className=" text-2xl font-semibold py-5 border-b">Claim Reward</h2>

                        <div className="mt-10">
                            {
                                rewardClaimList?.length === 0 ?
                                    <p className="p-3 border border-yellow-300 bg-yellow-100">Currently no one has claimed the reward. Be the first agent to claim the reward.</p>
                                    :
                                    <div className="flex flex-col divide-y">
                                        {
                                            rewardClaimList.map((data, index) => {
                                                return (
                                                    <div key={index} className="flex justify-between items-center py-4">
                                                        <div className="flex flex-col">
                                                            <span className="capitalize font-semibold">{data?.firstname} {data?.lastname}</span>
                                                            <span className="capitalize font-light">{data?.reward}</span>
                                                        </div>
                                                        <div>{convertDate(data?.createdAt)}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {/* end of dekstop version */}

                {/* mobile version */}
                <div className="md:hidden px-5 mt-5">

                    {/* button switch tab */}
                    <div className="w-full h-14 flex p-1 rounded-full font-semibold bg-gray-100">
                        <button className={`w-1/2 h-full rounded-full ${tab === 'leaderboard-tab' && 'shadow-md bg-white'} ease-in-out duration-500`} onClick={handleSwitchTab('leaderboard-tab')}>Leaderboard</button>
                        <button className={`w-1/2 h-full rounded-full ${tab === 'claim-reward-tab' && 'shadow-md bg-white'} ease-in-out duration-500`} onClick={handleSwitchTab('claim-reward-tab')}>Claim Reward</button>
                    </div>
                    {/* end of button switch tab */}

                    {tabComponentConditional()}
                </div>
                {/* end of mobile version */}

            </main>
            <Footer />

            {/* popover detail ranking */}
            <PopoverBottom
                open={showPopoverRanking?.isOpen}
                toggle={handleToggleShowPopoverRanking}
            >
                <div className="w-full h-full flex flex-col divide-y items-center px-10 mt-10">

                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Position</span>
                            <span className="capitalize">{showPopoverRanking?.position}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Name</span>
                            <span className="capitalize">{showPopoverRanking?.firstname} {showPopoverRanking?.lastname}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Join</span>
                            <span className="capitalize">{convertDate(showPopoverRanking?.join)}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Country</span>
                            <span className="capitalize">{showPopoverRanking?.country}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>City</span>
                            <span className="capitalize">{showPopoverRanking?.city}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Period</span>
                            <span className="capitalize">{showPopoverRanking?.period} days</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full flex justify-between py-5 font-semibold">
                            <span>Point</span>
                            <span className="capitalize">{showPopoverRanking?.point}</span>
                        </div>
                    </div>

                </div>
            </PopoverBottom>
            {/* end popover detail ranking */}

        </>
    )
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    let isLogin = false;
    let user = {};
    let productList = null;
    let carts = [];
    let point = null;
    let royalties = null;
    let pointList = [];
    let rewardClaimList = [];

    try {

        const cookies = await CookiesService.getCookies('user', req, res);
        pointList = await (await PointService.getPoints(req, res))?.data?.data;
        rewardClaimList = await (await RewardClaimService.getAllRewardClaim(req, res))?.data?.data;

        if (cookies) {

            const cookiesParsed = JSON.parse(cookies);

            if (cookiesParsed?.accessToken) {
                user = cookiesParsed;
                carts = await (await CartService.getCartByUser(req, res))?.data?.data;
                point = await (await PointService.getPointByUser(cookiesParsed?.userId, req, res))?.data?.data;
                royalties = await (await RoyaltyService.getRoyaltiesByUser(req, res))?.data?.data;
                isLogin = true;
            }

        }

    } catch (error) {

        if (error) {
            isLogin = false;
        }

    }

    return {
        props: {
            isLogin,
            user,
            productList,
            carts,
            point,
            royalties,
            pointList,
            rewardClaimList,
        },
    }
}