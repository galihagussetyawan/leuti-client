import { useRouter } from "next/router"

import OverviewMenu from "./menu/overview.menu";
import ProductListMenu from "./menu/product-list.menu";
import CreteProductMenu from "./menu/create-product.menu";
import UserListMenu from "./menu/user-list.menu";

export default function TabDashboardComponent() {

    const router = useRouter();
    const { tab } = router.query;

    if (tab === 'product-list') return <ProductListMenu />

    if (tab === 'create-product') return <CreteProductMenu />

    if (tab === 'agent-list') return <UserListMenu />

    return <OverviewMenu />
}