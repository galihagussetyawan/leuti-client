import dynamic from "next/dynamic";

import AccountMenu from "./menu/account..menu";
const AccountInformationMenu = dynamic(() => import('./menu/account-information.menu'))

export default function Tab({ state, data, userDetail }) {

    if (state === 'account-tab') {
        return <AccountMenu data={data} />
    }

    if (state === 'address-tab') {
        return <AccountInformationMenu data={userDetail} />
    }
}