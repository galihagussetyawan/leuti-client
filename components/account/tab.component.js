import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import AccountMenu from "./menu/account..menu";
import OrderListMenu from "./menu/order-list.menu";
import RewardAccountMenu from "./menu/reward.account.menu";
import SponsorAccountMenu from "./menu/sponsor.account.menu";
const AccountInformationMenu = dynamic(() => import('./menu/account-information.menu'))
import RoyaltiesAccountMenu from "./menu/royalties.account.menu";

export default function Tab({ data }) {

    const router = useRouter();

    const { menu } = router.query;

    if (menu === 'account-tab') return <AccountMenu data={data} />
    if (menu === 'address-tab') return <AccountInformationMenu />
    if (menu === 'order-tab') return <OrderListMenu />
    if (menu === 'reward-tab') return <RewardAccountMenu />
    if (menu === 'sponsor-tab') return <SponsorAccountMenu />
    if (menu === 'royalties-tab') return <RoyaltiesAccountMenu />

    return <AccountMenu data={data} />
}