import Head from 'next/head';
import '../styles/globals.css';
import AuthContext from '../lib/context/auth.context';
import CartContext from '../lib/context/cart.context';
import DashboardContext from '../lib/context/dashboard.context';
import UserContext from '../lib/context/user.context';
import OrderContext from '../lib/context/order.context';

export default function MyApp({ Component, pageProps }) {

  const { isLogin, user, isAdmin, carts, productList, pointList, userList, userDetail, orderList, ordersAllList, order } = pageProps;

  return (
    <AuthContext.Provider value={{ isLogin, user, isAdmin }}>
      <CartContext.Provider value={{ carts }}>
        <DashboardContext.Provider value={{ productList, pointList, userList, ordersAllList }}>
          <UserContext.Provider value={{ orderList, userDetail }}>
            <OrderContext.Provider value={{ order }}>

              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <link rel="icon" href="/favicon-leuti.ico" />
              </Head>
              <Component {...pageProps} />

            </OrderContext.Provider>
          </UserContext.Provider>
        </DashboardContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}