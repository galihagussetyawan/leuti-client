import { useRouter } from "next/router"

import OverviewMenu from "./menu/overview.menu";
import ProductListMenu from "./menu/product-list.menu";
import CreteProductMenu from "./menu/create-product.menu";
import UserListMenu from "./menu/user-list.menu";
import OrderListMenu from "./menu/order-list.dashboard.menu";

export default function TabDashboardComponent() {

    const router = useRouter();
    const { tab } = router.query;

    if (tab === 'product-list') return <ProductListMenu />
    if (tab === 'create-product') return <CreteProductMenu />
    if (tab === 'edit-product') return <CreteProductMenu />
    if (tab === 'agent-list') return <UserListMenu />
    if (tab === 'new-orders') return <OrderListMenu />
    if (tab === 'now-orders') return <OrderListMenu />
    if (tab === 'history-orders') return <OrderListMenu />

    return <OverviewMenu />
}