import Head from 'next/head';
import '../styles/globals.css';
import AuthContext from '../lib/context/auth.context';
import CartContext from '../lib/context/cart.context';
import DashboardContext from '../lib/context/dashboard.context';
import UserContext from '../lib/context/user.context';
import OrderContext from '../lib/context/order.context';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {

  const { isLogin, user, isAdmin, carts, productList, product, point, pointList, userList, userDetail, orderList, ordersAllList, order, rewardList, royalties } = pageProps;

  return (
    <>
      <Script id='script-1' strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script id='script-2' strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <AuthContext.Provider value={{ isLogin, user, isAdmin }}>
        <CartContext.Provider value={{ carts }}>
          <DashboardContext.Provider value={{ productList, product, pointList, userList, ordersAllList }}>
            <UserContext.Provider value={{ orderList, userDetail, point, rewardList, royalties }}>
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
    </>
  )
}