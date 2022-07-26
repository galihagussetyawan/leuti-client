import Head from 'next/head'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

//import components
import Header from '../components/header.component';
import Footer from '../components/footer.component';
import Caroussell from '../components/carousell.component';
import ProductDisplay from '../components/home/product-display.component';
import ProductDiscover from '../components/home/product-discover.component';

// const ProductDiscover = dynamic(() => import('../components/home/product-discover.component'));

export default function Home() {

  return (
    <div className={styles.container}>

      <Head>
        <title>Leuti Perfect Sublimate Serum - LEUTI.ID</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className=' md:w-4/5 flex flex-col space-y-9 m-auto'>

        {/* carousell */}
        <div className='md:w-full md:h-[650px] md:flex md:justify-center md:my-10'>
          <Caroussell />
        </div>
        {/* end carousell */}

        <ProductDiscover />
        <ProductDisplay />

        <div className='flex flex-col md:gap-5 md:my-20'>
          <div className='md:w-full md:h-[650px] md:flex md:justify-center'>
            <img src={'/carousell2.jpg'} className="md:w-full md:h-full md:object-cover" />
          </div>
          <div>
            <Link href={{ pathname: '/shop' }}>
              <button className=" md:w-64 md:h-12 rounded-full border border-gray-400">DISCOVER</button>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
