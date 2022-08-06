import '../styles/globals.css';
import AuthContext from '../lib/context/auth.context';

export default function MyApp({ Component, pageProps }) {

  const { isLogin, user } = pageProps;

  return (
    <AuthContext.Provider value={{
      isLogin,
      user,
    }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}