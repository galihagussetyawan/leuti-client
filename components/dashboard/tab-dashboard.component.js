import dynamic from "next/dynamic";
import { useRouter } from "next/router"

import OverviewMenu from "./menu/overview.menu";
const ProductListMenu = dynamic(() => import('./menu/product-list.menu'));
const CreteProductMenu = dynamic(() => import('./menu/create-product.menu'));
const UserListMenu = dynamic(() => import('./menu/user-list.menu'));
const OrderListMenu = dynamic(() => import('./menu/order-list.dashboard.menu'));

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