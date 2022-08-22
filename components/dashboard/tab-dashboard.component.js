import { useRouter } from "next/router"

import OverviewMenu from "./menu/overview.menu";
import ProductListMenu from "./menu/product-list.menu";
import CreteProductMenu from "./menu/create-product.menu";

export default function TabDashboardComponent({ productList }) {

    const router = useRouter();
    const { tab } = router.query;

    if (tab === 'product-list') {
        return <ProductListMenu productList={productList} />
    }

    if (tab === 'create-product') {
        return <CreteProductMenu />
    }

    return <OverviewMenu />
}