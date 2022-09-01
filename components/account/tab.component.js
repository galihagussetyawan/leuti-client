import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import AccountMenu from "./menu/account..menu";
import OrderListMenu from "./menu/order-list.menu";
const AccountInformationMenu = dynamic(() => import('./menu/account-information.menu'))

export default function Tab({ data }) {

    const router = useRouter();

    const { menu } = router.query;

    if (menu === 'address-tab') {
        return <AccountInformationMenu />
    }

    if (menu === 'order-tab') {
        return <OrderListMenu />
    }

    return <AccountMenu data={data} />
}