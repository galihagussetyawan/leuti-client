import Head from 'next/head'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'
import Link from 'next/link';

//import components
import Header from '../components/header.component';
import Caroussell from '../components/carousell.component';
// import ProductDiscover from '../components/home/product-discover.component';
// import ProductDisplay from '../components/home/product-display.component';
// import Footer from '../components/footer.component';

const ProductDiscover = dynamic(() => import('../components/home/product-discover.component'));
const ProductDisplay = dynamic(() => import('../components/home/product-display.component'));
const Footer = dynamic(() => import('../components/footer.component'));

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
        <div className='md:w-full md:h-[650px] w-full h-screen flex justify-center md:my-10 bg-white md:bg-gray-100'>
          <Caroussell />
        </div>
        {/* end carousell */}

        <ProductDiscover />
        <ProductDisplay />

        {/* horizontal discover */}
        <div className='flex flex-col md:gap-5 gap-7 md:my-20'>
          <div className='md:w-full md:h-[650px] w-full h-[300px] relative md:flex md:justify-center bg-gray-100'>
            <Image
              src={'/carousell2.jpg'}
              quality={75}
              layout='fill'
              loading='lazy'
              objectFit='cover'
            />
          </div>
          <div className="text-center md:text-left">
            <Link href={{ pathname: '/shop' }}>
              <button className=" md:w-64 md:h-12 w-40 h-12 m-auto rounded-full border border-black">DISCOVER</button>
            </Link>
          </div>
        </div>
        {/* end horizontal discover */}

      </main>

      <Footer />
    </div>
  )
}
