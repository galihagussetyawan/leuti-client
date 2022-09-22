import { useContext } from "react";

import UserContext from "../../../lib/context/user.context";

export default function SponsorAccountMenu() {

    const { sponsors } = useContext(UserContext);

    return (
        <>
            <div className="md:w-full md:space-y-20 space-y-10">
                <span className="hidden md:flex md:text-2xl">Sponsor</span>

                {
                    sponsors?.downline?.length > 0 ?
                        <div>
                            {
                                sponsors?.downline?.map((data, index) => {
                                    return (
                                        <div key={index}>{data?.username}</div>
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="w-full md:w-2/4 p-5 border border-yellow-300 bg-yellow-100">
                            <p>You currently do not have a Sponsor. Come on, invite your friends to become Leuti Agents. And earn from their every purchase.</p>
                        </div>
                }

            </div>
        </>
    );
}