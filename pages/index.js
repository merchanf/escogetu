import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Layout from '../app/components/Layout/Layout';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <Layout>
      
      </Layout>

      

      
    </div>
  )
}
