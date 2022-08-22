import '../styles/globals.css';
import AuthContext from '../lib/context/auth.context';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {

  const { isLogin, user, isAdmin } = pageProps;

  return (
    <AuthContext.Provider value={{
      isLogin,
      user,
      isAdmin,
    }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <link rel="icon" href="/favicon-leuti.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}